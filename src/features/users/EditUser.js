import React from "react";
import UserForm from "./UserForm";
import {fn, http} from "../../base";
import {Modal} from "../../components/common";
import {USER_FLAG} from "./Users";

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
        http.jsonPost(fn.api("/user/get?user=" + key), {}, function (r) {
            r.enabled = (r.flag & USER_FLAG.Enabled) == USER_FLAG.Enabled;
            t.setState({value: r});
        });
    }

    onSubmit(values) {
        let t = this;
        values.flag = 0;
        http.jsonPost(fn.api("/user/save"), values, function (r) {
            if (!r.code) {
                Modal.success("提示", "保存成功", () => {
                    t.props.history.push("..");
                });
            } else {
                Modal.error("提示", "保存失败:" + r["err_msg"]);
            }
        });
    }

    render() {
        return <React.Fragment>
            <UserForm values={this.state.value} saveText="保存" onSubmit={this.onSubmit.bind(this)}/>
        </React.Fragment>;
    }
}