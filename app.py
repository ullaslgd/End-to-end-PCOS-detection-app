from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# Load the trained model
model = joblib.load('pcos_model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json  # Get JSON data from frontend
    input_features = np.array(data['features']).reshape(1, -1)  # Convert to array
    prediction = model.predict(input_features)  # Predict using model
    return jsonify({'pcos_prediction': int(prediction[0])})  # Return response

if __name__ == '__main__':
    app.run(debug=True)
