# For training ml models async

import os
from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'bot_detection.settings')

app = Celery('bot_detection')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()
