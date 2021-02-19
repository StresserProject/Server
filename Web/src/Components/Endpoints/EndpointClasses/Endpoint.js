import { makeObservable, observable, runInAction } from 'mobx';
import axios from 'axios';

export default class Policy {
    id = 0;
    hostname = '';
    ipAddress = [];
    policyId = 0;
    status = '';
    lastCommunication = '';

    constructor({
        id,
        hostname,
        ipAddress,
        policyId,
        status,
        lastCommunication,
    }) {
        makeObservable(this, {
            id: observable,
            hostname: observable,
            ipAddress: observable,
            policyId: observable,
            status: observable,
            lastCommunication: observable,
        });
        this.id = id;
        this.hostname = hostname;
        this.ipAddress = ipAddress;
        this.policyId = policyId;
        this.status = status;
        this.lastCommunication = lastCommunication;
    }

    updatePolicy = (policyId) => {
        return axios
            .put(`/ednpoint/update/${this.id}`, { policyId })
            .then((response) => {
                if (response.status === 200) {
                    runInAction(() => {
                        this.policyId = policyId;
                    });
                    return true;
                }
                return false;
            })
            .catch((error) => {
                console.log(error);
                return false;
            });
    };
}
