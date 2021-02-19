import { makeObservable, observable, runInAction } from 'mobx';
import axios from 'axios';

export default class Policy {
    id = 0;
    name = '';
    rules = [];
    updateCount = 0;

    constructor({ id, policyName, rules, updateCount }) {
        makeObservable(this, {
            id: observable,
            name: observable,
            rules: observable,
            updateCount: observable,
        });
        this.id = id;
        this.name = policyName;
        this.rules = rules;
        this.updateCount = updateCount;
    }

    updatePolicy = ({ name, rules }) => {
        const dataToSend = {
            id: this.id,
            policyName: name,
            numberOfRules: rules.length,
            rules: rules.map((rule) => rule.id),
            updateCount: this.updateCount + 1,
        };

        return axios
            .put(`/policy/${this.id}`, dataToSend)
            .then((response) => {
                if (response.status === 200) {
                    runInAction(() => {
                        this.name = name;
                        this.rules = rules.map((rule) => rule.id);
                        this.updateCount += 1;
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
