import axios from 'axios';
import {
    action,
    computed,
    makeObservable,
    observable,
    runInAction,
} from 'mobx';

export default class AuthenticationManager {
    token = '';
    refreshTokenInterval = undefined;

    constructor() {
        makeObservable(this, {
            token: observable,
            refreshTokenInterval: observable,
            isAuthenticated: computed,
            login: action,
            logout: action,
        });
    }

    get isAuthenticated() {
        return !!this.token;
    }

    login = (token) => {
        this.token = token;
        this.refreshTokenInterval = setInterval(async () => {
            axios
                .get('/user/refresh')
                .then((response) =>
                    runInAction(() => (this.token = response.data)),
                )
                .catch((error) => {
                    this.logout();
                    alert('Somthing went worng please login again');
                    console.log(error);
                });
        }, 288000); // Interval executing every 4:40 min 288000
    };

    logout = () => {
        this.token = '';
        clearInterval(this.refreshTokenInterval);
        this.refreshTokenInterval = undefined;
    };
}
