import json
from flask import request
from flask import abort
from Constants.Jsons import EVENT_JSON
from Constants.JsonKeys import EventKeys as EventKeys
from Services.EventService import EventService
from Boundaries.Event import Event


class EventController:
    def __init__(self):
        self._event_service = EventService()

    def create_event(self):
        """
        Creating new Event
        :return: the new event event, or 404 if event exist
        """
        event_json = request.json

        event_id = self._event_service.add_event(self._json_to_event(event_json))
        if event_id == "":
            abort(404)

        event_json[EventKeys.EVENT_ID_KEY] = event_id

        return event_json

    def get_event_data(self, event_id):
        """
        Return the wanted event by id
        :param event_id: the wanted event id
        :return: the event json or 404 if event not found
        """
        event = self._event_service.get_event_by_id(event_id)
        if event is None:
            abort(404)

        event_json = json.loads(EVENT_JSON)
        event_json[EventKeys.EVENT_ID_KEY] = str(event.id)
        event_json[EventKeys.EVENT_NAME_KEY] = event[EventKeys.EVENT_NAME_KEY]
        event_json[EventKeys.EVENT_TYPE_KEY] = event[EventKeys.EVENT_TYPE_KEY]
        event_json[EventKeys.EVENT_DATA_KEY] = event[EventKeys.EVENT_DATA_KEY]

        return event_json

    def update_event(self, event_id):
        """
        Updating the event to the server
        :return: event json with id
        """
        old_event = self._event_service.get_event_by_id(event_id)
        if old_event is None:
            abort(404)

        new_event = request.json
        old_event = self._event_service.update_event_by_id(event_id, self._json_to_event(new_event))

        return old_event

    def delete_event(self, event_id):
        """
        Delete event from the db by id
        :param event_id: the event id to delete
        :return: empty string or 404 on failure
        """
        event = self._event_service.get_event_by_id(event_id)
        if event is None:
            abort(404)

        event.delete()

        return ""

    def _json_to_event(self, event_json):
        return Event(event_json[EventKeys.EVENT_ID_KEY], event_json[EventKeys.EVENT_NAME_KEY],
                     event_json[EventKeys.EVENT_TYPE_KEY], event_json[EventKeys.EVENT_DATA_KEY])
