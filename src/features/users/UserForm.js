import * as React from "react";
import {Form} from "antd";
import Input from "antd/es/input";
import Button from "antd/es/button";
import PropTypes from "prop-types";
import Switch from "antd/es/switch";

const formItemLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 8},
};

class UserForm extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        values: PropTypes.object,
        saveText: PropTypes.string,
    }
    static defaultProps = {
        values: {}
    };
    // 验证密码
    validatePassword = (rule, value, callback) => {
        callback();
        this.props.form.validateFields(['nickname'], {force: true});
    };

    handleSubmit = (e) => {
        const {onSubmit} = this.props;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) onSubmit(values);
        });
    };

    render() {
        const {saveText} = this.props;
        const {getFieldDecorator} = this.props.form;

        return <React.Fragment>
            <Form onSubmit={this.handleSubmit.bind(this)}>
                <Form.Item {...formItemLayout} label="用户">
                    {getFieldDecorator('user', {
                        initialValue: this.props.values["user"],
                        rules: [{
                            required: true,
                            message: '请填写用户',
                        }],
                    })(
                        <Input placeholder="填写登陆用户名，不可更改"/>
                    )}
                </Form.Item>

                <Form.Item {...formItemLayout} label="密码">
                    {getFieldDecorator('pwd', {
                        initialValue: this.props.values["pwd"],
                        rules: [{
                            required: true,
                            message: '请填写密码',
                        }, {
                            validator: this.validatePassword,
                        }],
                    })(
                        <Input type="password" placeholder="至少6位字母或数字的组合"/>
                    )}
                </Form.Item>

                <Form.Item {...formItemLayout} label="昵称">
                    {getFieldDecorator('name', {
                        initialValue: this.props.values["name"],
                        rules: [{
                            required: true,
                            message: '请填写昵称',
                        }],
                    })(
                        <Input/>
                    )}
                </Form.Item>

                <Form.Item {...formItemLayout} label="电子邮箱">
                    {getFieldDecorator('email', {
                        initialValue: this.props.values["email"],
                        rules: [
                            {type: 'email', message: "不是有效的电子邮箱"},
                            {
                                required: true,
                                message: '请填写电子邮箱',
                            }],
                    })(
                        <Input placeholder=""/>
                    )}
                </Form.Item>

                <Form.Item{...formItemLayout} label="是否启用">
                    {getFieldDecorator('enabled', {
                        initialValue: this.props.values["enabled"],
                        valuePropName: 'checked'
                    })(
                        <Switch/>
                    )}
                </Form.Item>

                <Form.Item wrapperCol={{span: formItemLayout.wrapperCol.span, offset: 4}}>
                    <Button type="primary" htmlType="submit">
                        {saveText ? saveText : "提交"}
                    </Button>
                </Form.Item>
            </Form>
        </React.Fragment>;
    }
}

export default Form.create({name: 'form_user'})(UserForm);
