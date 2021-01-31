

class Rule:
    def __init__(self, rule_id: str, rule_name: str, rule_type: str, rule_data: str):
        self.id = str(rule_id)
        self.name = rule_name
        self.type = rule_type
        self.data = rule_data

    def __str__(self):
        return f"RuleId:{self.id}, " \
               f"RuleName:{self.name}, " \
               f"RuleType:{self.type}, " \
               f"RuleData:{self.data}"

