from datetime import datetime


class Endpoint:
    def __init__(self, endpoint_id: str, policy_id: str, hostname: str, ip_address: str, status: str, api_key: str,
                 last_communication=datetime.now()):
        self.endpoint_id = endpoint_id
        self.hostname = hostname
        self.ip_address = ip_address
        self.api_key = api_key
        self.policy_id = policy_id
        self.status = status
        self.last_communication = last_communication

    def __str__(self):
        return f"EndpointId:{self.endpoint_id}, " \
               f"IPAddress:{self.ip_address}, " \
               f"Hostname:{self.hostname}, " \
               f"ApiKey:{self.api_key}" \
               f"PolicyId:{self.policy_id}" \
               f"Status:{self.status}" \
               f"LastCommunication:{self.last_communication}"

