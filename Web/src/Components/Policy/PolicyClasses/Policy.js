import { makeObservable, observable } from 'mobx';
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
        this.name = name;
        this.rules = rules;
        this.updateCount += 1;

        const dataToSend = {
            id: this.id,
            policyName: this.name,
            numberOfRules: this.rules.length,
            rules: this.rules,
            updateCount: this.data,
        };

        return axios
            .put(`/policy/${this.id}`, dataToSend)
            .then((response) => {
                if (response.status === 200) return true;
                return false;
            })
            .catch((error) => {
                console.log(error);
                return false;
            });
    };
}
