from fastapi import FastAPI
from pydantic import BaseModel
import joblib

app = FastAPI()
model = joblib.load("model_tarif.joblib")

class InputData(BaseModel):
    duree: int

@app.post("/predict")
def predict_tarif(data: InputData):
    prediction = model.predict([[data.duree]])[0]
    return {"tarif_estime": round(prediction, 2)}
