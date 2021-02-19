import json
from datetime import datetime
from flask import request
from flask import abort
from Constants.Jsons import EVENT_JSON
from Constants.JsonKeys import EventKeys as EventKeys
from Constants.JsonKeys import ID_KEY
import Services.EventService as EventService
from Boundaries.Event import Event
from UserTokens import token_required


@token_required
def create_event():
    """
    Creating new Event
    :return: the new event event, or 404 if event exist
    """
    event_json = request.json

    event_json[EventKeys.TIME_STAMP_KEY] = datetime.now()
    event_id = EventService.add_event(json_to_event(event_json))
    if event_id == "":
        abort(404)

    event_json[ID_KEY] = event_id

    return event_json


@token_required
def get_event_data(event_id):
    """
    Return the wanted event by id
    :param event_id: the wanted event id
    :return: the event json or 404 if event not found
    """
    event = EventService.get_event_by_id(event_id)
    if event is None:
        abort(404)

    event_json = json.loads(EVENT_JSON)
    event_json[ID_KEY] = str(event.id)
    event_json[EventKeys.EVENT_NAME_KEY] = event[EventKeys.EVENT_NAME_KEY]
    event_json[EventKeys.EVENT_TYPE_KEY] = event[EventKeys.EVENT_TYPE_KEY]
    event_json[EventKeys.EVENT_DATA_KEY] = event[EventKeys.EVENT_DATA_KEY]
    event_json[EventKeys.HOSTNAME_KEY] = event[EventKeys.HOSTNAME_KEY]
    event_json[EventKeys.IP_ADDRESS_KEY] = event[EventKeys.IP_ADDRESS_KEY]
    event_json[EventKeys.TIME_STAMP_KEY] = event[EventKeys.TIME_STAMP_KEY]

    return event_json


@token_required
def update_event(event_id):
    """
    Updating the event to the server
    :return: event json with id
    """
    old_event = EventService.get_event_by_id(event_id)
    if old_event is None:
        abort(404)
    new_event = json_to_event(request.json)
    if new_event.timeStamp == "":
        new_event.timeStamp = datetime.now()
    new_event = EventService.update_event_by_id(event_id, new_event)
    if new_event is None:
        abort(406)
    return new_event.__dict__


@token_required
def delete_event(event_id):
    """
    Delete event from the db by id
    :param event_id: the event id to delete
    :return: empty string or 404 on failure
    """
    event = EventService.get_event_by_id(event_id)
    if event is None:
        abort(404)

    event.delete()

    return {}


@token_required
def get_all_events():
    events = EventService.get_all_events()
    formatted_events = []
    for event in events:
        formatted_events.append(Event(str(event.id), event[EventKeys.EVENT_NAME_KEY], event[EventKeys.EVENT_TYPE_KEY],
                                      event[EventKeys.EVENT_DATA_KEY], event[EventKeys.HOSTNAME_KEY],
                                      event[EventKeys.IP_ADDRESS_KEY], str(event[EventKeys.TIME_STAMP_KEY])))
    return json.dumps(formatted_events, default=lambda obj: obj.__dict__)


def json_to_event(event_json):
    try:
        return Event(event_json[ID_KEY], event_json[EventKeys.EVENT_NAME_KEY], event_json[EventKeys.EVENT_TYPE_KEY],
                     event_json[EventKeys.EVENT_DATA_KEY], event_json[EventKeys.HOSTNAME_KEY],
                     event_json[EventKeys.IP_ADDRESS_KEY], event_json[EventKeys.TIME_STAMP_KEY])
    except KeyError:
        return Event(event_json[ID_KEY], event_json[EventKeys.EVENT_NAME_KEY], event_json[EventKeys.EVENT_TYPE_KEY],
                     event_json[EventKeys.EVENT_DATA_KEY], event_json[EventKeys.HOSTNAME_KEY],
                     event_json[EventKeys.IP_ADDRESS_KEY])

