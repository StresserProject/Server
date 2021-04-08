from Boundaries import Rule


class Policy:
    def __init__(self, policy_id=0, policy_name: str = "Policy", number_of_rules: int = 0,
                 rules=[], update=0):
        self.id = policy_id
        self.policyName = policy_name
        self.numberOfRules = number_of_rules
        self.rules = rules
        self.updateCount = update

    def __str__(self):
        return f"ID:{self.id}, " \
               f"PolicyName:{self.policyName}, " \
               f"NumberOfRules:{self.numberOfRules}, " \
               f"Rules:{self.rules}, " \
               f"Update:{self.updateCount}"
