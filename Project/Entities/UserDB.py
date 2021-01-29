from mongoengine import Document
from mongoengine import StringField
from mongoengine import ObjectIdField


class UserDB(Document):
    _id = ObjectIdField()
    username = StringField(max_length=50, required=True)
    password = StringField(max_length=64, required=True)
    refresh = StringField(max_length=148)
