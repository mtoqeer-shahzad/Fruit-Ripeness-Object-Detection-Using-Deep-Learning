from django.http import JsonResponse
from httpx import Response
from rest_framework.decorators import api_view
import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image
from .models import Prediction  # Import your Prediction model

# Load model
model_path = r'D:\\Projects\\myproject\\myproject\\model\\my-model.pt'
model = models.mobilenet_v2(weights=None)  # Updated way (pretrained=False deprecated)
model.classifier[1] = nn.Linear(1280, 12)  # 12 output classes
model.load_state_dict(torch.load(model_path, map_location=torch.device('cpu')))
model.eval()

# Class labels (Global)
CLASSIFICATIONS = [
    'Overripe_Apple', 'Overripe_Banana', 'Overripe_Lemon', 'Overripe_Orange',
    'Ripe_Apple', 'Ripe_Banana', 'Ripe_Lemon', 'Ripe_Orange',
    'Unripe_Apple', 'Unripe_Banana', 'Unripe_Lemon', 'Unripe_Orange'
]

# Fruit types for validation (valid fruits only)
VALID_FRUIT_TYPES = ['Apple', 'Banana', 'Lemon', 'Orange']

# Create/Predict view
@api_view(['POST'])
def predict_image(request):
    if 'file' not in request.FILES:
        return JsonResponse({'error': 'No file provided'}, status=400)

    file = request.FILES['file']
    
    try:
        image = Image.open(file).convert('RGB')
    except Exception:
        return JsonResponse({'error': 'Invalid image file'}, status=400)

    preprocess = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),  # No normalization (model trained without normalization)
    ])
    input_tensor = preprocess(image).unsqueeze(0)

    # Predict class
    with torch.no_grad():
        output = model(input_tensor)
        probs = torch.nn.functional.softmax(output, dim=1)
        confidence, predicted_class = torch.max(probs, 1)
        predicted_class = predicted_class.item()
        confidence = confidence.item() * 100  # Percentage confidence

    predicted_label = CLASSIFICATIONS[predicted_class]

    # Validate fruit type
    valid_fruit = False
    for fruit in VALID_FRUIT_TYPES:
        if fruit in predicted_label:
            valid_fruit = True
            break

    if not valid_fruit:
        return JsonResponse({'error': 'Invalid fruit type, please upload Apple, Banana, Lemon, or Orange'}, status=400)

    # Save prediction to database
    prediction = Prediction.objects.create(
        image=file,
        classification=predicted_label,
        confidence=confidence,
    )

    return JsonResponse({
        'id': prediction.id,
        'classification': predicted_label,
        'confidence': f"{confidence:.2f}%",
        'date': prediction.predicted_at.strftime("%Y-%m-%d %H:%M:%S")
    })
    
    
@api_view(['POST'])
def save_prediction(request):
    """Endpoint for saving predictions (separate from prediction)"""
    data = request.data
    
    # Check required fields
    required_fields = ['classification', 'confidence', 'image_url']
    if not all(field in data for field in required_fields):
        return Response({'error': 'Missing required fields'}, status=400)
    
    # Check for duplicates by image content hash or filename
    if Prediction.objects.filter(image__contains=data['image_url']).exists():
        return Response({'error': 'This prediction already exists'}, status=400)

    try:
        # In production, you'd want to properly handle the file upload here
        prediction = Prediction.objects.create(
            classification=data['classification'],
            confidence=float(data['confidence'].replace('%', '')),
            # You'd need proper file handling here
            image=request.FILES.get('file')  # This needs proper implementation
        )
        
        return Response({
            'id': prediction.id,
            'message': 'Prediction saved successfully',
            'image_url': prediction.image.url if prediction.image else None
        })
    except Exception as e:
        return Response({'error': str(e)}, status=400)   


# Get all predictions
@api_view(['GET'])
def get_predictions(request):
    predictions = Prediction.objects.all().order_by('-predicted_at')
    predictions_data = [{
        'id': p.id,
        'image_url': request.build_absolute_uri(p.image.url) if p.image else None,
        'classification': p.classification,
        'confidence': f"{p.confidence:.2f}%",
        'date': p.predicted_at.strftime("%Y-%m-%d %H:%M:%S")
    } for p in predictions]
    
    return JsonResponse({'predictions': predictions_data})

# Get single prediction
@api_view(['GET'])
def get_prediction(request, pk):
    try:
        prediction = Prediction.objects.get(pk=pk)
        return JsonResponse({
            'id': prediction.id,
            'image_url': request.build_absolute_uri(prediction.image.url) if prediction.image else None,
            'classification': prediction.classification,
            'confidence': f"{prediction.confidence:.2f}%",
            'date': prediction.predicted_at.strftime("%Y-%m-%d %H:%M:%S")
        })
    except Prediction.DoesNotExist:
        return JsonResponse({'error': 'Prediction not found'}, status=404)

# Delete single prediction
@api_view(['DELETE'])
def delete_prediction(request, pk):
    try:
        prediction = Prediction.objects.get(pk=pk)
        prediction.delete()
        return JsonResponse({'message': 'Prediction deleted successfully'})
    except Prediction.DoesNotExist:
        return JsonResponse({'error': 'Prediction not found'}, status=404)

# Delete all predictions
@api_view(['DELETE'])
def delete_all_predictions(request):
    count = Prediction.objects.all().count()
    Prediction.objects.all().delete()
    return JsonResponse({'message': f'Successfully deleted {count} predictions'})

# Get prediction count

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Prediction
@api_view(['GET'])
def get_prediction_count(request):
    count = Prediction.objects.count()
    return Response({'count': count})
