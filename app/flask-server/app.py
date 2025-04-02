from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import os
import xgboost as xgb

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Create models directory if it doesn't exist
os.makedirs('models', exist_ok=True)

# Function to create placeholder models and related files
def create_placeholder_models():
    disease_types = ['diabetes', 'heart', 'kidney']

    for disease_type in disease_types:
        model_path = f"models/{disease_type}_xgb.pkl"
        feature_path = f"models/{disease_type}_features.pkl"

        # Ensure feature order is correct for diabetes
        disease_features = {
            'diabetes': ['age', 'bloodPressure', 'bmi', 'diabetesPedigreeFunction', 
                         'glucose', 'insulin', 'pregnancies', 'skinThickness'],
            'heart': ['age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg',
                      'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal'],
            'kidney': ['age', 'al', 'ane', 'appet', 'ba', 'bgr', 'bp', 'bu', 'cad', 'dm',
                       'hemo', 'htn', 'pc', 'pcc', 'pcv', 'pe', 'pot', 'rbc', 'sc',
                       'sg', 'sod', 'su', 'wc']
        }

        # Create feature list only if missing
        if not os.path.exists(feature_path):
            joblib.dump(disease_features[disease_type], feature_path)

        # Create model only if missing
        if not os.path.exists(model_path):
            model = xgb.XGBClassifier()
            joblib.dump(model, model_path)

# Run the placeholder creation function
create_placeholder_models()

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        disease_type = data.get('disease_type')
        features = data.get('features')

        if not disease_type or not features:
            return jsonify({'error': 'Missing disease_type or features'}), 400

        # Load model and expected feature list
        model_path = f"models/{disease_type}_xgb.pkl"
        feature_path = f"models/{disease_type}_features.pkl"

        if not os.path.exists(model_path) or not os.path.exists(feature_path):
            return jsonify({'error': f"Model or feature list for {disease_type} not found"}), 500

        model = joblib.load(model_path)
        expected_features = joblib.load(feature_path)

        # **Check for missing features**
        missing_features = [f for f in expected_features if f not in features]
        if missing_features:
            return jsonify({
                'error': 'Missing required features',
                'missing_features': missing_features
            }), 400

        # Convert features into the correct order & format
        input_data = [float(features[feature]) for feature in expected_features]

        # Convert to NumPy array
        input_array = np.array(input_data, dtype=np.float32).reshape(1, -1)

        # **Check final shape before prediction**
        if input_array.shape[1] != len(expected_features):
            return jsonify({
                'error': f"Feature shape mismatch, expected: {len(expected_features)}, got {input_array.shape[1]}",
                'received_features': list(features.keys()),
                'expected_features': expected_features
            }), 400

        # Make a prediction
        prediction = model.predict(input_array)[0]
        probability = model.predict_proba(input_array)[0][1]

        return jsonify({
            'prediction': int(prediction),
            'probability': float(probability),
            'disease_type': disease_type
        })

    except Exception as e:
        print(f"Error in prediction: {str(e)}")  # Log error
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, port=5000)
