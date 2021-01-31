from mongoengine import ValidationError
from mongoengine import queryset
from Entities.RuleDB import RuleDB
from Boundaries.Rule import Rule


def add_rule( rule: Rule):
    rule_id = RuleDB.objects(ruleName=rule.rule_name)
    if len(rule_id) == 0:
        rule_id = RuleDB(ruleName=rule.rule_name, ruleType=rule.rule_type, ruleData=rule.rule_data).save()
        return str(rule_id.id)
    return ""


def get_rule_by_id( rule_id):
    try:
        return RuleDB.objects.get(id=rule_id)
    except (ValidationError, queryset.DoesNotExist):
        return None


def get_rule_by_rule_name( rule_name):
    rules = RuleDB.objects(ruleName=rule_name)
    if len(rules) == 0:
        return None

    return rules[0]


def update_rule_by_id(rule_id, rule):
    old_rule = RuleDB.objects.get(id=rule_id)
    RuleDB.update(old_rule, ruleName=rule.rule_name, ruleType=rule.rule_type, ruleData=rule.rule_data)
    return ""


def get_all_rules():
    return RuleDB.objects()
