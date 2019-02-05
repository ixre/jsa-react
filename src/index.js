import React, {Fragment} from "react";
import ReactDOM from "react-dom";
import "./css/page.less";
import {HashRouter as Router, Route, Switch} from "react-router-dom";

import {AuthenticationWrapper} from "./components/AuthenticationWrapper/AuthenticationWrapper";
import AppState from "./stores/AppState";
import {Provider} from "./components/Provider";

const App = React.lazy(() => import("./app"));
const Login = React.lazy(() => import("./features/login/login"));
let store = new AppState();
const renderApp = () =>
    <AuthenticationWrapper>
        <App/>
    </AuthenticationWrapper>;

ReactDOM.render(
    <React.Suspense fallback={<Fragment/>}>
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route exact path='/login' component={Login}/>
                    <Route render={renderApp}/>
                </Switch>
            </Router>
        </Provider>
    </React.Suspense>, document.getElementById("root"));
