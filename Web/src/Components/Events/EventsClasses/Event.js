import { makeObservable, observable } from 'mobx';

export default class Event {
    id = 0;
    name = '';
    type = '';
    data = '';
    timeStamp = '';
    hostname = '';
    ip = '';

    constructor({
        id,
        eventName,
        eventType,
        eventData,
        timeStamp,
        hostname,
        IPAddress,
    }) {
        makeObservable(this, {
            id: observable,
            name: observable,
            type: observable,
            data: observable,
            timeStamp: observable,
            hostname: observable,
            ip: observable,
        });

        this.id = id;
        this.name = eventName;
        this.type = eventType;
        this.data = eventData;
        this.timeStamp = timeStamp;
        this.hostname = hostname;
        this.ip = IPAddress;
    }
}
