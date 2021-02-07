from mongoengine import ValidationError
from mongoengine import queryset
from Entities.EndpointDB import EndpointDB
from Boundaries.Endpoint import Endpoint
from Constants.JsonKeys import EndpointKeys
from datetime import datetime


def get_all_endpoints():
    return EndpointDB.objects()


def add_endpoint(endpoint: Endpoint):
    endpoint_id = EndpointDB.objects(hostname=endpoint.hostname)
    if len(endpoint_id) == 0:
        endpoint_id = EndpointDB(hostname=endpoint.hostname, IPAddress=endpoint.ip_address,
                                 apiKey=str(endpoint.api_key), policyId=endpoint.policy_id,
                                 status=endpoint.status, lastCommunication=datetime.now()).save()
        return str(endpoint_id.id)
    return ""


def get_endpoint_by_id(endpoint_id):
    try:
        return EndpointDB.objects.get(id=endpoint_id)
    except (ValidationError, queryset.DoesNotExist):
        return None


def get_endpoint_by_hostname(hostname):
    endpoints = EndpointDB.objects(hostname=hostname)
    if len(endpoints) == 0:
        return None

    return endpoints[0]


def update_date(endpoint_id):
    endpoint = EndpointDB.objects.get(id=endpoint_id)

    if endpoint is None:
        return None

    EndpointDB.update(endpoint, lastCommunication=datetime.now())
    return endpoint


def validate_api_key(api_key, endpoint_id):
    endpoint = EndpointDB.objects.get(id=endpoint_id)
    print(endpoint[EndpointKeys.API_KEY])
    if endpoint[EndpointKeys.API_KEY] != api_key:
        return False
    return True
