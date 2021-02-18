import React from "react"
import {observer, PropTypes} from "mobx-react";
import {fn, http} from "../../base";
import {withRouter} from "react-router-dom";

@observer
@withRouter
export class AuthenticationWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false
        };
        this.hasLogin = () => {
            this.setState({isLogin: true});
        };
    }

    static contextTypes = {
        store: PropTypes.observableObject,
    };

    componentWillMount() {
        let t = this;
        const {store} = this.context;
        if (!store.checkLogin()) {
            http.jsonPost(fn.api("/check_session"), {}, function (r) {
                if (!r.code) {
                    store.isLogin = true;
                    store.sessionID = r["SessionId"];
                    store.user = {
                        userId: r["UserId"],
                        isSuper: r["SuperUser"] == "1"
                    };
                    t.hasLogin();
                } else {
                    t.props.history.push("/login");
                }
            }, function (err) {
                console.log(`[ XHR][ Check]: check session error : ${err}`);
                t.props.history.push("/login");
            });
        } else {
            this.hasLogin();
        }
    }

    render() {
        return <React.Fragment>{this.state.isLogin ? this.props.children : null}</React.Fragment>
    }
}



