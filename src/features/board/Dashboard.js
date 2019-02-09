import React from "react";

export class Dashboard extends React.Component {
    render() {
        this.props.history.push("/domain");
        return "dashboard";
    }
}