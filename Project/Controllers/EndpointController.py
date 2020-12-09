from flask import request
import json
from flask import abort
from Constants.Jsons import ENDPOINT_JSON
from Services.EndpointService import EndpointService

ENDPOINT_ID_KEY = "endpointId"
HOSTNAME_KEY = "hostname"
IP_ADDRESS = "IPAddress"
API_KEY = "apiKey"
POLICY_ID_KEY = "policyId"
STATUS = "status"


class EndpointController:
    def __init__(self):
        self.endpoint_service = EndpointService()

    def create_endpoint(self):
        """
        Creating new Endpoint
        :return: the new endpoint json, or 404 if endpoint exist
        """
        endpoint_json = request.json

        endpoint_id = self.endpoint_service.add_endpoint(endpoint_json[HOSTNAME_KEY], endpoint_json[IP_ADDRESS])
        if endpoint_id == "":
            abort(404)

        endpoint_id[ENDPOINT_ID_KEY] = endpoint_id
        endpoint_json[API_KEY] = 1

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
        endpoint_json[HOSTNAME_KEY] = endpoint[HOSTNAME_KEY]
        endpoint_json[IP_ADDRESS] = endpoint[IP_ADDRESS]
        endpoint_json[POLICY_ID_KEY] = endpoint[POLICY_ID_KEY]
        endpoint_json[STATUS] = endpoint[STATUS]

        return endpoint_json

    '''
    def login(self):
        """
        Login the user to the server
        :return: user json with id and API key
        """
        user_json = request.json
        username = user_json[USERNAME_KEY]
        password = user_json[HASHED_PASSWORD]

        user = self._user_service.get_user_by_name(username)
        if user is None:
            return abort(404)

        if user[HASHED_PASSWORD] != password:
            abort(404)

        user_json[USER_ID_KEY] = str(user.id)
        user_json[API_KEY] = 1

        return user_json
        
    '''
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
