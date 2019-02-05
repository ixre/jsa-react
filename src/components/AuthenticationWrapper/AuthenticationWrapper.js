import React from "react"
import {observer} from "mobx-react";
import PropTypes from 'prop-types';
import {http,fn} from "../../base";
@observer
export class AuthenticationWrapper extends React.Component {
    static contextTypes = {
        store: PropTypes.object,
    };
    componentDidMount() {
        const {store} = this.context;
        if(!store.checkLogin()){
            http.jsonPost(fn.api("/check_session"),{},function(r){
                if(!r.code){
                    store.isLogin = true;
                }else{
                    location.assign("#/login");
                }
            },function(err){
                console.log(`[ XHR][ Check]: check session error : ${err}`);
                location.assign("#/login");
            })

        }
    }
    render() {
        return <React.Fragment>{this.props.children}</React.Fragment>
    }
}



