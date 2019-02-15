import React, {Fragment} from 'react';
import LoginForm from '../../components/AuthenticationWrapper/LoginForm';
import {fn, http} from "../../base";
import './login.css';
import {observer, PropTypes} from "mobx-react";
import Alert from "antd/es/alert";
import {withRouter} from "react-router-dom";
import {Icon} from "antd";


@observer
@withRouter
export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        document.title = "JSA - Login";
        this.state = {
            user: "",
            pwd: "",
            err_msg: "",
        };
    }

    static contextTypes = {
        store: PropTypes.observableObject
    };

    handleSubmit = (values, callback) => {
        let $this = this;
        const {store} = this.context;
        const data = {"user": values.user, "pwd": fn.pwd(values.password)};
        http.jsonPost(fn.api("/login"), data, function (r) {
            callback();
            if (!r.code) {
                store.isLogin = true;
                store.sessionID = r.data["SessionID"];
                store.user = {
                    isSuper: r.data["SuperUser"] == "1"
                };
                $this.props.history.push("/home");
            } else {
                $this.setState({err_msg: r["err_msg"]});
            }
        }, function (r) {
            $this.setState({err_msg: r || "Oops! Connection timeout"});
            callback();
        });
    }

    render() {
        return <Fragment>
            <br/><br/><br/><br/>
            <div className="mod-login-view">
                <h2><Icon className="logo-icon" type="compass"/>用户登入</h2>

                {this.state.err_msg != "" ?
                    <Alert message={this.state.err_msg} type="warning" showIcon/> :
                    null
                }
                <LoginForm submit={this.handleSubmit} user={this.state.user} pwd={this.state.pwd}/>

                <center><i className="mod-login-account">
                    默认管理账号：admin / 密码：123456
                </i></center><br />
            </div>

        </Fragment>;
    }
}
