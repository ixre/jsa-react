import React from "react"

export class AuthenticationWrapper extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount() {
      // location.assign("#/login");
    }

    render() {
       return <React.Fragment>{this.props.children}</React.Fragment>
    }
}