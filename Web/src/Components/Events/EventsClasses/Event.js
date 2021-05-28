import { makeObservable, observable } from 'mobx';

export default class Event {
    constructor({
        id,
        eventName,
        eventType,
        eventData,
        timeStamp,
        hostname,
        IPAddress,
    }) {
        this.id = id;
        this.name = eventName;
        this.type = eventType;
        this.data = eventData;
        this.timeStamp = new Date(timeStamp);
        this.hostname = hostname;
        this.ip = IPAddress;
        makeObservable(this, {
            id: observable,
            name: observable,
            type: observable,
            data: observable,
            timeStamp: observable,
            hostname: observable,
            ip: observable,
        });
    }
}
