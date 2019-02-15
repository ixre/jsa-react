import React from "react";
import {withRouter} from "react-router-dom";
import Col from "antd/es/grid/col";
import Row from "antd/es/grid/row";
import {Dropdown, Icon, Menu, Modal} from 'antd';
import {observer, PropTypes} from "mobx-react";
import {fn, http} from "../../base";

const UserFlag = ({flag}) => {
    if (flag & 2 == 2) {
        return <i>(超级管理员)</i>;
    }
    return null;
}

@withRouter
@observer
export class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    static contextTypes = {
        store: PropTypes.observableObject,
    };

    componentWillMount() {
        const {store} = this.context;
        this.store = store;
    }

    menuClick(url) {
        this.props.history.push(url);
    }

    logout() {
        let fh = () => {
            this.store.isLogin = false;
            let history = this.props.history;
            http.jsonPost(fn.api("/logout"), {}, function () {
                history.push("/login");
            });
        };
        Modal.confirm({
            content: '您确定要退出吗？',
            okText: '确认',
            onOk: fh,
            cancelText: '取消',
        });
    }

    menu = (
        <Menu>
            <Menu.Item key="0">
                <a target="_blank" onClick={this.menuClick.bind(this, "/profile")}>资料修改</a>
            </Menu.Item>
            <Menu.Item key="1">
                <a target="_blank" onClick={this.logout.bind(this)}>退出登陆</a>
            </Menu.Item>
            <Menu.Divider/>
            <Menu.Item key="2">
                <a target="_blank" rel="noopener noreferrer" href="http://github.com/jsix/jsa">Source code</a>
            </Menu.Item>
        </Menu>
    );

    render() {
        return <React.Fragment>
            <Row type="flex" justify="start">
                <Col span={10} offset={8}>
                    欢迎您：<Dropdown overlay={this.menu}>
                    <span className="app-user-name">
                        {this.props.user.name}
                        <Icon type="down"/>
                        <UserFlag flag={this.props.user.flag}/>
                    </span>
                </Dropdown>
                </Col>
                <Col span={3} align="left">
                    <a className="app-header-fork" href="http://github.com/jsix/jsa/fork" target="_blank">
                        <Icon type="fork"/>&nbsp;<span>Fork</span>
                    </a>
                </Col>
                <Col span={3} align="left">
                    <a className="app-header-fork" href="http://github.com/jsix/jsa#jsa" target="_blank">
                        <span>帮助?</span>
                    </a>
                </Col>
            </Row>
        </React.Fragment>;
    }
}


