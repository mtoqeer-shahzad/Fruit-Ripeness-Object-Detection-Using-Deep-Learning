
from rest_framework import serializers
from .models import Prediction  # Assuming your model is called Prediction

class PredictionSerializer(serializers.ModelSerializer):
    # Ensure predicted_at is serialized as a string in ISO 8601 format
    predicted_at = serializers.DateTimeField(format='%Y-%m-%dT%H:%M:%S.%fZ')

    class Meta:
        model = Prediction
        fields = ['image', 'classification', 'confidence', 'predicted_at']
