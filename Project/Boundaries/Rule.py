

class Rule:
    def __init__(self, rule_id: str, rule_name: str, rule_type: str, rule_data: str):
        self.id = str(rule_id)
        self.ruleName = rule_name
        self.ruleType = rule_type
        self.ruleData = rule_data

    def __str__(self):
        return f"RuleId:{self.id}, " \
               f"RuleName:{self.ruleName}, " \
               f"RuleType:{self.ruleType}, " \
               f"RuleData:{self.ruleData}"

