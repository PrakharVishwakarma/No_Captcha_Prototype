from rest_framework import serializers
from .models import BehavioralData

class BehavioralDataSerializer(serializers.ModelSerializer):
    """
    Serializer for the BehavioralData model.
    It validates the incoming behavioral data before saving it to the database.
    """
    class Meta:
        model = BehavioralData
        fields = '__all__' 