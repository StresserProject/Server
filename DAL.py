import sqlite3


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
        self._db = sqlite3.connect(":memory:")
        self._create_tables()
        self.add_user("Blalba", "bla")
        self.add_user("Blalba", "bla")

    def _create_tables(self):
        self._db.execute("CREATE TABLE users (userId INTEGER PRIMARY KEY AUTOINCREMENT, "
                         "username text NOT NULL, "
                         "hashedPassword text NOT NULL)")

    def check_db(self):
        return self._db.execute("SELECT * FROM users").fetchall()

    def add_user(self, username, hashed_password):
        sql = '''INSERT INTO users(username, hashedPassword)
                 VALUES(?,?)'''
        values = (username, hashed_password)
        self._db.execute(sql, values)
        self._db.commit()
