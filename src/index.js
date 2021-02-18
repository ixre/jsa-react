import React from "react";
import ReactDOM from "react-dom";
import "./css/page.less";
import {HashRouter as Router, Route, Switch} from "react-router-dom";

import {AuthenticationWrapper} from "./components/AuthenticationWrapper/AuthenticationWrapper";
import AppState from "./stores/AppState";
import {LazyRoute, Provider} from "./components/common";
//import Login from "./features/login/login"
const Login = React.lazy(() => import("./features/login/login"));

const App = React.lazy(() => import("./app"));
let store = new AppState();
const renderApp = () =>
    <AuthenticationWrapper>
        <App/>
    </AuthenticationWrapper>;

ReactDOM.render(
    <React.Suspense fallback="">
        <Provider store={store}>
            <Router>
                <Switch>
                    <LazyRoute exact path='/login' component={Login}/>
                    <Route render={renderApp}/>
                </Switch>
            </Router>
        </Provider>
    </React.Suspense>, document.getElementById("root"));
