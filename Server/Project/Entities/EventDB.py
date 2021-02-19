from mongoengine import Document
from mongoengine import StringField
from mongoengine import DateTimeField


class EventDB(Document):
    eventName = StringField(max_length=50, required=True)
    eventType = StringField(max_length=50, required=True)
    eventData = StringField(max_length=50, required=True)
    hostname = StringField(max_length=50, required=True)
    IPAddress = StringField(max_length=50, required=True)
    timeStamp = DateTimeField(required=True)

