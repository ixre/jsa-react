import React, {Fragment} from 'react';
import LoginForm from '../../components/AuthenticationWrapper/LoginForm';
import {http,fn} from "../../base";
import '../../css/login.css';

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "jarrysix",
            pwd: "123456"
        };
    }

    handleSubmit = (values) => {
        const data = {"user": values.user, "pwd": values.password};
        console.log(values.password);

        http.jsonPost(fn.api("/login"), data, function (r) {
            console.log("---", JSON.stringify(r));
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
