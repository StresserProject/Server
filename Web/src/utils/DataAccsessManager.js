import Endpoints from '../Components/Endpoints/EndpointClasses/Endpoints';
import Events from '../Components/Events/EventsClasses/Events';
import Policies from '../Components/Policy/PolicyClasses/Policies';
import Rules from '../Components/Rules/RulesClasses/Rules';

export default class DataAccessManager {
    constructor() {
        this.dbRules = new Rules();
        this.dbPolicies = new Policies();
        this.dbEndpoints = new Endpoints();
        this.dbEvents = new Events();
    }

    destructor = () => {
        for (var attribute in this)
            if (attribute !== 'destructor') this[attribute].destructor();
    };
}
