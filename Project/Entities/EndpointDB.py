from mongoengine import Document
from mongoengine import StringField
from mongoengine import DateTimeField


class EndpointDB(Document):
    hostname = StringField(max_length=50, required=True)
    IPAddress = StringField(max_length=50, required=True)
    apiKey = StringField(max_length=50, required=True)
    policyId = StringField(max_length=50, required=True)
    status = StringField(max_length=50, required=True)
    lastCommunication = DateTimeField(required=True)
