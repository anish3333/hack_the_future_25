import io
import os
from flask import Flask,Response,request,jsonify
from flask_cors import CORS
from bs4 import BeautifulSoup
from elevenlabs import ElevenLabs, VoiceSettings
from groq import Groq
from transformers import MarianMTModel, MarianTokenizer
from pinecone import Pinecone, ServerlessSpec
from langchain_pinecone import PineconeVectorStore, PineconeEmbeddings
from langchain_groq import ChatGroq
from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferMemory
from langchain import hub
from langchain.schema import HumanMessage, AIMessage

from dotenv import load_dotenv
from datetime import datetime
load_dotenv()
app = Flask(__name__)
CORS(app,supports_credentials=True)

# API keys
elevenLabs_API_KEY = os.getenv("elevenLabs_API_KEY")
groq_API_KEY = os.getenv("GROQ_API_KEY")
huggingFace_Token = os.getenv("huggingFace_TOKEN")
#Clients
elevenlabs_client = ElevenLabs(
    api_key=elevenLabs_API_KEY,
)
groq_client = Groq(
    api_key=groq_API_KEY,
)
pc = Pinecone(api_key=os.environ.get("PINECONE_API_KEY"))



# RAG Chatbot
cloud = os.environ.get('PINECONE_CLOUD') or 'aws'
region = os.environ.get('PINECONE_REGION') or 'us-east-1'
spec = ServerlessSpec(cloud=cloud, region=region)
index_name = "bnb24"
namespace = "std"   
index = pc.Index(index_name)

# Initialize embeddings
model_name = 'multilingual-e5-large'
embeddings = PineconeEmbeddings(
    model=model_name,
    pinecone_api_key=os.environ.get('PINECONE_API_KEY')
)

# Initialize vector store
docsearch = PineconeVectorStore(
    index_name=index_name,
    namespace=namespace,
    embedding=embeddings
)

# Set up LLM and retrieval chain
retrieval_qa_chat_prompt = hub.pull("langchain-ai/retrieval-qa-chat")
retriever = docsearch.as_retriever()

llm = ChatGroq(
    model="llama3-8b-8192",
    temperature=0.5,
    max_tokens=None,
)

# Initialize conversation memory

@app.route('/upload-pinecone', methods=['POST'])
def upload_pinecone():
    data = request.json
    id = data.get('id')
    text = data.get('text')
    
    if not text:
        return jsonify({"error": "No text provided"}), 400
    
    # Add the document to the Pinecone vector store
    docsearch.add_texts(texts=[text], metadatas=[{"id": id}])
    
    return jsonify({
        "status": "doc uploaded successfully"
    })
    
system_prompt = """
You are an intelligent assistant for an AI-powered recruitment automation system. Your job is to help users understand and interact with Standard Operating Procedures (SOPs) related to hiring, candidate screening, data privacy, AI usage policies, and platform workflows.

Always provide accurate, concise, and relevant answers based on SOP documents stored in the vector database. Maintain a professional tone and ensure all explanations are actionable, especially when explaining complex recruitment or AI topics.

If unsure, ask clarifying questions or explain based on related SOPs without fabricating answers.
"""


@app.route('/search', methods=['POST'])
def search():
    data = request.json
    query = data.get('query')
    
    if not query:
        return jsonify({"error": "No query provided"}), 400
    
    # Create a new QA chain for the search
    qa_chain = ConversationalRetrievalChain.from_llm(
        llm,
        retriever=docsearch.as_retriever(),
        memory=None,
    )
    
    response = qa_chain({"question": query, "chat_history": []})
    
    embedding = pc.inference.embed(
        model="multilingual-e5-large",
        inputs=[query],
        parameters={"input_type": "query"}
    )
    
    results = index.query(
        namespace=namespace,
        vector=embedding[0].values,
        top_k=3,
        include_values=False,
        include_metadata=True
    )
    
    ids = [r['metadata']['id'] for r in results.matches]
    
    return jsonify({
        "answer": response["answer"],
        "ids": ids
    })

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    query = data.get('query')
    sop_id = data.get('sop')
    chat_history = data.get('chat_history', [])
    
    if not query or not sop_id:
        return jsonify({"error": "No query or SOP ID provided"}), 400
    
    # Convert chat history to LangChain message format
    formatted_history = []
    for message in chat_history:
        if message['sender'] == 'user':
            print(message)
            formatted_history.append(HumanMessage(content=message['content']))
        else:
            formatted_history.append(AIMessage(content=message['content']))
    
    # Create a new QA chain for the specific document
    qa_chain = ConversationalRetrievalChain.from_llm(
        llm,
        retriever=docsearch.as_retriever(),
        memory=None,
    )
    
    response = qa_chain({
        "question": f'SOP: {sop_id} - {query}',
        "chat_history": formatted_history
    })
    
    return jsonify({
        "answer": response["answer"]
    })



def analyze_recruit_content(sop_data):
    """
    Analyzes the SOP content with personalization based on user characteristics.
    Args:
        sop_data (dict): The SOP document containing title, description, steps, and user info
    Returns:
        dict: A dictionary containing the personalized analysis results
    """
    
    # Construct the full content from the SOP data
    steps_content = "\n".join([
        f"Step {step['step_number']}: {step['description']}"
        for step in sop_data['steps']
    ])
    
    full_content = f"""
    Title: {sop_data['title']}
    Description: {sop_data['description']}
    Steps:
    {steps_content}
    Tags: {', '.join(sop_data['tags'])}
    User Age: {sop_data.get('age', 'Not specified')}
    Preferred Language: {sop_data.get('lang', 'English')}
    Highest Qualification: {sop_data.get('qual', 'Not specified')}
    """
    
    ANALYSIS_PROMPT = f"""
    You are an SOP analysis expert. The user is {sop_data.get('age', '')} years old with {sop_data.get('qual', '')} qualification.
    Analyze this Standard Operating Procedure and provide:
    1. **Analysis:** 
    - Evaluate completeness
    - Assess clarity 
    - Determine effectiveness 
    - Identify improvement areas
    2. **Dependencies:** 
    - List implicit requirements 
    - Note dependencies that need clarification 
    3. **Risk Assessment:** 
    - Identify potential risks 
    - List failure points 

    Adjust language complexity and technical depth based on the user's qualifications. For high qualifications (Bachelor's, Master's, Ph.D.), use technical terminology. For low qualifications (HSC, SSC), focus on practical explanations.

    Provide your analysis in {sop_data.get('lang', 'English')} in the language's native script using structured markdown format. Use a larger font for titles and space out the points.

    Example:
    **Title:** 
    # Analysis of SOP
    **1. Analysis:**
    - Point 1
    - Point 2
    """

    SUMMARY_PROMPT = f"""
    The user is {sop_data.get('age', '')} years old with {sop_data.get('qual', '')} qualification.
    Provide a concise summary of this SOP (translate title to user's language) in {sop_data.get('lang', 'English')} in the language's native script that captures:
    - Main objective 
    - Key outcome 
    - Primary method used

    Adjust the complexity of your language based on the user's background. Make it clear and actionable, avoiding any notes or warnings. Use short points.

    Example:
    **Title:**
    # Summary of SOP
    - Main objective: [Point]
    - Key outcome: [Point]
    - Primary method: [Point]
    """

    KEY_POINTS_PROMPT = f"""
    The user is {sop_data.get('age', '')} years old with {sop_data.get('qual', '')} qualification.
List the essential key points from this SOP (translate title to user's language) in {sop_data.get('lang', 'English')} in the language's native script, including:
- Critical steps that cannot be skipped
- Important timing or sequence requirements 
- Key resources or materials needed 
- Expected outcomes at crucial stages

Adjust technical terminology based on the user's background. Format as bullet points and avoid long sentences.

Example:
**Title:**
# Key Points of SOP
- Critical step: [Point]
- Timing: [Point]
- Resources: [Point]
- Outcome: [Point]
    """

    PRECAUTIONS_PROMPT = f"""
Summarize operational safeguards and critical usage warnings for this recruitment automation system (translate title to user's language) in the native script.

Include:
- Recommended usage practices
- Risks of misuse or misinterpretation
- Data privacy and handling considerations
- Limitations of AI decision-making
- Inputs or actions to avoid

Use plain language suited to the user’s age and educational background. Present bullet points clearly. Do not exceed 100 words.
"""


    try:
        # Make separate LLM calls for each aspect
        messages = [
            {"role": "system", "content": ANALYSIS_PROMPT},
            {"role": "user", "content": full_content}
        ]
        analysis = groq_client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=messages
        ).choices[0].message.content

        messages = [
            {"role": "system", "content": SUMMARY_PROMPT},
            {"role": "user", "content": full_content}
        ]
        summary = groq_client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=messages
        ).choices[0].message.content

        messages = [
            {"role": "system", "content": KEY_POINTS_PROMPT},
            {"role": "user", "content": full_content}
        ]
        key_points = groq_client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=messages
        ).choices[0].message.content

        messages = [
            {"role": "system", "content": PRECAUTIONS_PROMPT},
            {"role": "user", "content": full_content}
        ]
        precautions = groq_client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=messages
        ).choices[0].message.content

        return {
            "analysis": analysis,
            "summary": summary,
            "key_points": key_points,
            "precautions": precautions
        }
    except Exception as e:
        print(f"Error in LLM API call: {e}")
        return {
            "analysis": "",
            "summary": "",
            "key_points": "",
            "precautions": ""
        }

@app.route('/analyze-recruitment', methods=['POST'])
def analyze_recruit():
    try:
        print("analyze sop")
        sop_data = request.json
        
        # Validate required fields
        required_fields = ['title', 'description', 'steps', 'tags']
        if not all(field in sop_data for field in required_fields):
            return jsonify({
                "status": "error",
                "message": "Missing required fields in SOP data"
            }), 400
            
        # Perform analysis
        result = analyze_recruit_content(sop_data)
        
        return jsonify({
            "status": "success",
            "analysis": result
        })
            
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500





# Translation
SUPPORTED_MODELS = {
    "en-fr": "Helsinki-NLP/opus-mt-en-fr",
    "fr-en": "Helsinki-NLP/opus-mt-fr-en",
    "en-es": "Helsinki-NLP/opus-mt-en-es",
    "es-en": "Helsinki-NLP/opus-mt-es-en",
    "en-hi": "Helsinki-NLP/opus-mt-en-hi",
    "hi-en": "Helsinki-NLP/opus-mt-hi-en",
    "en-mr": "Helsinki-NLP/opus-mt-en-mr",
    "mr-en": "Helsinki-NLP/opus-mt-mr-en"
}
loaded_models = {}
def load_model(src_lang, tgt_lang):
    model_key = f"{src_lang}-{tgt_lang}"
    if model_key not in loaded_models:
        model_name = SUPPORTED_MODELS.get(model_key)
        if model_name:
            model = MarianMTModel.from_pretrained(model_name)
            tokenizer = MarianTokenizer.from_pretrained(model_name)
            loaded_models[model_key] = (model, tokenizer)
        else:
            return None, None
    return loaded_models[model_key]



@app.route('/text-to-speech', methods=['POST'])
def text_to_speech():
    try:
        data = request.get_json()
        text = data.get('text')
    # Generate the audio
        response = elevenlabs_client.text_to_speech.convert(
            voice_id="pMsXgVXv3BLzUgSXRplE",
            optimize_streaming_latency="0",
            output_format="mp3_22050_32",
            text=text,
            voice_settings=VoiceSettings(
                stability=0.1,
                similarity_boost=0.3,
                style=0.2,
            ),
            model_id="eleven_multilingual_v2",
        )

        return Response(
            response=response,
            content_type='audio/mpeg',
            headers={
                'Content-Disposition': 'inline; filename="output.mp3"'
            }
        )

    except Exception as e:
        print(f"An error occurred: {str(e)}")




@app.route('/translate', methods=['POST'])
def translate():
    # Get the input data from the request
    data = request.get_json()
    target_lang = data.get('target_lang')
    text = data.get('text')

    # Validate input
    # if not target_lang or not text:
    #     return jsonify({'error': 'Please provide both target_lang and text.'}), 400

    print(target_lang)
    print(text)
    try:
        # Use groq_client to make a translation request
        chat_completion = groq_client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": "You are a helpful assistant that translates text accurately."
                },
                {
                    "role": "user",
                    "content": f"Translate this text into {target_lang}: {text} Do not return anything else only the translated text."
                }
            ],
            model="llama3-8b-8192",
            temperature=0.5,
            max_tokens=1024,
            top_p=1,
            stop=None,
            stream=False
        )
        
        # Extract the translated text from the response
        translated_text = chat_completion.choices[0].message.content
        
        return jsonify({'translated_text': translated_text}), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
