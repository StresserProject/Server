from mongoengine import Document
from mongoengine import StringField


class UserDB(Document):
    username = StringField(max_length=50, required=True)
    userHashedPassword = StringField(max_length=50, required=True)
