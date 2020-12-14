
class Rule():
    def __init__(self, rule_id: int, rule_name: str, rule_type: str, rule_data: str):
        self.rule_id = rule_id
        self.rule_name = rule_name
        self.rule_type = rule_type
        self.rule_data = rule_data

    def __str__(self):
        return f"RuleId:{self.rule_id}, " \
               f"RuleName:{self.rule_name}, " \
               f"RuleType:{self.rule_type}, " \
               f"RuleData:{self.rule_data}"
