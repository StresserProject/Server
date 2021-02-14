from datetime import datetime


class Event:
    def __init__(self, event_id: int, event_name: str, event_type: str, event_data: str, hostname, ip_address,
                 time_stamp=datetime.now()):
        self.event_id = event_id
        self.event_name = event_name
        self.event_type = event_type
        self.event_data = event_data
        self.time_stamp = time_stamp
        self.hostname = hostname
        self.ip_address = ip_address

    def __str__(self):
        return f"EventId:{self.event_id}, " \
               f"EventName:{self.event_name}, " \
               f"EventType:{self.event_type}, " \
               f"EventData:{self.event_data}, " \
               f"Hostname:{self.hostname}, " \
               f"IPAddress:{self.ip_address}, " \
               f"TimeStamp:{self.time_stamp}"
