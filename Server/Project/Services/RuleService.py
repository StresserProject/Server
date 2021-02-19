from mongoengine import ValidationError
from mongoengine import queryset
from Entities.RuleDB import RuleDB
from Boundaries.Rule import Rule
from Constants.JsonKeys import RuleKeys


def add_rule(rule: Rule):
    if is_name_unique(rule.ruleName):
        rule_id = RuleDB(ruleName=rule.ruleName, ruleType=rule.ruleType, ruleData=rule.ruleData).save()
        return str(rule_id.id)
    return ""


def get_rule_by_id(rule_id):
    try:
        return RuleDB.objects.get(id=rule_id)
    except (ValidationError, queryset.DoesNotExist):
        return None


def get_rule_by_rule_name(rule_name):
    rules = RuleDB.objects(ruleName=rule_name)
    if len(rules) == 0:
        return None

    return rules[0]


def update_rule_by_id(rule_id, rule):
    old_rule = RuleDB.objects.get(id=rule_id)
    if rule.ruleName == old_rule[RuleKeys.RULE_NAME_KEY] or is_name_unique(rule.ruleName):
        RuleDB.update(old_rule, ruleName=rule.ruleName, ruleType=rule.ruleType, ruleData=rule.ruleData)
        rule.id = rule_id
        return rule
    return None


def is_name_unique(rule_name):
    rule_id = RuleDB.objects(ruleName=rule_name)
    if len(rule_id) == 0:
        return True
    return False


def get_all_rules():
    return RuleDB.objects()

