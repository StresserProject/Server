import axios from 'axios';
import Endpoint from './Endpoint';
import { action, makeObservable, observable, runInAction } from 'mobx';

export default class Endpoints {
    /**
     * @type {Endpoint[]}
     */
    endpoints = [];

    constructor() {
        makeObservable(this, {
            endpoints: observable,
            getList: action,
        });
        this.getList();
    }

    getList = () => {
        return axios
            .get('/endpoint')
            .then((response) => {
                runInAction(() => {
                    this.endpoints = [];
                    response.data.map((policy) =>
                        this.endpoints.push(new Endpoint(policy)),
                    );
                });
            })
            .catch((error) => console.log(error));
    };
}
