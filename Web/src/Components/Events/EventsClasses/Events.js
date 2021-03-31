import axios from 'axios';
import { action, makeObservable, observable, runInAction } from 'mobx';
import Event from './Event';

export default class Events {
    /**
     * @type {Event[]}
     */
    events = [];

    constructor() {
        makeObservable(this, {
            events: observable,
            getList: action,
        });
        this.getList();
    }

    getList = () => {
        return axios
            .get('/event')
            .then((response) => {
                runInAction(() => {
                    this.events = [];
                    response.data.map((event) =>
                        this.events.push(new Event(event)),
                    );
                });
            })
            .catch((error) => console.log(error));
    };
}
