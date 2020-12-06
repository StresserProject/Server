from os import environ
from Server import Server
from UserController import UserController
from DAL import DAL


dal = DAL()
user_controller = UserController()

server = Server("0.0.0.0", int(environ['PORT']))    # Heroku Command
# server = Server("0.0.0.0", 80)    # Debug

# User
server.add_route("/user", user_controller.create_user, "POST")  # Signup
server.add_route("/user/<string:user_id>", user_controller.get_user_data, "GET")   # GetUser
server.add_route("/user/login", user_controller.login, "GET")   # Login
server.add_route("/user/<string:user_id>", user_controller.delete_user, "DELETE")   # Delete

server.start_server()
