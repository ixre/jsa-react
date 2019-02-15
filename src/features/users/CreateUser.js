import React from "react";
import UserForm from "./UserForm";
import {fn, http} from "../../base";
import {Modal} from "../../components/common";

export class CreateUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: {}
        };
    }

    onSubmit(values) {
        let t = this;
        http.jsonPost(fn.api("/user/save", values, function (r) {
            if (!r.code) {
                Modal.alert("success", "新增成功", function () {
                    t.props.history.push("..");
                });
            } else {
                Modal.alert("success", "新增失败:" + r["err_msg"]);
            }
        }))
        console.log('Received values of form: ', values);
    }

    render() {
        return <React.Fragment>
            <UserForm value={this.value} saveText="创建" onSubmit={this.onSubmit.bind(this)}/>
        </React.Fragment>;
    }
}