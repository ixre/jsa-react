import React from "react";
import {Route, Switch} from "react-router-dom";
import Index from "./features/home";
import AppLayout from "./layouts/app";
import Next from "./features/home/next";

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
            <React.Suspense fallback={<div>Loading...</div>}>
                <AppLayout className="app-container">
                    <Switch>
                        <Route exact path='/' component={Index}/>
                        <Route path='/home' component={Index}/>
                        <Route path='/dashboard' component={Dashboard}/>
                        <Route path='/domain' component={Domain}/>
                        <Route path='/home/next' component={Next}/>
                        <Route path='/profile/edit' component={EditProfile}/>
                    </Switch>
                </AppLayout>
            </React.Suspense>
        );
    }
}