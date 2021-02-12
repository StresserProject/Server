import { makeObservable, observable } from 'mobx';

export default class Rule {
    id = 0;
    name = '';
    type = '';
    value = '';

    constructor({ id, ruleName, ruleType, ruleData }) {
        makeObservable(this, {
            id: observable,
            name: observable,
            type: observable,
            value: observable,
        });
        this.id = id;
        this.name = ruleName;
        this.type = ruleType;
        this.value = ruleData;
    }

    /**
     *
     * @param {string} name
     * @param {string} type
     * @param {string} data
     */
    updateRule(ruleName, ruleType, ruleData) {
        this.name = ruleName;
        this.type = ruleType;
        this.value = ruleData;
    }
}
