import json
from flask import request
from flask import abort
from Constants.Jsons import ENDPOINT_JSON
from Constants.JsonKeys import EndpointKeys as EndpointKeys
from Constants.JsonKeys import ID_KEY
import Services.EventService as EventService
import Services.EndpointService as EndpointService
from Boundaries.Event import Event
from Boundaries.Endpoint import Endpoint
from threading import Thread
from time import sleep
from datetime import datetime, timedelta
from UserTokens import token_required, create_endpoint_token, TOKEN_EXPIRE_TIME

SLEEP_TIME = 10


class EndpointController:
    def __init__(self, default_policy):
        self._thread_running = True
        self._default_policy = str(default_policy)
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
                if datetime.now() - endpoint.lastCommunication > timedelta(minutes=TOKEN_EXPIRE_TIME):
                    EventService.add_event(Event("0", "Lost Endpoint At " +
                                                 str(endpoint[EndpointKeys.LAST_COMMUNICATION_KEY]),
                                                 "Report", "IDLE", endpoint[EndpointKeys.HOSTNAME_KEY],
                                                 endpoint[EndpointKeys.IP_ADDRESS_KEY]))
                    EndpointService.delete_endpoint(endpoint.id)
            sleep(SLEEP_TIME)

    def create_endpoint(self):
        """
        Creating new Endpoint
        :return: API key to the endpoint, or 404 if endpoint exist
        """
        endpoint_json = request.json
        endpoint_json[EndpointKeys.POLICY_ID_KEY] = self._default_policy
        endpoint_id = EndpointService.add_endpoint(self._json_to_endpoint(endpoint_json))
        if endpoint_id == "":
            abort(404)

        return {EndpointKeys.API_KEY: create_endpoint_token(endpoint_id), ID_KEY: endpoint_id}

    @token_required
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
        endpoint_json[ID_KEY] = str(endpoint.id)
        endpoint_json[EndpointKeys.IP_ADDRESS_KEY] = endpoint[EndpointKeys.IP_ADDRESS_KEY]
        endpoint_json[EndpointKeys.HOSTNAME_KEY] = endpoint[EndpointKeys.HOSTNAME_KEY]
        endpoint_json[EndpointKeys.POLICY_ID_KEY] = endpoint[EndpointKeys.POLICY_ID_KEY]
        endpoint_json[EndpointKeys.STATUS_KEY] = endpoint[EndpointKeys.STATUS_KEY]
        endpoint_json[EndpointKeys.LAST_COMMUNICATION_KEY] = endpoint[EndpointKeys.LAST_COMMUNICATION_KEY]

        return endpoint_json

    @token_required
    def keep_alive(self, endpoint_id):
        """
        Update the last communication time for the endpoint
        :param endpoint_id:
        :return: ABORT!!!
        """
        EndpointService.update_date(endpoint_id)
        token = create_endpoint_token(endpoint_id)
        return {
            EndpointKeys.API_KEY: token
        }

    @token_required
    def delete_endpoint(self, endpoint_id):
        """
        Delete endpoint from the db by id
        :param endpoint_id: the endpoint id to delete
        :return: empty string or 404 on failure
        """
        if EndpointService.delete_endpoint(endpoint_id) is None:
            abort(404)

        return {}

    @token_required
    def get_all_endpoints(self):
        endpoints = EndpointService.get_all_endpoints()
        formatted_endpoints = []
        for endpoint in endpoints:
            formatted_endpoints.append(
                Endpoint(str(endpoint.id), endpoint[EndpointKeys.POLICY_ID_KEY], endpoint[EndpointKeys.HOSTNAME_KEY],
                         endpoint[EndpointKeys.IP_ADDRESS_KEY], endpoint[EndpointKeys.STATUS_KEY],
                         str(endpoint[EndpointKeys.LAST_COMMUNICATION_KEY])))
        return json.dumps(formatted_endpoints, default=lambda obj: obj.__dict__)

    def _json_to_endpoint(self, endpoint_json):
        """
        return endpoint object
        if the json has LAST_COMMUNICATION_KEY it use it
        otherwise it use the current time
        :param endpoint_json: json with endpoint values
        :return: endpoint object
        """
        try:
            return Endpoint(endpoint_json[ID_KEY], endpoint_json[EndpointKeys.POLICY_ID_KEY],
                            endpoint_json[EndpointKeys.HOSTNAME_KEY], endpoint_json[EndpointKeys.IP_ADDRESS_KEY],
                            endpoint_json[EndpointKeys.STATUS_KEY], endpoint_json[EndpointKeys.LAST_COMMUNICATION_KEY])
        except KeyError:
            return Endpoint(endpoint_json[ID_KEY], endpoint_json[EndpointKeys.POLICY_ID_KEY],
                            endpoint_json[EndpointKeys.HOSTNAME_KEY], endpoint_json[EndpointKeys.IP_ADDRESS_KEY],
                            endpoint_json[EndpointKeys.STATUS_KEY])
