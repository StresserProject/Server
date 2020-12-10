from mongoengine import Document
from mongoengine import StringField
from mongoengine import ValidationError
from mongoengine import queryset
from Entities.Rule import Rule


class RuleDB(Document):
    ruleName = StringField(max_length=50, required=True)
    ruleType = StringField(max_length=50, required=True)
    ruleData = StringField(max_length=50, required=True)


class RuleService:

    def add_rule(self, rule):
        rule_id = RuleDB.objects(ruleName=rule.rule_name)
        if len(rule_id) == 0:
            rule_id = RuleDB(ruleName=rule.rule_name, ruleType=rule.rule_type, ruleData=rule.rule_data).save()
            return str(rule_id.id)
        return ""

    def get_rule_by_id(self, rule_id):
        try:
            return RuleDB.objects.get(id=rule_id)
        except (ValidationError, queryset.DoesNotExist):
            return None

    def get_rule_by_rule_name(self, rule_name):
        rules = RuleDB.objects(ruleName=rule_name)
        if len(rules) == 0:
            return None

        return rules[0]

    def update_rule_by_id(self, rule_id, rule):
        old_rule = RuleDB.objects.get(id=rule_id)
        RuleDB.update(old_rule, ruleName=rule.rule_name, ruleType=rule.rule_type, ruleData=rule.rule_data)
        return ""
