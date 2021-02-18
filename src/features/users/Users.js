import * as React from "react";
import {Route, Switch} from "react-router-dom";
import {UserList} from "./UserList";
import {CreateUser} from "./CreateUser";
import {EditUser} from "./EditUser";


export const USER_FLAG = {
    Enabled: 1,
    Activated: 2,
    Super: 4
};

export class Users extends React.Component {
    render() {
        return <React.Fragment>
            <Switch>
                <Route path="/**/new" component={CreateUser}/>
                <Route path="/**/edit/:id" component={EditUser}/>
                <Route path="" component={UserList}/>
            </Switch>
        </React.Fragment>;
    }
}