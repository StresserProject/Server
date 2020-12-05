from Server import Server
from UserController import UserController


user_controller = UserController()

server = Server("0.0.0.0", 80)

# User
server.add_route("/user", user_controller.create_user, "POST")  # Signup
server.add_route("/user/<int:user_id>", user_controller.get_user_data, "GET")   # GetUser
server.add_route("/user/login", user_controller.login, "GET")   # Login
server.add_route("/user/<int:user_id>", user_controller.delete_user, "DELETE")   # Delete

server.start_server()
