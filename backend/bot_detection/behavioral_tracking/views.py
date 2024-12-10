
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import BehavioralData
from .serializers import BehavioralDataSerializer
from .ml_model.predict import is_bot

class BehaviorDataView(APIView):
    """
    API endpoint for receiving behavioral data from the frontend and processing it.
    """

    def post(self, request):
        # Deserialize and validate the incoming JSON data
        serializer = BehavioralDataSerializer(data=request.data)

        if serializer.is_valid():
            # Save the validated data to the database
            behavior_instance = serializer.save()

            # Call the ML model to predict bot-like behavior
            is_bot_detected = is_bot(request.data)

            # Update the is_bot field in the database
            behavior_instance.is_bot = is_bot_detected
            behavior_instance.save()

            # Send the result of bot detection back to the frontend
            return Response({'is_bot': is_bot_detected, 'status': 'success'}, status=status.HTTP_200_OK)

        # Return validation error if data is not valid
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
