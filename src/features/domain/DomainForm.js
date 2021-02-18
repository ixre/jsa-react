import * as React from "react";
import {Form} from "antd";
import Input from "antd/es/input";
import Button from "antd/es/button";
import PropTypes from "prop-types";
import Switch from "antd/es/switch";
import TextArea from "antd/es/input/TextArea";

const formItemLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 8},
};

class DomainForm extends React.Component {
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
                <Form.Item {...formItemLayout} label="域名">
                    {getFieldDecorator('domain', {
                        initialValue: this.props.values["domain"],
                        rules: [{
                            required: true,
                            message: '请填写域名',
                        }],
                    })(
                        <Input placeholder="如：to2.net；不用输入http://"/>
                    )}
                </Form.Item>


                <Form.Item {...formItemLayout} label="备注">
                    {getFieldDecorator('notes', {
                        initialValue: this.props.values["notes"],
                        rules: [{
                            required: false,
                            message: '请填写备注',
                        }],
                    })(
                        <TextArea/>
                    )}
                </Form.Item>


                <Form.Item{...formItemLayout} label="是否启用">
                    {getFieldDecorator('state', {
                        initialValue: this.props.values["state"],
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

export default Form.create({name: 'form_domain'})(DomainForm);
