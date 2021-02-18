import React from "react";
import {withRouter} from "react-router-dom";
import {Layout} from "antd";

let Footer = () => {
    let y = new Date().getFullYear();
    return <Layout.Footer style={{textAlign: 'center'}}>
        JSA ©{y} by jarrysix
    </Layout.Footer>;
};

@withRouter
export class Dashboard extends React.Component {
    start() {
        this.props.history.push("/domain");
    }

    render() {
        return <React.Fragment>
            <center>
                <a href="javascript:void(0)" onClick={this.start.bind(this)}>开使使用</a>
            </center>
            <br/> <br/>
            <Footer/>
        </React.Fragment>;
    }
}