import React, {Fragment} from 'react';
import LoginForm from '../../components/AuthenticationWrapper/LoginForm';
import {fn, http} from "../../base";
import './login.css';
import {observer, PropTypes} from "mobx-react";
import Alert from "antd/es/alert";
import {withRouter} from "react-router-dom";

@observer
@withRouter
export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        document.title = "JSA - Login";
        this.state = {
            user: "jarrysix",
            pwd: "123456",
            err_msg:"",
        };
    }

    static contextTypes = {
        store: PropTypes.observableObject
    };

    handleSubmit = (values, callback) => {
        let $this = this;
        const {store} = this.context;
        const data = {"user": values.user, "pwd": values.password};
        http.jsonPost(fn.api("/login"), data, function (r) {
            callback();
            if (!r.code) {
                store.isLogin = true;
                store.sessionID = r.data["SessionID"];
                $this.props.history.push("/home");
            } else {
                console.log(`[ JSA][ Login]:${r}`);
            }
        }, function (r) {
            $this.setState({err_msg:r||"Oops! Connection timeout"});
            callback();
        });
    }

    render() {
        return <Fragment>
            <br/><br/><br/><br/>
            <div className="mod-login-view">
                <h2>JSA User Login: </h2>
                {this.state.err_msg != "" ?
                    <Alert message={this.state.err_msg} type="warning" showIcon/> :
                    null
                }<br/>
                <LoginForm submit={this.handleSubmit} user={this.state.user} pwd={this.state.pwd}/>
            </div>
        </Fragment>;
    }
}
