import React from "react";
import DomainForm from "./DomainForm";
import {fn, http} from "../../base";
import {Modal} from "../../components/common";
import {observer, PropTypes} from "mobx-react";

@observer
export class EditDomain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            key:0,
            user_id:0,
            value: {}
        };
    }

    static contextTypes = {
        store: PropTypes.observableObject
    };

    componentDidMount() {
        let key = this.props.match.params.id;
        let t = this;
        const {store} = this.context;
        let user_id = store.user.userId;
        this.setState({key:key,user_id:user_id});
        http.jsonPost(fn.api("/domain/get?id=" + key), {}, function (r) {
            //r.enabled = (r.flag & USER_FLAG.Enabled) == USER_FLAG.Enabled;
            t.setState({value: r});
        });
    }

    onSubmit(values) {
        let t = this;
        values.id = this.state.key;
        values.user_id = this.state.user_id;
        values.state = values.state?1:0;
        http.jsonPost(fn.api("/domain/save"), values, function (r) {
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
            <DomainForm values={this.state.value} saveText="保存" onSubmit={this.onSubmit.bind(this)}/>
        </React.Fragment>;
    }
}