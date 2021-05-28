from flask import Flask, render_template


class Server:
    def __init__(self, address: str, port: int):
        self._address = address
        self._port = port

        self._funcs = dict()
        self._methods = dict()

        self._app = Flask("Server", static_folder="../../Web/build", static_url_path="/",
                          template_folder="../../Web/build")

        self._app.register_error_handler(404, lambda a: render_template("index.html"))

        self._app.add_url_rule("/", view_func=lambda: render_template("index.html"), methods=["GET"])

    def add_route(self, route, func, method):
        self._app.add_url_rule(route, view_func=func, methods=[method])

    def start_server(self):
        """
        Start the server on new thread
        :return:
        """
        self._app.run(self._address, self._port)
