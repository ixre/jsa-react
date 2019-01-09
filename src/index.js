import React, {Fragment} from "react";
import ReactDOM from "react-dom";
import "./css/page.less";
import {HashRouter as Router, Route, Switch} from "react-router-dom";

import {AuthenticationWrapper} from "./components/AuthenticationWrapper/AuthenticationWrapper";

const App = React.lazy(() => import("./app"));
const Login = React.lazy(() => import("./features/login/login"));

const renderApp = () =>
    <AuthenticationWrapper>
        <App/>
    </AuthenticationWrapper>;

ReactDOM.render(
    <React.Suspense fallback={<Fragment/>}>
        <Router>
            <Switch>
                <Route exact path='/login' component={Login}/>
                <Route render={renderApp}/>
            </Switch>
        </Router>
    </React.Suspense>, document.getElementById("root"));
