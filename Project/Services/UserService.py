from mongoengine import Document
from mongoengine import StringField
from mongoengine import ValidationError
from mongoengine import queryset


class UserDB(Document):
    username = StringField(max_length=50, required=True)
    userHashedPassword = StringField(max_length=50, required=True)


class UserService:

    def add_user(self, username, password):
        user = UserDB.objects(username=username)
        if len(user) == 0:
            user = UserDB(username=username, userHashedPassword=password).save()
            return str(user.id)
        return ""

    def get_user_by_id(self, user_id):
        try:
            return UserDB.objects.get(id=user_id)
        except (ValidationError, queryset.DoesNotExist):
            return None

    def get_user_by_name(self, username):
        users = UserDB.objects(username=username)
        if len(users) == 0:
            return None

        return users[0]
