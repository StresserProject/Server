from flask import request
import json
from flask import abort
from Constants.Jsons import RULE_JSON
from Services.RuleService import RuleService
from Boundaries.Rule import Rule

RULE_ID_KEY = "ruleId"
RULE_NAME_KEY = "ruleName"
RULE_TYPE_KEY = "ruleType"
RULE_DATA_KEY = "ruleData"


class RuleController:
    def __init__(self):
        self._rule_service = RuleService()

    def json_to_rule(self, rule_json):
        return Rule(rule_json[RULE_ID_KEY], rule_json[RULE_NAME_KEY], rule_json[RULE_TYPE_KEY],
                    rule_json[RULE_DATA_KEY])

    def create_rule(self):
        """
        Creating new Rule
        :return: the new rule json, or 404 if rule exist
        """
        rule_json = request.json

        rule_id = self._rule_service.add_rule(self.json_to_rule(rule_json))
        if rule_id == "":
            abort(404)

        rule_json[RULE_ID_KEY] = rule_id

        return rule_json

    def get_rule_data(self, rule_id):
        """
        Return the wanted rule by id
        :param rule_id: the wanted rule id
        :return: the rule json or 404 if rule not found
        """
        rule = self._rule_service.get_rule_by_id(rule_id)
        if rule is None:
            abort(404)

        endpoint_json = json.loads(RULE_JSON)
        endpoint_json[RULE_ID_KEY] = str(rule.id)
        endpoint_json[RULE_NAME_KEY] = rule[RULE_NAME_KEY]
        endpoint_json[RULE_TYPE_KEY] = rule[RULE_TYPE_KEY]
        endpoint_json[RULE_DATA_KEY] = rule[RULE_DATA_KEY]

        return endpoint_json

    def update_rule(self, rule_id):
        """
        Updating the rule to the server
        :return: rule json with id
        """
        old_rule = self._rule_service.get_rule_by_id(rule_id)
        if old_rule is None:
            abort(404)

        new_rule = request.json
        old_rule = self._rule_service.update_rule_by_id(rule_id, self.json_to_rule(new_rule))

        return old_rule

    def delete_rule(self, rule_id):
        """
        Delete rule from the db by id
        :param rule_id: the rule id to delete
        :return: empty string or 404 on failure
        """
        rule = self._rule_service.get_rule_by_id(rule_id)
        if rule is None:
            abort(404)

        rule.delete()

        return ""
