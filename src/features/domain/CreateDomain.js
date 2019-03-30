import React from "react";
import DomainForm from "./DomainForm";
import {fn, http} from "../../base";
import {Modal} from "../../components/common";

export class CreateDomain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: {
                flag: 0
            }
        };
    }

    onSubmit(values) {
        let t = this;
        values.flag = 0;
        http.jsonPost(fn.api("/user/save"), values, function (r) {
            if (!r.code) {
                Modal.success("提示", "新增成功", () => {
                    t.props.history.push("..");
                });
            } else {
                Modal.error("新增失败:" + r["err_msg"]);
            }
        });
    }

    render() {
        return <React.Fragment>
            <DomainForm value={this.value} saveText="创建" onSubmit={this.onSubmit.bind(this)}/>
        </React.Fragment>;
    }
}