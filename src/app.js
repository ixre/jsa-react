import React from "react";
import {Route, Switch} from "react-router-dom";
import Index from "./features/home";
import AppLayout from "./layouts/app";

const EditProfile = React.lazy(() => import("./features/profile/EditProfile"));

export default class App extends React.Component {
    constructor(props) {
        super(props);
        document.title = "JSA - 域名转发系统";
    }
    render() {
        return (
            <React.Suspense fallback={<div>Loading...</div>}>
                <AppLayout className="app-container" history={this.props.history}>
                    <Switch>
                        <Route exact path='/' component={Index}/>
                        <Route path='/home' component={Index}/>
                        <Route path='/profile/edit' component={EditProfile}/>
                    </Switch>
                </AppLayout>
            </React.Suspense>
        );
    }
}