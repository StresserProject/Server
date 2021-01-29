from mongoengine import Document
from mongoengine import StringField
from mongoengine import ObjectIdField


class RuleDB(Document):
    _id = ObjectIdField()
    ruleName = StringField(max_length=50, required=True)
    ruleType = StringField(max_length=50, required=True)
    ruleData = StringField(max_length=50, required=True)
