import { makeObservable, observable, runInAction } from 'mobx';
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
        const dataToSend = {
            id: this.id,
            ruleName: name,
            ruleType: type,
            ruleData: data,
        };

        return axios
            .put(`/rule/${this.id}`, dataToSend)
            .then((response) => {
                if (response.status === 200) {
                    runInAction(() => {
                        this.name = name;
                        this.type = type;
                        this.data = data;
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
