from django.urls import path
from . import views

urlpatterns = [
    path('predict_post/', views.predict_image, name='predict_image'),
    path('saved_records/', views.save_prediction, name='predict_image'),
    path('predictions_get_all/', views.get_predictions, name='get_predictions'),
    path('predictions/<int:pk>/', views.get_prediction, name='get_prediction'),
    path('predictions/<int:pk>/delete/', views.delete_prediction, name='delete_prediction'),
    path('predictions/delete_all/', views.delete_all_predictions, name='delete_all_predictions'),
    path('count_prediction/',views.get_prediction_count,name='total-count')
]
