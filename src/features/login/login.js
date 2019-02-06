import React, {Fragment} from 'react';
import LoginForm from '../../components/AuthenticationWrapper/LoginForm';
import {http,fn} from "../../base";
import '../../css/login.css';
import {observer,PropTypes} from "mobx-react";

@observer
export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        document.title = "JSA - Login";
        this.state = {
            user: "jarrysix",
            pwd: "123456"
        };
    }
    static contextTypes = {
        store:PropTypes.observableObject
    };

    handleSubmit = (values,callback) => {
        let $this = this;
        const {store} = this.context;
        const data = {"user": values.user, "pwd": values.password};
        http.jsonPost(fn.api("/login"), data, function (r) {
            callback();
            if(!r.code){
                store.isLogin = true;
                store.sessionID = r.data["SessionID"];
                $this.props.history.push("/home");
            }else{
                console.log(`[ JSA][ Login]:${r}`);
            }
        },function(){
            callback();
        });
    }

    render() {
        return <Fragment>
            <br/><br/><br/><br/>
            <div className="mod-login-view">
                <h2>JSA User Login: </h2><br/>
                <LoginForm submit={this.handleSubmit} user={this.state.user} pwd={this.state.pwd}/>
            </div>
        </Fragment>;
    }
}
