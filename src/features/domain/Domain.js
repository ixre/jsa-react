import * as React from "react";
import {DomainList} from "./DomainList";
import {Route, Switch} from "react-router-dom";
import {CreateDomain} from "./CreateDomain";
import {EditDomain} from "./EditDomain";
import {StatCode} from "./StatCode";


/// The state of domain
export const DomainState = {
    Normal: 1,
    Stopped: 2,
    Paused: 3,
};

export const DomainFlag = {
    /// If flag contain 2,System will open statistics
    /// function for domain.
    Stat: 2,
};

export class Domain extends React.Component {
    render() {
        return <React.Fragment>
            <Switch>
                <Route path="/**/new" component={CreateDomain}/>
                <Route path="/**/edit/:id" component={EditDomain}/>
                <Route path="/**/stat_code/:hash" component={StatCode}/>
                <Route path="" component={DomainList}/>
            </Switch>
        </React.Fragment>;
    }
}