from mongoengine import Document
from mongoengine import StringField
from mongoengine import IntField
from mongoengine import DateTimeField
from mongoengine import ObjectIdField


class EndpointDB(Document):
    _id = ObjectIdField()
    hostname = StringField(max_length=50, required=True)
    IPAddress = StringField(max_length=50, required=True)
    apiKey = StringField(max_length=50, required=True)
    policyId = IntField(required=True)
    status = StringField(max_length=50, required=True)
    lastCommunication = DateTimeField(required=True)
