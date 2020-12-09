from mongoengine import Document
from mongoengine import StringField
from mongoengine import ValidationError
from mongoengine import queryset


class EndpointDB(Document):
    hostname = StringField(max_length=50, required=True)
    ip_address = StringField(max_length=50, required=True)


class EndpointService:

    def add_endpoint(self, hostname, ip_address):
        endpoint_id = EndpointDB.objects(hostname=hostname)
        if len(endpoint_id) == 0:
            endpoint_id = EndpointDB(hostname=hostname, ip_address=ip_address).save()
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
