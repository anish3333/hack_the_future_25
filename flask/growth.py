from flask import Flask, request, jsonify
import pickle
import numpy as np
import pandas as pd
from flask_cors import CORS
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# Load the preprocessor and model
try:
    with open("models/preprocessor.pkl", "rb") as f:
        preprocessor = pickle.load(f)
    with open("models/random_forest_best_model.pkl", "rb") as f:
        model = pickle.load(f)
    logger.info("Models loaded successfully")
except Exception as e:
    logger.error(f"Error loading models: {str(e)}")
    raise

# Define feature columns
categorical_features = ["industry", "funding_stage", "region"]
numerical_features = ["revenue", "burn_rate", "r&d_expenditure", "user_growth", 
                     "market_penetration", "team_size", "additional_funding", 
                     "market_shift", "regulatory_change"]

def validate_input(data):
    """Validate input data contains all required fields."""
    required_fields = categorical_features + numerical_features
    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        raise ValueError(f"Missing required fields: {missing_fields}")
    
    # Convert string numbers to float
    for field in numerical_features:
        if isinstance(data[field], str):
            try:
                data[field] = float(data[field])
            except ValueError:
                raise ValueError(f"Invalid numerical value for field: {field}")
    return data

@app.route("/predict", methods=["POST"])
def predict():
    try:
        # Get and log the incoming data
        data = request.get_json()
        logger.info(f"Received prediction request with data: {data}")
        
        # Validate and preprocess input
        # data["r&d_expenditure"] *= 5
        data = validate_input(data)
        df = pd.DataFrame([data])
        logger.info(f"Converted to DataFrame:\n{df.head()}")
        
        # Handle missing values
        df[categorical_features] = df[categorical_features].fillna("Unknown")
        df[numerical_features] = df[numerical_features].fillna(df[numerical_features].median())
        
        # Transform input data
        X_processed = preprocessor.transform(df)
        
        # Make prediction
        prediction = model.predict(X_processed)
        prediction_value = float(prediction[0])  # Convert numpy float to Python float
        logger.info(f"Prediction made: {prediction_value}")
        
        return jsonify({
            "status": "success",
            "predicted_growth": prediction_value,
            "input_data": data
        })
        
    except ValueError as ve:
        logger.error(f"Validation error: {str(ve)}")
        return jsonify({
            "status": "error",
            "error_type": "validation_error",
            "message": str(ve)
        }), 400
        
    except Exception as e:
        logger.error(f"Prediction error: {str(e)}")
        return jsonify({
            "status": "error",
            "error_type": "prediction_error",
            "message": "An error occurred while processing your request"
        }), 500

if __name__ == "__main__":
    app.run(debug=True)