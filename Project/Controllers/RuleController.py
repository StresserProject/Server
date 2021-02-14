import json
from flask import request
from flask import abort
from Constants.Jsons import RULE_JSON
from Constants.JsonKeys import RuleKeys
from Constants.JsonKeys import ID_KEY
import Services.RuleService as RuleService
from Boundaries.Rule import Rule
from UserTokens import token_required


@token_required
def create_rule():
    """
    Creating new Rule
    :return: the new rule json, or 404 if rule exist
    """
    rule_json = request.json

    rule_id = RuleService.add_rule(json_to_rule(rule_json))
    if rule_id == "":
        abort(404)

    rule_json[ID_KEY] = rule_id

    return rule_json


@token_required
def get_rule_data(rule_id):
    """
    Return the wanted rule by id
    :param rule_id: the wanted rule id
    :return: the rule json or 404 if rule not found
    """
    rule = RuleService.get_rule_by_id(rule_id)
    if rule is None:
        abort(404)

    rule_json = rule_to_json(rule)

    return rule_json


@token_required
def update_rule(rule_id):
    """
    Updating the rule to the server
    :return: rule json with id
    """
    old_rule = RuleService.get_rule_by_id(rule_id)
    if old_rule is None:
        abort(404)

    new_rule = request.json
    old_rule = RuleService.update_rule_by_id(rule_id, json_to_rule(new_rule))

    return old_rule


@token_required
def delete_rule(rule_id):
    """
    Delete rule from the db by id
    :param rule_id: the rule id to delete
    :return: empty string or 404 on failure
    """
    rule = RuleService.get_rule_by_id(rule_id)
    if rule is None:
        abort(404)

    rule.delete()

    return {}


def json_to_rule(rule_json):
    return Rule(rule_json[ID_KEY], rule_json[RuleKeys.RULE_NAME_KEY],
                rule_json[RuleKeys.RULE_TYPE_KEY], rule_json[RuleKeys.RULE_DATA_KEY])


@token_required
def get_all_rules():
    rules = RuleService.get_all_rules()
    formatted_rules = []
    for rule in rules:
        formatted_rules.append(Rule(rule.id, rule[RuleKeys.RULE_NAME_KEY],
                                    rule[RuleKeys.RULE_TYPE_KEY], rule[RuleKeys.RULE_DATA_KEY]))

    return json.dumps(formatted_rules, default=lambda obj: obj.__dict__)


def rule_to_json(rule):
    rule_json = json.loads(RULE_JSON)
    rule_json[ID_KEY] = str(rule.id)
    rule_json[RuleKeys.RULE_NAME_KEY] = rule[RuleKeys.RULE_NAME_KEY]
    rule_json[RuleKeys.RULE_TYPE_KEY] = rule[RuleKeys.RULE_TYPE_KEY]
    rule_json[RuleKeys.RULE_DATA_KEY] = rule[RuleKeys.RULE_DATA_KEY]

    return rule_json
