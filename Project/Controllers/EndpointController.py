import json
from flask import request
from flask import abort
from Constants.Jsons import ENDPOINT_JSON
from Constants.JsonKeys import EndpointKeys as EndpointKeys
import Services.EndpointService as EndpointService
from Boundaries.Endpoint import Endpoint
from threading import Thread
from time import sleep
from datetime import datetime, timedelta
from uuid import uuid4

SLEEP_TIME = 60
API_KEY_LIFETIME = timedelta(minutes=5)


class EndpointController:
    def __init__(self):
        self._thread_running = True
        Thread(target=self._check_endpoints_last_communication).start()

    def __del__(self):
        self._thread_running = False

    def _check_endpoints_last_communication(self):
        """
        Thread function
        check every SLEEP_TIME the endpoints last communication time
        with the API_KEY_LIFETIME and delete endpoint that past the time
        :return:
        """
        while self._thread_running:
            endpoints = EndpointService.get_all_endpoints()
            for endpoint in endpoints:
                if datetime.now() - endpoint.lastCommunication > API_KEY_LIFETIME:
                    self.delete_endpoint(endpoint.id)
            sleep(SLEEP_TIME)

    def create_endpoint(self):
        """
        Creating new Endpoint
        :return: API key to the endpoint, or 404 if endpoint exist
        """
        endpoint_json = request.json
        endpoint_json[EndpointKeys.API_KEY] = uuid4().hex
        endpoint_id = EndpointService.add_endpoint(self._json_to_endpoint(endpoint_json))
        if endpoint_id == "":
            abort(404)

        endpoint_json[EndpointKeys.ENDPOINT_ID_KEY] = endpoint_id

        return endpoint_json[EndpointKeys.API_KEY]

    def get_endpoint_data(self, endpoint_id):
        """
        Return the wanted endpoint by id
        :param endpoint_id: the wanted endpoint id
        :return: the endpoint json or 404 if endpoint not found
        """
        endpoint = EndpointService.get_endpoint_by_id(endpoint_id)
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
        """
        Update the last communication time for the endpoint
        :param endpoint_id:
        :return: ABORT!!!
        """
        endpoint = EndpointService.update_date(endpoint_id)
        if endpoint is None:
            abort(404)

        return ""

    def delete_endpoint(self, endpoint_id):
        """
        Delete endpoint from the db by id
        :param endpoint_id: the endpoint id to delete
        :return: empty string or 404 on failure
        """
        endpoint = EndpointService.get_endpoint_by_id(endpoint_id)
        if endpoint is None:
            abort(404)

        endpoint.delete()

        return ""

    def _json_to_endpoint(self, endpoint_json):
        """
        return endpoint object
        if the json has LAST_COMMUNICATION_KEY it use it
        otherwise it use the current time
        :param endpoint_json: json with endpoint values
        :return: endpoint object
        """
        try:
            return Endpoint(endpoint_json[EndpointKeys.ENDPOINT_ID_KEY], endpoint_json[EndpointKeys.POLICY_ID_KEY],
                            endpoint_json[EndpointKeys.HOSTNAME_KEY], endpoint_json[EndpointKeys.IP_ADDRESS_KEY],
                            endpoint_json[EndpointKeys.STATUS_KEY], endpoint_json[EndpointKeys.LAST_COMMUNICATION_KEY])
        except KeyError:
            return Endpoint(endpoint_json[EndpointKeys.ENDPOINT_ID_KEY], endpoint_json[EndpointKeys.POLICY_ID_KEY],
                            endpoint_json[EndpointKeys.HOSTNAME_KEY], endpoint_json[EndpointKeys.IP_ADDRESS_KEY],
                            endpoint_json[EndpointKeys.STATUS_KEY])
