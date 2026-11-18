
from rest_framework import serializers
from .models import Prediction  
class PredictionSerializer(serializers.ModelSerializer):
   
    predicted_at = serializers.DateTimeField(format='%Y-%m-%dT%H:%M:%S.%fZ')

    class Meta:
        model = Prediction
        fields = ['image', 'classification', 'confidence', 'predicted_at']
