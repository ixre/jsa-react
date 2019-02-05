import React from "react";
import PropTypes from "prop-types";

export class Provider extends React.Component {
    static propTypes = {
        store: PropTypes.object.isRequired
    };
    static childContextTypes = {
        store: PropTypes.object
    };
    getChildContext() {
        return {store: this.props.store};
    }
    render() {
        return this.props.children;
    }
}
