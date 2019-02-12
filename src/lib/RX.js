import * as ReactDOM from "react-dom";

const RX = {
    findRefNode : (component, ref) => {
        return ReactDOM.findDOMNode(component.refs[ref]);
    }
};
export default RX;

