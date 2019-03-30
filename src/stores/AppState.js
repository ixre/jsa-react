import {action, observable} from "mobx";
import React from 'react';

export default class AppState {
    @observable isLogin = false;
    // Is a super user
    @observable user = {isSuper: false,userID:0};
    @observable sessionID = "";
    @action getSessionID = () => {
        return this.sessionID;
    };

    @action checkLogin() {
        return this.isLogin;
    }
}
