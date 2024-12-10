
import joblib
from .feature_extraction import extract_features

# Load the pre-trained ML model
model = joblib.load('behavior/ml_model/bot_detection_model.pkl')

def is_bot(raw_data):
    """Predicts if the raw session data indicates bot-like behavior using the ML model."""
    # Extract features from raw behavioral data
    features = extract_features(raw_data)
    
    # Predict bot/human using the ML model
    prediction = model.predict(features)
    
    return bool(prediction[0])  # True if bot, False if human
