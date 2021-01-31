from mongoengine import ValidationError
from mongoengine import DoesNotExist
from mongoengine import queryset
from Entities.UserDB import UserDB


def add_user(username, password) -> str:
    user = UserDB(username=username, password=password).save()
    return str(user.id)


def get_user_by_id(user_id) -> UserDB:
    try:
        return UserDB.objects.get(id=user_id)
    except (ValidationError, queryset.DoesNotExist):
        return None


def get_user_by_name(username):
    users = UserDB.objects(username=username)
    if len(users) == 0:
        return None

    return users[0]


def is_username_unique(username):
    try:
        UserDB.objects.get(username=username)
    except DoesNotExist:
        return True

    return False


def set_refresh_cookie(user_id, refresh_cookie):
    user = get_user_by_id(user_id)
    user.update(refresh=refresh_cookie)
