
class Policy:
    def __init__(self, policy_id, policy_name: str, number_of_rules: int, rules, update):
        self.policy_id = policy_id
        self.policy_name = policy_name
        self.number_of_rules = number_of_rules
        self.rules = rules
        self.update = update

    def __str__(self):
        return f"PolicyId:{self.policy_id}, " \
               f"PolicyName:{self.policy_name}, " \
               f"NumberOfRules:{self.policy_name}, " \
               f"Rules:{self.rules}, " \
               f"Update:{self.update}"
