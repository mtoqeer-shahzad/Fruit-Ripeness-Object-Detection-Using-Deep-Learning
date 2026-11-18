
# Fruit Ripeness Object Detection Using Deep Learning

## Project Overview

This project is a Deep Learning-based web application designed to detect and classify the ripeness of fruits using image classification.

The system supports four types of fruits:
- Apple
- Banana
- Lemon
- Orange

Each fruit is classified into three ripeness categories:
- Ripe
- Unripe
- Overripe

The application uses a trained MobileNetV2 model to predict fruit ripeness and provides a confidence score for each prediction.

## Technologies Used

### Backend Technologies
- Python
- Django
- Django REST Framework (DRF)
- SQLite
- Django Token Authentication

### Deep Learning Technologies
- PyTorch
- Torchvision
- MobileNetV2
- Pillow (PIL)

## Deep Learning Model

**Model Architecture:** MobileNetV2

**Deep Learning Framework:** PyTorch

**Input Image Size:** 224 × 224

**Number of Output Classes:** 12

### Classification Categories

| Ripeness Category | Fruit Types |
|---|---|
| Overripe | Apple, Banana, Lemon, Orange |
| Ripe | Apple, Banana, Lemon, Orange |
| Unripe | Apple, Banana, Lemon, Orange |

## Backend Features

- User Registration
- User Login
- Token-Based Authentication
- User Management
- Fruit Image Upload
- Fruit Ripeness Prediction
- Prediction Confidence Score
- Save Prediction Records
- Retrieve All Predictions
- Retrieve Single Prediction
- Delete Individual Prediction
- Delete All Predictions
- Prediction Count
- Password Reset Email Functionality

## Project Structure

```text
Back-End/
└── Fruits_ripeness_object_detection_project/
    └── myproject/
        ├── accounts/
        │   ├── migrations/
        │   ├── models.py
        │   ├── serializers.py
        │   ├── views.py
        │   └── urls.py
        │
        ├── prediction/
        │   ├── migrations/
        │   ├── models.py
        │   ├── serializers.py
        │   ├── views.py
        │   └── urls.py
        │
        ├── myproject/
        │   ├── settings.py
        │   ├── urls.py
        │   ├── asgi.py
        │   └── wsgi.py
        │
        ├── model/
        │   └── my-model.pt
        │
        └── manage.py
```

## API Development

The backend uses Django REST Framework (DRF) to develop RESTful APIs for communication between the frontend and backend.

### Main API Functionalities

- User Authentication APIs
- User Management APIs
- Fruit Prediction API
- Prediction History APIs
- Prediction Deletion APIs
- Prediction Count API

## Model Prediction Workflow

1. User uploads a fruit image.
2. Django REST Framework receives the image through an API request.
3. Pillow opens and converts the image into RGB format.
4. Torchvision resizes the image to 224 × 224.
5. The image is converted into a PyTorch tensor.
6. MobileNetV2 predicts the fruit classification.
7. Softmax calculates class probabilities.
8. The highest probability determines the predicted class and confidence score.
9. Prediction information is saved in the SQLite database.
10. Django REST Framework returns the prediction result as a JSON response.

## Database

**SQLite** is used to store:
- User information
- Fruit prediction records
- Image paths
- Classification results
- Confidence scores
- Prediction timestamps

## Backend Server

The backend is developed using Django and Django REST Framework.
