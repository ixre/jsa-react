import React from "react";
import {Route, Switch} from "react-router-dom";
import Index from "./features/home";
import AppLayout from "./layouts/app";
import Next from "./features/home/next";
import {LazyRoute} from "./components/common";

const Dashboard = React.lazy(() => import("./features/board"));
const Domain = React.lazy(() => import( "./features/domain"));
const EditProfile = React.lazy(() => import("./features/profile/EditProfile"));


export default class App extends React.Component {
    constructor(props) {
        super(props);
        document.title = "JSA - 域名转发系统";
    }

    render() {
        return (
            <AppLayout className="app-container">
                <Switch>
                    <Route exact path='/' component={Index}/>
                    <Route path='/home' component={Index}/>
                    <LazyRoute path='/dashboard' component={Dashboard}/>
                    <LazyRoute path='/domain' component={Domain}/>
                    <Route path='/home/next' component={Next}/>
                    <LazyRoute path='/profile/edit' component={EditProfile}/>
                </Switch>
            </AppLayout>
        );
    }
}