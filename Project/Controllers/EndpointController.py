from flask import request
import json
from flask import abort
from Constants.Jsons import ENDPOINT_JSON
from Services.EndpointService import EndpointService
from Entities.Endpoint import Endpoint

ENDPOINT_ID_KEY = "endpointId"
HOSTNAME_KEY = "hostname"
IP_ADDRESS_KEY = "IPAddress"
API_KEY = "apiKey"
POLICY_ID_KEY = "policyId"
STATUS_KEY = "status"


class EndpointController:
    def __init__(self):
        self._endpoint_service = EndpointService()

    def create_endpoint(self):
        """
        Creating new Endpoint
        :return: the new endpoint json, or 404 if endpoint exist
        """
        endpoint_json = request.json
        endpoint_json[API_KEY] = str(1)
        endpoint_id = self._endpoint_service.add_endpoint(self.json_to_endpoint(endpoint_json))
        if endpoint_id == "":
            abort(404)

        endpoint_json[ENDPOINT_ID_KEY] = endpoint_id

        return endpoint_json

    def get_endpoint_data(self, endpoint_id):
        """
        Return the wanted endpoint by id
        :param endpoint_id: the wanted endpoint id
        :return: the endpoint json or 404 if endpoint not found
        """
        endpoint = self._endpoint_service.get_endpoint_by_id(endpoint_id)
        if endpoint is None:
            abort(404)

        endpoint_json = json.loads(ENDPOINT_JSON)
        endpoint_json[ENDPOINT_ID_KEY] = str(endpoint.id)
        endpoint_json[IP_ADDRESS_KEY] = endpoint[IP_ADDRESS_KEY]
        endpoint_json[HOSTNAME_KEY] = endpoint[HOSTNAME_KEY]
        endpoint_json[POLICY_ID_KEY] = endpoint[POLICY_ID_KEY]
        endpoint_json[STATUS_KEY] = endpoint[STATUS_KEY]

        return endpoint_json

    def keep_alive(self, endpoint_id):
        '''
        God knows what it does.
        :param endpoint_id:
        :return: ABORT!!!
        '''
        return ""

    def delete_endpoint(self, endpoint_id):
        """
        Delete endpoint from the db by id
        :param endpoint_id: the endpoint id to delete
        :return: empty string or 404 on failure
        """
        endpoint = self._endpoint_service.get_endpoint_by_id(endpoint_id)
        if endpoint is None:
            abort(404)

        endpoint.delete()

        return ""

    def json_to_endpoint(self, endpoint_json):
        return Endpoint(endpoint_json[ENDPOINT_ID_KEY], endpoint_json[POLICY_ID_KEY], endpoint_json[HOSTNAME_KEY],
                        endpoint_json[IP_ADDRESS_KEY], endpoint_json[STATUS_KEY])
