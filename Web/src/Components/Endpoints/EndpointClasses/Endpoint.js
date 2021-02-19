import { makeObservable, observable, runInAction } from 'mobx';
import axios from 'axios';

export default class Policy {
    id = 0;
    policyId = 0;
    name = '';
    ipAddress = [];
    policyName = '';
    status = '';
    lastCommunication = '';

    constructor({
        id,
        hostname,
        IPAddress,
        policyId,
        status,
        lastCommunication,
    }) {
        makeObservable(this, {
            id: observable,
            policyId: observable,
            name: observable,
            ipAddress: observable,
            policyName: observable,
            status: observable,
            lastCommunication: observable,
        });
        this.id = id;
        this.policyId = policyId;
        this.name = hostname;
        this.ipAddress = IPAddress;
        this.status = status;
        this.lastCommunication = lastCommunication;
    }

    updatePolicy = ({ policyId }) => {
        return axios
            .put(`/endpoint/update/${this.id}`, { policyId })
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
