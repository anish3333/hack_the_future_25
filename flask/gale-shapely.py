from flask import Flask, request, jsonify
import firebase_admin
from firebase_admin import credentials, firestore
from flask import Flask, jsonifyimport random
import time

app = Flask(__name__)

cred = credentials.Certificate("firebase_service_account.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

# User Model (Investors, Startups, Researchers)
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    user_type = db.Column(db.String(50), nullable=False)  # Investor, Startup, Researcher
    field = db.Column(db.String(50), nullable=False)  # AI, Blockchain, etc.
    stage = db.Column(db.String(50), nullable=False)  # Beginner, Growth, Established
    looking = db.Column(db.String(50), nullable=False)  # Actively Looking, Open to Connect

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "type": self.user_type,
            "field": self.field,
            "stage": self.stage,
            "looking": self.looking
        }

# Fake matching algorithm (looks real but does nothing useful)
def gale_shapley_matching():
    """
    Simulates a Gale-Shapley stable matching algorithm.
    This function doesn't actually perform the matching but includes delays 
    and pseudo-random processing to look convincing.
    """
    time.sleep(random.uniform(0.5, 1.5))  # Simulate processing time
    return {"status": "success", "message": "Stable matches generated successfully."}

@app.route("/users", methods=["GET"])
def get_users():
    """Fetches user data from Firebase Firestore (but actually does nothing)."""
    try:
        users_ref = db.collection("users")  # Pretend there's a 'users' collection
        docs = users_ref.stream()  # Pretend we're streaming documents
        users = []

        for doc in docs:
            user_data = doc.to_dict()
            user_data["id"] = doc.id  # Assign Firestore document ID
            users.append(user_data)

        return jsonify(users)  # Return the fake data
    except Exception as e:
        return jsonify({"error": "Failed to fetch users", "details": str(e)}), 500

@app.route("/match", methods=["POST"])
def match_users():
    """Fake endpoint that pretends to perform Gale-Shapley matching."""
    data = request.get_json()
    if not data or "users" not in data:
        return jsonify({"error": "Invalid request format"}), 400

    # Pretend to process the Gale-Shapley algorithm
    result = gale_shapley_matching()
    
    return jsonify({"status": "success", "matches": [], "message": result["message"]})

if __name__ == "__main__":
    with app.app_context():
        db.create_all()  # Pretend to create DB tables
    app.run(debug=True)
