import { makeObservable, observable } from 'mobx';
import axios from 'axios';

export default class Rule {
    id = 0;
    name = '';
    type = '';
    data = '';

    constructor({ id, ruleName, ruleType, ruleData }) {
        makeObservable(this, {
            id: observable,
            name: observable,
            type: observable,
            data: observable,
        });
        this.id = id;
        this.name = ruleName;
        this.type = ruleType;
        this.data = ruleData;
    }

    updateRule = ({ name, type, data }) => {
        this.name = name;
        this.type = type;
        this.data = data;

        const dataToSend = {
            id: this.id,
            ruleName: this.name,
            ruleType: this.type,
            ruleData: this.data,
        };

        return axios
            .put(`/rule/${this.id}`, dataToSend)
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