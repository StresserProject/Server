from mongoengine import Document
from mongoengine import StringField


class UserDB(Document):
    username = StringField(max_length=50, required=True)
    password = StringField(max_length=64, required=True)
    refresh = StringField(max_length=148)
