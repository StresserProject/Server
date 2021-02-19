import axios from 'axios';
import Policy from './Policy';
import { action, makeObservable, observable, runInAction } from 'mobx';

export default class Policies {
    /**
     * @type {Policy[]}
     */
    policies = [];

    constructor() {
        makeObservable(this, {
            policies: observable,
            getList: action,
        });
        this.getList();
    }

    getList = () => {
        return axios
            .get('/policy')
            .then((response) => {
                runInAction(() => {
                    this.policies = [];
                    response.data.map((policy) =>
                        this.policies.push(new Policy(policy)),
                    );
                });
            })
            .catch((error) => console.log(error));
    };

    deletePolicy = (index) => {
        const id = this.policies[index].id;
        return axios
            .delete(`/policy/${id}`)
            .then((response) => {
                if (response.status === 200) {
                    runInAction(() => this.policies.splice(index, 1));
                }
            })
            .catch((error) => console.log(error));
    };

    addPolicy = (policyData) => {
        const jsonToSend = {
            id: 0,
            policyName: policyData.name,
            numberOfRules: policyData.rules.length,
            rules: policyData.rules.map((rule) => rule.id),
            updateCount: 0,
        };

        return axios
            .post('/policy', jsonToSend)
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.data);
                    runInAction(() => {
                        this.policies.push(new Policy(response.data));
                    });
                    return true;
                }
            })
            .catch((error) => {
                console.log(error);
                return false;
            });
    };
}
