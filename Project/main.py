from os import environ
from Server import Server
from Controllers.UserController import UserController
from Controllers.EndpointController import EndpointController
from Controllers.RuleController import RuleController
from Controllers.EventController import EventController
from Controllers.PolicyController import PolicyController
from DAL import DAL


dal = DAL()
user_controller = UserController()
endpoint_controller = EndpointController()
rule_controller = RuleController()
event_controller = EventController()
policy_controller = PolicyController()

try:
    server = Server("0.0.0.0", int(environ['PORT']))    # Heroku Deployment
except KeyError:
    server = Server("0.0.0.0", 80)    # Development

# User
server.add_route("/user", user_controller.create_user, "POST")  # Signup
server.add_route("/user/<string:user_id>", user_controller.get_user_data, "GET")   # GetUser
server.add_route("/user/login", user_controller.login, "POST")   # Login
server.add_route("/user/<string:user_id>", user_controller.delete_user, "DELETE")   # DeleteUser

# Endpoint
server.add_route("/endpoint", endpoint_controller.create_endpoint, "POST")  # CreateEndpoint
server.add_route("/endpoint/<string:endpoint_id>", endpoint_controller.get_endpoint_data, "GET")   # GetEndpoint
server.add_route("/endpoint/<string:endpoint_id>", endpoint_controller.keep_alive, "PUT")   # KeepAlive
server.add_route("/endpoint/<string:endpoint_id>", endpoint_controller.delete_endpoint, "DELETE")   # DeleteEndpoint

# Rule
server.add_route("/rule", rule_controller.create_rule, "POST")  # CreateRule
server.add_route("/rule/<string:rule_id>", rule_controller.get_rule_data, "GET")  # GetRule
server.add_route("/rule/<string:rule_id>", rule_controller.update_rule, "PUT")   # UpdateRule
server.add_route("/rule/<string:rule_id>", rule_controller.delete_rule, "DELETE")  # DeleteRule

# Event
server.add_route("/event", event_controller.create_event, "POST")  # CreateEvent
server.add_route("/event/<string:event_id>", event_controller.get_event_data, "GET")  # GetEvent
server.add_route("/event/<string:event_id>", event_controller.update_event, "PUT")   # UpdateEvent
server.add_route("/event/<string:event_id>", event_controller.delete_event, "DELETE")  # DeleteEvent

# Policy
server.add_route("/policy", policy_controller.create_policy, "POST")  # CreatePolicy
server.add_route("/policy/<string:policy_id>", policy_controller.get_policy_data, "GET")  # GetPolicy
server.add_route("/policy/<string:policy_id>", policy_controller.update_policy, "PUT")   # UpdatePolicy
server.add_route("/policy/<string:policy_id>", policy_controller.delete_policy, "DELETE")  # DeletePolicy

server.start_server()
