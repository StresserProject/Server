
class Event():
    def __init__(self, event_id: int, event_name: str, event_type: str, event_data: str):
        self.event_id = event_id
        self.event_name = event_name
        self.event_type = event_type
        self.event_data = event_data

    def __str__(self):
        return f"RuleId:{self.event_id}, " \
               f"RuleName:{self.event_name}, " \
               f"RuleType:{self.event_type}, " \
               f"RuleData:{self.event_data}"
