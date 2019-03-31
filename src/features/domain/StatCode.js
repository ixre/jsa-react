import React from "react";
import Tabs from "antd/es/tabs";
import Col from "antd/es/grid/col";
import Row from "antd/es/grid/row";
import TextArea from "antd/es/input/TextArea";
import {fn, http} from "../../base";
import Button from "antd/es/button";
import {Modal} from "../../components/common";


// 统计代码
export class StatCode extends React.Component {
    constructor(props) {
        super(props);
        let hash = this.props.match.params.hash;
        this.state = {
            hash: hash,
            js_url: "",
        };
    }

    componentDidMount() {
        // 获取统计脚本地址,self=1使用当前域
        var t = this;
        http.jsonPost(fn.api("/domain/stat_js?self_host=0&hash="
            + this.state.hash), {}, function (r) {
            t.setState({js_url: r["url"]});
        });
    }

    onCopy(){
        Modal.success("提示","复制成功，请将代码粘贴到您需要统计的地方");
    }

    formatStatCode = (js_url) => {
        if (js_url.length == 0) {
            return "生成中...";
        }
        return "<script type=\"text/javascript\">\n" +
            "var _stat_callback = function(data){};\n"+
            "(function(c) {\n" +
            "   var s = document.createElement(\"SCRIPT\");\n" +
            "   s.src = \""+js_url+"&callback=\"+c;\n" +
            "   var f = document.getElementsByTagName(\"SCRIPT\")[0];\n" +
            "   f.parentNode.insertBefore(s, f);\n" +
            "})(\"_stat_callback\");" +
            "\n</script>";
    };

    render() {

        return <React.Fragment>
            <Row>
                <Col span={14}>
                    <h3>统计代码：</h3>
                    <TextArea rows="10" value={this.formatStatCode(
                        this.state.js_url)}/><br /><br />
                        <div>
                            <Button className="gra-btn-primary" onClick={this.onCopy.bind(this)}>复制代码</Button>
                        </div>
                </Col>
                <Col offset={2} span={8}></Col>
            </Row>
        </React.Fragment>;
    }
}