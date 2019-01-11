import React from "react";
import LoginForm from "../../components/AuthenticationWrapper/LoginForm";

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSubmit = (values) => {
        console.log(`---${values}`);
    }

    render() {
        return <LoginForm submit={this.handleSubmit}/>
    }
}
