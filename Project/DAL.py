from mongoengine import *


def singleton(class_):
    instances = {}

    def get_instance(*args, **kwargs):
        if class_ not in instances:
            instances[class_] = class_(*args, **kwargs)
        return instances[class_]
    return get_instance


@singleton
class DAL:
    def __init__(self):
        self._db = connect("stresser-demo",
                           host="mongodb+srv://stresser-project:stresser-project@stresser-project.x78po.mongodb.net/stresser-demo")
