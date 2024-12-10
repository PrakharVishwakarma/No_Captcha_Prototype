# behavior/models.py
from django.db import models

class BehavioralData(models.Model):
    """
    Model to store behavioral data sent from the frontend.
    """
    mouse_movements = models.JSONField()  # To store mouse movements as a list of coordinates
    scroll_positions = models.JSONField()  # To store scroll positions
    key_press_times = models.JSONField()  # To store keypress timestamps
    clicks = models.JSONField()  # To store click coordinates and times
    session_duration = models.BigIntegerField()  # Session duration in milliseconds
    device_fingerprint = models.JSONField()  # Fingerprint identifier
    # device_fingerprint = models.CharField(max_length=255)  # Fingerprint identifier
    is_bot = models.BooleanField(default=False)  # Field to store bot detection result

    def __str__(self):
        return f"Session {self.id} - {'Bot' if self.is_bot else 'Human'}"
  