from flask import Flask


class Server:
    def __init__(self, address: str, port: int):
        self._address = address
        self._port = port

        self._funcs = dict()
        self._methods = dict()

        self._app = Flask("Server")

    def add_route(self, route, func, method):
        self._app.add_url_rule(route, view_func=func, methods=[method])

    def start_server(self):
        """
        Start the server on new thread
        :return:
        """
        self._app.run(self._address, self._port)
