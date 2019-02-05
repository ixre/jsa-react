import {observable,action} from "mobx";
import React from 'react';

export default class AppState {
    @observable isLogin = false;
    @observable sessionID = "";
    @action getSessionID = () => {
        return this.sessionID;
    };
    @action checkLogin() {
        return this.isLogin;
    }
}
