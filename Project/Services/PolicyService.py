from mongoengine import ValidationError
from mongoengine import queryset
from Entities.PolicyDB import PolicyDB
from Boundaries.Policy import Policy
from Constants.JsonKeys import PolicyKeys
from Constants.JsonKeys import ID_KEY


def add_policy(policy: Policy):
    default_policy = get_policy_by_policy_name("Default-Policy")
    if default_policy is not None and policy.policyName == "Default-Policy":
        return default_policy[ID_KEY]

    if is_name_unique(policy.policyName):
        policy_id = PolicyDB(policyName=policy.policyName, numberOfRules=policy.numberOfRules,
                             rules=policy.rules, updateCount=policy.updateCount).save()
        return str(policy_id.id)
    return ""


def get_policy_by_id(policy_id):
    try:
        return PolicyDB.objects.get(id=policy_id)
    except (ValidationError, queryset.DoesNotExist):
        return None


def get_policy_by_policy_name(policy_name):
    policies = PolicyDB.objects(policyName=policy_name)
    if len(policies) == 0:
        return None

    return policies[0]


def update_policy_by_id(policy_id, policy: Policy):
    try:
        old_policy = PolicyDB.objects.get(id=policy_id)
    except (ValidationError, queryset.DoesNotExist):
        return None
    if is_name_unique(policy.policyName) or old_policy[PolicyKeys.POLICY_NAME_KEY] == policy.policyName:
        update_count = old_policy[PolicyKeys.UPDATE_KEY] + 1
        PolicyDB.update(old_policy, policyName=policy.policyName, numberOfRules=policy.numberOfRules,
                        rules=policy.rules, updateCount=update_count)
        policy.updateCount = update_count
        policy.id = policy_id
        return policy
    return None


def is_name_unique(policy_name):
    policy_id = PolicyDB.objects(policyName=policy_name)
    if len(policy_id) == 0:
        return True
    return False


def get_all_policies():
    return PolicyDB.objects()
