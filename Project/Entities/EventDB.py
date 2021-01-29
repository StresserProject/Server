from mongoengine import Document
from mongoengine import StringField
from mongoengine import ObjectIdField


class EventDB(Document):
    _id = ObjectIdField()
    eventName = StringField(max_length=50, required=True)
    eventType = StringField(max_length=50, required=True)
    eventData = StringField(max_length=50, required=True)
