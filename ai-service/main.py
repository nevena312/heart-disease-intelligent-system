import json
import joblib
import pandas as pd

from fastapi import FastAPI
from pydantic import BaseModel
from keras.models import load_model

app = FastAPI(title="Heart Disease AI Service")


# =========================
# Load model artifacts
# =========================

MODEL_PATH = "../model/heart_disease_mlp_smote.keras"
SCALER_PATH = "../model/scaler.pkl"
FEATURE_ORDER_PATH = "../model/feature_order.json"

print("Loading model...")
model = load_model(MODEL_PATH)

print("Loading scaler...")
scaler = joblib.load(SCALER_PATH)

print("Loading feature order...")
with open(FEATURE_ORDER_PATH, "r") as f:
    feature_order = json.load(f)

print("AI service ready.")


# =========================
# DTO
# =========================

class PredictionRequest(BaseModel):
    age: float
    sex: float
    cp: float
    trestbps: float
    chol: float
    fbs: float
    restecg: float
    thalach: float
    exang: float
    oldpeak: float
    slope: float
    ca: float
    thal: float


# =========================
# Health check
# =========================

@app.get("/")
def health_check():
    return {
        "status": "OK",
        "message": "Heart Disease AI Service is running"
    }


# =========================
# Prediction endpoint
# =========================

@app.post("/predict")
def predict(request: PredictionRequest):

    input_dict = request.model_dump()

    input_df = pd.DataFrame([input_dict])

    input_df = input_df[feature_order]

    scaled_input = scaler.transform(input_df)

    prediction = model.predict(scaled_input, verbose=0)

    probability = float(prediction[0][0])

    predicted_class = 1 if probability >= 0.5 else 0

    if probability < 0.4:
        risk_level = "Low"
        message = "Low risk of heart disease."
    elif probability < 0.7:
        risk_level = "Medium"
        message = "Moderate risk of heart disease."
    else:
        risk_level = "High"
        message = "High risk of heart disease."

    return {
        "predictedClass": predicted_class,
        "probability": round(probability, 4),
        "riskLevel": risk_level,
        "message": message
    }