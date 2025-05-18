import pandas as pd
from sklearn.linear_model import LinearRegression
import joblib

# Charger le CSV
df = pd.read_csv("C:/Users/Abderrahmane Techa/Desktop/parking_pfa/AI model/dataset_tarif_ia.csv")


X = df[["duree"]]
y = df["tarif"]

# Créer un modèle simple
model = LinearRegression()
model.fit(X, y)

# Sauvegarder le modèle
joblib.dump(model, "model_tarif.joblib")
