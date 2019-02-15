import React from "react";
import {Button, Checkbox, Form, Icon, Input} from 'antd';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {disabled: ""};
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({disabled: "disabled"});
                this.props.submit(values, () => {
                    this.setState({disabled: ""})
                });
            }
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
                        rules: [{required: true, message: '请输入用户'}],
                    })(
                        <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="用户名"/>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        initialValue: pwd,
                        rules: [{required: true, message: '请输入密码'}],
                    })(
                        <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                               placeholder="密码"/>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: !true,
                    })(
                        <Checkbox>记住用户</Checkbox>
                    )}
                    <a className="login-form-forgot" href="">忘记密码</a>
                    <div className="login-form-login-btn">
                        <Button type="primary" htmlType="submit" className="login-form-button"
                                disabled={this.state.disabled}>登陆</Button>
                    </div>
                </Form.Item>
            </Form>
        );
    }
}

export default Form.create()(LoginForm);