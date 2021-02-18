import React from "react";
import PropTypes from "prop-types";

export class HyperLink extends React.component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        href: PropTypes.string,
        onClick: PropTypes.func.isRequired,
        title: PropTypes.string
    };

    render() {
        const {href, title, onClick} = this.props;
        return <a href={href ? href : "javascript:void(0)"}
                  title={title}
                  onClick={onClick}>
            {this.props.children}
        </a>;
    }
}
