import json
from flask import request
from flask import abort
from Constants.Jsons import POLICY_JSON
from Services.PolicyService import PolicyService
from Boundaries.Policy import Policy
from Constants.JsonKeys import PolicyKeys as PolicyKeys


class PolicyController:
    def __init__(self):
        self._policy_service = PolicyService()

    def create_policy(self):
        """
        Creating new Policy
        :return: the new policy json, or 404 if policy exist
        """
        policy_json = request.json
        policy_id = self._policy_service.add_policy(self._json_to_policy(policy_json))
        if policy_id == "":
            abort(404)

        policy_json[PolicyKeys.POLICY_ID_KEY] = policy_id

        return policy_json

    def get_policy_data(self, policy_id):
        """
        Return the wanted policy by id
        :param policy_id: the wanted policy id
        :return: the policy json or 404 if policy not found
        """
        policy = self._policy_service.get_policy_by_id(policy_id)
        if policy is None:
            abort(404)

        policy_json = json.loads(POLICY_JSON)
        policy_json[PolicyKeys.POLICY_ID_KEY] = str(policy.id)
        policy_json[PolicyKeys.POLICY_NAME_KEY] = policy[PolicyKeys.POLICY_NAME_KEY]
        policy_json[PolicyKeys.NUMBER_OF_RULES_KEY] = policy[PolicyKeys.NUMBER_OF_RULES_KEY]
        policy_json[PolicyKeys.RULES_KEY] = policy[PolicyKeys.RULES_KEY]
        policy_json[PolicyKeys.UPDATE_KEY] = policy[PolicyKeys.UPDATE_KEY]

        return policy_json

    def update_policy(self, policy_id):
        """
        Update the wanted policy by id
        :param policy_id: the wanted policy id
        :return: empty string or 404 if policy not found
        """
        old_policy = self._policy_service.get_policy_by_id(policy_id)
        if old_policy is None:
            abort(404)

        old_policy = self._policy_service.update_policy_by_id(policy_id, self._json_to_policy(request.json))

        return old_policy

    def delete_policy(self, policy_id):
        """
        Delete policy from the db by id
        :param policy_id: the policy id to delete
        :return: empty string or 404 on failure
        """
        policy = self._policy_service.get_policy_by_id(policy_id)
        if policy is None:
            abort(404)

        policy.delete()

        return ""

    def _json_to_policy(self, policy_json):

        if policy_json is None:
            abort(404)

        return Policy(policy_json[PolicyKeys.POLICY_ID_KEY], policy_json[PolicyKeys.POLICY_NAME_KEY],
                      policy_json[PolicyKeys.NUMBER_OF_RULES_KEY],policy_json[PolicyKeys.RULES_KEY],
                      policy_json[PolicyKeys.UPDATE_KEY])
