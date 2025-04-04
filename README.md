# **Chronic Disease Prediction Using Machine Learning**

## **Overview**
Chronic diseases such as **diabetes, kidney disease, and heart disease** affect millions of people worldwide. Early detection can significantly improve treatment outcomes and patient care. This project utilizes **machine learning** to predict the likelihood of an individual having a chronic disease based on their medical data.

## **Features**
- **Web-based Interface**: Users can select a disease type (Diabetes, Kidney, or Heart) and input relevant medical details.
- **Machine Learning Models**: Separate ML models are trained for each disease, ensuring accurate and specialized predictions.
- **User-Friendly Interface**: Designed for ease of use, allowing users to quickly get predictions based on their data.
- **Flask Backend**: The system is powered by a Flask server that handles model inference and user requests.

## **Technologies Used**
- **Python** (for model development)
- **Scikit-Learn** / **TensorFlow** (for training models)
- **Flask** (for backend API)
- **HTML, CSS, Bootstrap** (for frontend)
- **Git & GitHub** (for version control)

## **How It Works**
1. User selects the disease type (Diabetes, Kidney, Heart).
2. User enters their medical details (e.g., blood pressure, glucose levels, cholesterol, etc.).
3. The system processes the input and runs it through the trained ML model.
4. The model predicts the likelihood of having the disease and displays the result.

## **Installation and Setup**
1. Clone the repository:
   ```sh
   git clone https://github.com/TheShr/DiseasePredictor.git
   ```
2. Navigate to the project directory:
   ```sh
   cd DiseasePredictor
   ```
3. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
4. Run the Flask server:
   ```sh
   python app.py
   ```
5. Open the web interface in your browser:
   ```sh
   http://localhost:5000
   ```

## **Future Enhancements**
- Adding more diseases for prediction.
- Improving accuracy with deep learning models.
- Deploying the system as a web or mobile application.

## **License**
This project is licensed under the MIT License.

