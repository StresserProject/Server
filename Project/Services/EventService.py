from mongoengine import Document
from mongoengine import StringField
from mongoengine import ValidationError
from mongoengine import queryset
from Boundaries.Event import Event


class EventDB(Document):
    eventName = StringField(max_length=50, required=True)
    eventType = StringField(max_length=50, required=True)
    eventData = StringField(max_length=50, required=True)


class EventService:

    def add_event(self, event):
        event_id = EventDB.objects(eventName=event.event_name)
        if len(event_id) == 0:
            event_id = EventDB(eventName=event.event_name, eventType=event.event_type,
                               eventData=event.event_data).save()
            return str(event_id.id)
        return ""

    def get_event_by_id(self, event_id):
        try:
            return EventDB.objects.get(id=event_id)
        except (ValidationError, queryset.DoesNotExist):
            return None

    def get_event_by_event_name(self, event_name):
        events = EventDB.objects(eventName=event_name)
        if len(events) == 0:
            return None

        return events[0]

    def update_event_by_id(self, event_id, event):
        old_events = EventDB.objects.get(id=event_id)
        EventDB.update(old_events, eventName=event.event_name, eventType=event.event_type, eventData=event.event_data)
        return ""
