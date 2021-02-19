from datetime import datetime


class Endpoint:
    def __init__(self, endpoint_id: str, policy_id: str, hostname: str, ip_address: str, status: str,
                 last_communication=datetime.now()):
        self.id = endpoint_id
        self.hostname = hostname
        self.IPAddress = ip_address
        self.policyId = policy_id
        self.status = status
        self.lastCommunication = last_communication

    def __str__(self):
        return f"ןג:{self.id}, " \
               f"IPAddress:{self.IPAddress}, " \
               f"Hostname:{self.hostname}, " \
               f"PolicyId:{self.policyId}" \
               f"Status:{self.status}" \
               f"LastCommunication:{self.lastCommunication}"

