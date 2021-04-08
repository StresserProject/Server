from datetime import datetime


class Event:
    def __init__(self, event_id: str, event_name: str, event_type: str, event_data: str, hostname, ip_address,
                 time_stamp=datetime.now()):
        self.id = event_id
        self.eventName = event_name
        self.eventType = event_type
        self.eventData = event_data
        self.timeStamp = time_stamp
        self.hostname = hostname
        self.IPAddress = ip_address

    def __str__(self):
        return f"ID:{self.id}, " \
               f"EventName:{self.eventName}, " \
               f"EventType:{self.eventType}, " \
               f"EventData:{self.eventData}, " \
               f"Hostname:{self.hostname}, " \
               f"IPAddress:{self.IPAddress}, " \
               f"TimeStamp:{self.timeStamp}"
