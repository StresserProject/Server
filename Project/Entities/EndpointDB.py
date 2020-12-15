from mongoengine import Document
from mongoengine import StringField
from mongoengine import IntField


class EndpointDB(Document):
    hostname = StringField(max_length=50, required=True)
    IPAddress = StringField(max_length=50, required=True)
    apiKey = StringField(max_length=50, required=True)
    policyId = IntField(required=True)
    status = StringField(max_length=50, required=True)
