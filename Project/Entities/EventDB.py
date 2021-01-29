from mongoengine import Document
from mongoengine import StringField


class EventDB(Document):
    eventName = StringField(max_length=50, required=True)
    eventType = StringField(max_length=50, required=True)
    eventData = StringField(max_length=50, required=True)
