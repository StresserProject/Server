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

    // updatePolicy = (policyId) => {
    //     const dataToSend = {
    //         id: this.id,
    //         policyName: name,
    //         numberOfRules: rules.length,
    //         rules: rules.map((rule) => rule.id),
    //         updateCount: this.updateCount + 1,
    //     };

    //     return axios
    //         .put(`/ednpoint/${this.id}`, dataToSend)
    //         .then((response) => {
    //             if (response.status === 200) {
    //                 runInAction(() => {
    //                     this.name = name;
    //                     this.rules = rules.map((rule) => rule.id);
    //                     this.updateCount += 1;
    //                 });
    //                 return true;
    //             }
    //             return false;
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //             return false;
    //         });
    // };
}
