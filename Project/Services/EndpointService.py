from mongoengine import Document
from mongoengine import StringField
from mongoengine import ValidationError
from mongoengine import queryset
from mongoengine import IntField
from Boundaries.Endpoint import Endpoint


class EndpointDB(Document):
    hostname = StringField(max_length=50, required=True)
    IPAddress = StringField(max_length=50, required=True)
    apiKey = StringField(max_length=50, required=True)
    policyId = IntField(required=True)
    status = StringField(max_length=50, required=True)


class EndpointService:

    def add_endpoint(self, endpoint):
        endpoint_id = EndpointDB.objects(hostname=endpoint.hostname)
        if len(endpoint_id) == 0:
            endpoint_id = EndpointDB(hostname=endpoint.hostname, IPAddress=endpoint.ip_address,
                                     apiKey=str(endpoint.api_key), policyId=endpoint.policy_id,
                                     status=endpoint.status).save()
            return str(endpoint_id.id)
        return ""

    def get_endpoint_by_id(self, endpoint_id):
        try:
            return EndpointDB.objects.get(id=endpoint_id)
        except (ValidationError, queryset.DoesNotExist):
            return None

    def get_endpoint_by_hostname(self, hostname):
        endpoints = EndpointDB.objects(hostname=hostname)
        if len(endpoints) == 0:
            return None

        return endpoints[0]
