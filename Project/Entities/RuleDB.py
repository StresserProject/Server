from mongoengine import Document
from mongoengine import StringField


class RuleDB(Document):
    ruleName = StringField(max_length=50, required=True)
    ruleType = StringField(max_length=50, required=True)
    ruleData = StringField(max_length=50, required=True)
