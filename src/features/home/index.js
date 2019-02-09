import React from "react";

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.history.push("/dashboard");
    }

    render() {
        return "";
    }
}

