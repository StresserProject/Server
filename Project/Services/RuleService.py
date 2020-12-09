from mongoengine import Document
from mongoengine import StringField
from mongoengine import ValidationError
from mongoengine import queryset


class RuleDB(Document):
    ruleName = StringField(max_length=50, required=True)
    ruleType = StringField(max_length=50, required=True)
    ruleData = StringField(max_length=50, required=True)


class RuleService:

    def add_rule(self, rule_name, rule_type, rule_data):
        rule_id = RuleDB.objects(ruleName=rule_name)
        if len(rule_id) == 0:
            rule_id = RuleDB(ruleName=rule_name, ruleType=rule_type, ruleData=rule_data).save()
            return str(rule_id.id)
        return ""

    def get_rule_by_id(self, rule_id):
        try:
            return RuleDB.objects.get(id=rule_id)
        except (ValidationError, queryset.DoesNotExist):
            return None

    def get_endpoint_by_hostname(self, ruleName):
        rules = RuleDB.objects(ruleName=ruleName)
        if len(rules) == 0:
            return None

        return rules[0]
