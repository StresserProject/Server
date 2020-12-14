

class Endpoint:
    def __init__(self, endpoint_id: str, policy_id: int, hostname: str, ip_address: str, status: str):
        self.endpoint_id = endpoint_id
        self.hostname = hostname
        self.ip_address = ip_address
        self.api_key = 1
        self.policy_id = policy_id
        self.status = status

    def __str__(self):
        return f"EndpointId:{self.endpoint_id}, " \
               f"IPAddress:{self.ip_address}, " \
               f"Hostname:{self.hostname}, " \
               f"ApiKey:{self.api_key}" \
               f"PolicyId:{self.policy_id}" \
               f"Status:{self.status}"

