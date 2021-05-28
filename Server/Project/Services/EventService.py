from mongoengine import ValidationError
from mongoengine import queryset
from Entities.EventDB import EventDB
from Boundaries.Event import Event
from Constants.JsonKeys import EventKeys


def add_event(event: Event):
    event_id = EventDB(eventName=event.eventName, eventType=event.eventType, eventData=event.eventData,
                        hostname=event.hostname, IPAddress=event.IPAddress, timeStamp=event.timeStamp).save()
    return str(event_id.id)


def get_event_by_id(event_id):
    try:
        return EventDB.objects.get(id=event_id)
    except (ValidationError, queryset.DoesNotExist):
        return None


def get_event_by_event_name(event_name):
    events = EventDB.objects(eventName=event_name)
    if len(events) == 0:
        return None

    return events[0]


def update_event_by_id(event_id, event: Event):
    old_events = EventDB.objects.get(id=event_id)
    if old_events[EventKeys.EVENT_NAME_KEY] == event.eventName:
        EventDB.update(old_events, eventName=event.eventName, eventType=event.eventType,
                       eventData=event.eventData, hostname=event.hostname, IPAddress=event.IPAddress,
                       timeStamp=event.timeStamp)
        event.id = event_id
        return event
    return None


def get_all_events():
    return EventDB.objects()
