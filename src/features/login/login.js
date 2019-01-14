import React, {Fragment} from 'react';
import LoginForm from '../../components/AuthenticationWrapper/LoginForm';
import '../../css/login.css';

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSubmit = (values) => {
        console.log(`---${values}`);
    }

    render() {
        return <Fragment>
            <br/><br/><br/><br/>
            <div className="mod-login-view">
                <h2>JSA User Login: </h2><br/>
                <LoginForm submit={this.handleSubmit}/>
            </div>
        </Fragment>;
    }
}
