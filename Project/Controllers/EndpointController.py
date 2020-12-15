import json
from flask import request
from flask import abort
from Constants.Jsons import ENDPOINT_JSON
from Constants.JsonKeys import EndpointKeys as EndpointKeys
from Services.EndpointService import EndpointService
from Boundaries.Endpoint import Endpoint


class EndpointController:
    def __init__(self):
        self._endpoint_service = EndpointService()

    def create_endpoint(self):
        """
        Creating new Endpoint
        :return: the new endpoint json, or 404 if endpoint exist
        """
        endpoint_json = request.json
        endpoint_json[EndpointKeys.API_KEY] = str(1)
        endpoint_id = self._endpoint_service.add_endpoint(self._json_to_endpoint(endpoint_json))
        if endpoint_id == "":
            abort(404)

        endpoint_json[EndpointKeys.ENDPOINT_ID_KEY] = endpoint_id

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
        endpoint_json[EndpointKeys.ENDPOINT_ID_KEY] = str(endpoint.id)
        endpoint_json[EndpointKeys.IP_ADDRESS_KEY] = endpoint[EndpointKeys.IP_ADDRESS_KEY]
        endpoint_json[EndpointKeys.HOSTNAME_KEY] = endpoint[EndpointKeys.HOSTNAME_KEY]
        endpoint_json[EndpointKeys.POLICY_ID_KEY] = endpoint[EndpointKeys.POLICY_ID_KEY]
        endpoint_json[EndpointKeys.STATUS_KEY] = endpoint[EndpointKeys.STATUS_KEY]
        endpoint_json[EndpointKeys.LAST_COMMUNICATION_KEY] = endpoint[EndpointKeys.LAST_COMMUNICATION_KEY]

        return endpoint_json

    def keep_alive(self, endpoint_id):
        '''
        God knows what it does.
        :param endpoint_id:
        :return: ABORT!!!
        '''
        endpoint = self._endpoint_service.update_date(endpoint_id)
        if endpoint is None:
            abort(404)

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

    def _json_to_endpoint(self, endpoint_json):
        return Endpoint(endpoint_json[EndpointKeys.ENDPOINT_ID_KEY], endpoint_json[EndpointKeys.POLICY_ID_KEY],
                        endpoint_json[EndpointKeys.HOSTNAME_KEY], endpoint_json[EndpointKeys.IP_ADDRESS_KEY],
                        endpoint_json[EndpointKeys.STATUS_KEY], endpoint_json[EndpointKeys.LAST_COMMUNICATION_KEY])
