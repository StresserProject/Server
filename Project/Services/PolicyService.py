from mongoengine import ValidationError
from mongoengine import queryset
from Entities.PolicyDB import PolicyDB
from Boundaries.Policy import Policy
from Constants.PolicyKeys import UPDATE_KEY


class PolicyService:

    def add_policy(self, policy: Policy):
        policy_id = PolicyDB.objects(policyName=policy.policy_name)
        if len(policy_id) == 0:
            policy_id = PolicyDB(policyName=policy.policy_name, numberOfRules=policy.number_of_rules,
                                 rules=policy.rules, updateCount=policy.update).save()
            return str(policy_id.id)
        return ""

    def get_policy_by_id(self, policy_id):
        try:
            return PolicyDB.objects.get(id=policy_id)
        except (ValidationError, queryset.DoesNotExist):
            return None

    def get_policy_by_policy_name(self, policy_name):
        policies = PolicyDB.objects(policyName=policy_name)
        if len(policies) == 0:
            return None

        return policies[0]

    def update_policy_by_id(self, policy_id, policy):
        old_policy = PolicyDB.objects.get(id=policy_id)
        update_count = old_policy[UPDATE_KEY] + 1
        PolicyDB.update(old_policy, policyName=policy.policy_name, numberOfRules=policy.number_of_rules,
                        rules=policy.rules, updateCount=update_count)
        return ""
