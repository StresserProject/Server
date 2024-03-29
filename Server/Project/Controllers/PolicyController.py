import json
from flask import request
from flask import abort
from Constants.Jsons import POLICY_JSON
import Services.PolicyService as PolicyService
from UserTokens import token_required
from Boundaries.Policy import Policy
from Constants.JsonKeys import PolicyKeys as PolicyKeys
from Constants.JsonKeys import ID_KEY


@token_required
def create_policy():
    """
    Creating new Policy
    :return: the new policy json, or 404 if policy exist
    """
    policy_json = request.json
    policy_id = PolicyService.add_policy(json_to_policy(policy_json))
    if policy_id == "":
        abort(404)

    policy_json[ID_KEY] = policy_id

    return policy_json


@token_required
def get_policy_data(policy_id):
    """
    Return the wanted policy by id
    :param policy_id: the wanted policy id
    :return: the policy json or 404 if policy not found
    """
    policy = PolicyService.get_policy_by_id(policy_id)
    if policy is None:
        abort(404)

    policy_json = json.loads(POLICY_JSON)
    policy_json[ID_KEY] = str(policy.id)
    policy_json[PolicyKeys.POLICY_NAME_KEY] = policy[PolicyKeys.POLICY_NAME_KEY]
    policy_json[PolicyKeys.NUMBER_OF_RULES_KEY] = policy[PolicyKeys.NUMBER_OF_RULES_KEY]
    policy_json[PolicyKeys.RULES_KEY] = policy[PolicyKeys.RULES_KEY]
    policy_json[PolicyKeys.UPDATE_KEY] = policy[PolicyKeys.UPDATE_KEY]

    return policy_json


@token_required
def update_policy(policy_id):
    """
    Update the wanted policy by id
    :param policy_id: the wanted policy id
    :return: empty string or 404 if policy not found
    """
    old_policy = PolicyService.get_policy_by_id(policy_id)
    if old_policy is None:
        abort(404)
    new_policy = PolicyService.update_policy_by_id(policy_id, json_to_policy(request.json))
    if new_policy is None:
        abort(406)
    return new_policy.__dict__


@token_required
def delete_policy(policy_id):
    """
    Delete policy from the db by id
    :param policy_id: the policy id to delete
    :return: empty string or 404 on failure
    """
    policy = PolicyService.get_policy_by_id(policy_id)
    if policy is None:
        abort(404)

    policy.delete()

    return {}


@token_required
def get_all_policy():
    policies = PolicyService.get_all_policies()
    formatted_policies = []
    for policy in policies:
        formatted_policies.append(Policy(str(policy.id), policy[PolicyKeys.POLICY_NAME_KEY],
                                         policy[PolicyKeys.NUMBER_OF_RULES_KEY], policy[PolicyKeys.RULES_KEY],
                                         policy[PolicyKeys.UPDATE_KEY]))
    return json.dumps(formatted_policies, default=lambda obj: obj.__dict__)


def json_to_policy(policy_json):

    if policy_json is None:
        abort(404)

    return Policy(policy_json[ID_KEY], policy_json[PolicyKeys.POLICY_NAME_KEY],
                  policy_json[PolicyKeys.NUMBER_OF_RULES_KEY], policy_json[PolicyKeys.RULES_KEY],
                  policy_json[PolicyKeys.UPDATE_KEY])


