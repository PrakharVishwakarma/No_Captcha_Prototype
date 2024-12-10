from django.urls import path
from . import views

urlpatterns = [
    path('api/validate/', views.BehaviorDataView.as_view(), name='behavior-data'),
]