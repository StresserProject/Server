import React, { useEffect, useRef, useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Dashboard from './Dashboard/Dashboard.jsx';
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from 'react-router-dom';
import AuthenticationManager from './AuthenticationManager';
import { observer } from 'mobx-react';
import { reaction } from 'mobx';
import axios from 'axios';

axios.interceptors.request.use((config) => {
    config.proxy = config.proxy = {
        host: 'localhost',
        port: 3000,
    };
    return config;
});

function App() {
    const [forceRefresh, setForceRefresh] = useState(false);
    const authenticationManager = useRef(new AuthenticationManager());

    useEffect(() => {
        axios.interceptors.request.use((config) => {
            config.headers.Authorization = authenticationManager.current.token;
            return config;
        });
    }, []);

    reaction(
        () => authenticationManager.current.isAuthenticated,
        () => {
            if (authenticationManager.isAuthenticated) {
                setForceRefresh(false);
            } else {
                setForceRefresh(true);
            }
        },
    );

    useEffect(() => forceRefresh && setForceRefresh(false), [forceRefresh]);

    return (
        <Router forceRefresh={forceRefresh}>
            <Switch>
                <Route
                    path="/signin"
                    render={() => (
                        <SignIn login={authenticationManager.current.login} />
                    )}
                />
                <Route path="/signup" component={SignUp} />
                <Route
                    path="/"
                    render={() =>
                        authenticationManager.current.isAuthenticated ? (
                            <Dashboard
                                authenticationManager={
                                    authenticationManager.current
                                }
                            />
                        ) : (
                            <Redirect to="/signin" />
                        )
                    }
                />
            </Switch>
        </Router>
    );
}

export default observer(App);
