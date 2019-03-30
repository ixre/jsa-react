import React from "react";
import DomainForm from "./DomainForm";
import {fn, http} from "../../base";
import {Modal} from "../../components/common";
import {observer,PropTypes} from "mobx-react";


@observer
export class CreateDomain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: {
                state: true
            }
        };
    }

    static contextTypes = {
        store: PropTypes.observableObject
    };
    onSubmit(values) {
        let t = this;
        const {store} = this.context;
        values.id = 0;
        values.user_id = store.user.userId;
        values.state = values.state?1:0;
        http.jsonPost(fn.api("/domain/save"), values, function (r) {
            if (!r.code) {
                Modal.success("提示", "新增成功", () => {
                    t.props.history.push(".");
                });
            } else {
                Modal.error("新增失败:" + r["err_msg"]);
            }
        });
    }

    render() {
        return <React.Fragment>
            <DomainForm values={this.state.value} saveText="创建" onSubmit={this.onSubmit.bind(this)}/>
        </React.Fragment>;
    }
}