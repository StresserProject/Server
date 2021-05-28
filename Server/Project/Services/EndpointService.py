from mongoengine import ValidationError
from mongoengine import queryset
from Entities.EndpointDB import EndpointDB
from Boundaries.Endpoint import Endpoint
from Services.PolicyService import get_policy_by_id
from datetime import datetime


def add_endpoint(endpoint: Endpoint):
    endpoint_id = EndpointDB.objects(hostname=endpoint.hostname)
    if len(endpoint_id) == 0:
        endpoint_id = EndpointDB(hostname=endpoint.hostname, IPAddress=endpoint.IPAddress,
                                 policyId=endpoint.policyId,
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


def delete_endpoint(endpoint_id):
    endpoint = get_endpoint_by_id(endpoint_id)
    if endpoint is not None:
        endpoint.delete()
    return None


def update_policy(endpoint_id, policy_id):
    endpoint = get_endpoint_by_id(endpoint_id)
    if endpoint is None:
        return 404
    if get_policy_by_id(policy_id) is None:
        return 406
    EndpointDB.update(endpoint, policyId=policy_id)
    return 200


def get_all_endpoints():
    return EndpointDB.objects()
