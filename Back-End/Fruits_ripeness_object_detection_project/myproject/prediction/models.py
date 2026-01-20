

from django.db import models

class Prediction(models.Model):
    image = models.ImageField(upload_to='images/')
    classification = models.CharField(max_length=255)
    confidence = models.FloatField()
    predicted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.classification} - {self.confidence}%"
