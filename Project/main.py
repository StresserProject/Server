from os import environ
from Server import Server
import Controllers.UserController as UserController
from Controllers.EndpointController import EndpointController
import Controllers.RuleController as RuleController
import Controllers.EventController as EventController
import Controllers.PolicyController as PolicyController
from DAL import DAL


dal = DAL()
endpoint_controller = EndpointController()

try:
    server = Server("0.0.0.0", int(environ['PORT']))    # Heroku Deployment
except KeyError:
    server = Server("0.0.0.0", 80)    # Development

# User
server.add_route("/user", UserController.create_user, "POST")  # Signup
server.add_route("/user/<string:user_id>", UserController.get_user_data, "GET")   # GetUser
server.add_route("/user/login", UserController.login, "POST")   # Login
server.add_route("/user/<string:user_id>", UserController.delete_user, "DELETE")   # DeleteUser
server.add_route("/user/refresh", UserController.update_refresh_token, "GET")   # UpdateRefresh

# Endpoint
server.add_route("/endpoint", endpoint_controller.create_endpoint, "POST")  # CreateEndpoint
server.add_route("/endpoint/<string:endpoint_id>", endpoint_controller.get_endpoint_data, "GET")   # GetEndpoint
server.add_route("/endpoint/<string:endpoint_id>", endpoint_controller.keep_alive, "PUT")   # KeepAlive
server.add_route("/endpoint/<string:endpoint_id>", endpoint_controller.delete_endpoint, "DELETE")   # DeleteEndpoint

# Rule
server.add_route("/rule", RuleController.create_rule, "POST")  # CreateRule
server.add_route("/rule/<string:rule_id>", RuleController.get_rule_data, "GET")  # GetRule
server.add_route("/rule/<string:rule_id>", RuleController.update_rule, "PUT")   # UpdateRule
server.add_route("/rule/<string:rule_id>", RuleController.delete_rule, "DELETE")  # DeleteRule

# Event
server.add_route("/event", EventController.create_event, "POST")  # CreateEvent
server.add_route("/event/<string:event_id>", EventController.get_event_data, "GET")  # GetEvent
server.add_route("/event/<string:event_id>", EventController.update_event, "PUT")   # UpdateEvent
server.add_route("/event/<string:event_id>", EventController.delete_event, "DELETE")  # DeleteEvent

# Policy
server.add_route("/policy", PolicyController.create_policy, "POST")  # CreatePolicy
server.add_route("/policy/<string:policy_id>", PolicyController.get_policy_data, "GET")  # GetPolicy
server.add_route("/policy/<string:policy_id>", PolicyController.update_policy, "PUT")   # UpdatePolicy
server.add_route("/policy/<string:policy_id>", PolicyController.delete_policy, "DELETE")  # DeletePolicy

server.start_server()
