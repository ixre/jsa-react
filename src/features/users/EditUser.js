import React from "react";
import UserForm from "./UserForm";
import {fn, http} from "../../base";
import {Modal} from "../../components/common";

export class EditUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: {}
        };
    }

    componentDidMount() {
        let key = this.props.match.params.id;
        let t = this;
        http.jsonPost(fn.api("/user/get"), {user: key}, function (r) {
            t.setState({value: r});
        });
    }

    onSubmit(values) {
        let t = this;
        http.jsonPost(fn.api("/user/save", values, function (r) {
            if (!r.code) {
                Modal.alert("success", "保存成功", function () {
                    t.props.history.push("..");
                });
            } else {
                Modal.alert("success", "保存失败:" + r["err_msg"]);
            }
        }))
        console.log('Received values of form: ', values);
    }

    render() {
        return <React.Fragment>
            <UserForm value={this.value} saveText="保存" onSubmit={this.onSubmit.bind(this)}/>
        </React.Fragment>;
    }
}