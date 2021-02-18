import React from "react";
import UserForm from "./UserForm";
import {fn, http} from "../../base";
import {Modal} from "../../components/common";
import {USER_FLAG} from "./Users";

export class CreateUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: {
                enabled:true,
                flag:USER_FLAG.Enabled
            }
        };
    }

    onSubmit(values) {
        let t = this;
        values.flag = 0;
        http.jsonPost(fn.api("/user/save"), values, function (r) {
            if (!r.code) {
                Modal.success("提示", "新增成功", () => {
                    t.props.history.push(".");
                })
            } else {
                Modal.error("新增失败:" + r["err_msg"]);
            }
        });
    }

    render() {
        return <React.Fragment>
            <UserForm values={this.state.value} saveText="创建" onSubmit={this.onSubmit.bind(this)}/>
        </React.Fragment>;
    }
}