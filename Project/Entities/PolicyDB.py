from mongoengine import Document
from mongoengine import StringField
from mongoengine import IntField
from mongoengine import ListField


class PolicyDB(Document):
    policyName = StringField(max_length=50, required=True)
    numberOfRules = IntField(min_value=0, required=True)
    rules = ListField(StringField(max_length=50, required=True))
    updateCount = IntField(min_value=0, required=True)
