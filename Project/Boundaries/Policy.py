
class Policy:
    def __init__(self, policy_id=0, policy_name: str = "Policy", number_of_rules: int = 0,
                 rules=[], update=0):
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
