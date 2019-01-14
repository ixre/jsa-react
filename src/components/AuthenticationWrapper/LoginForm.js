import React from "react";
import {Button, Checkbox, Form, Icon, Input} from 'antd';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) this.props.submit(values);
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const user = this.props.user;
        const pwd = this.props.pwd;
        return (
            <Form onSubmit={this.handleSubmit} className="mod-login-form">
                <Form.Item>
                    {getFieldDecorator('user', {
                        initialValue: user,
                        rules: [{required: true, message: 'Please input your username!'}],
                    })(
                        <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="用户名"/>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        initialValue: pwd,
                        rules: [{required: true, message: 'Please input your Password!'}],
                    })(
                        <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                               placeholder="密码"/>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>记住本次登陆</Checkbox>
                    )}
                    <a className="login-form-forgot" href="">忘记密码</a>
                    <div className="login-form-login-btn">
                        <Button type="primary" htmlType="submit" className="login-form-button">登陆</Button>
                    </div>
                </Form.Item>
            </Form>
        );
    }
}

export default Form.create()(LoginForm);