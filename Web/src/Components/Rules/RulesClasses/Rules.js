import axios from 'axios';
import { action, makeObservable, observable, runInAction } from 'mobx';
import Rule from './Rule';

export default class Rules {
    /**@type {Rule[]} */
    rules = [];

    constructor() {
        makeObservable(this, {
            rules: observable,
            getList: action,
        });
        this.getList();
        this.getListInterval = setInterval(this.getList, 60000);
    }

    destructor = () => {
        clearInterval(this.getListInterval);
    };

    getList = () => {
        return axios
            .get('/rule')
            .then((response) => {
                runInAction(() => {
                    this.rules = [];
                    response.data.map((rule) =>
                        this.rules.push(new Rule(rule)),
                    );
                });
            })
            .catch((error) => console.log(error));
    };

    deleteRule = (index) => {
        const id = this.rules[index].id;
        return axios
            .delete(`/rule/${id}`)
            .then((response) => {
                if (response.status === 200) {
                    runInAction(() => {
                        this.rules.splice(index, 1);
                    });
                }
            })
            .catch((error) => console.log(error));
    };

    addRule = (ruleData) => {
        const jsonToSend = {
            id: 0,
            ruleName: ruleData.name,
            ruleType: ruleData.type,
            ruleData: ruleData.data,
        };

        return axios
            .post('/rule', jsonToSend)
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.data);
                    runInAction(() => {
                        this.rules.push(new Rule(response.data));
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
