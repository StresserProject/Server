from os import environ
from Server import Server
from Controllers.UserController import UserController
from Controllers.EndpointController import EndpointController
from DAL import DAL


dal = DAL()
user_controller = UserController()
endpoint_controller = EndpointController()

server = Server("0.0.0.0", int(environ['PORT']))    # Heroku Command
# server = Server("0.0.0.0", 80)    # Debug

# User
server.add_route("/user", user_controller.create_user, "POST")  # Signup
server.add_route("/user/<string:user_id>", user_controller.get_user_data, "GET")   # GetUser
server.add_route("/user/login", user_controller.login, "GET")   # Login
server.add_route("/user/<string:user_id>", user_controller.delete_user, "DELETE")   # Delete

# Endpoint
server.add_route("/endpoint", endpoint_controller.create_endpoint, "POST")  # CreateEndpoint
server.add_route("/endpoint/<string:endpoint_id>", endpoint_controller.get_endpoint_data, "GET")   # GetEndpoint
# server.add_route("/endpoint/<string:endpoint_id>", endpoint_controller.login, "PUT")   # Login
server.add_route("/endpoint/<string:endpoint_id>", endpoint_controller.delete_endpoint, "DELETE")   # Delete

server.start_server()
