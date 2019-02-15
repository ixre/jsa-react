import {Icon, Layout, Menu} from 'antd';
import React from "react";
import {withRouter} from 'react-router-dom';
import {Header as MyHeader} from "./Header"
import "./AppLayout.css";
import Col from "antd/es/grid/col";
import Row from "antd/es/grid/row";
import {fn, http} from "../../base";
import AppBreadcrumb from "./AppBreadcrumb";

const {Header, Content, Sider} = Layout;
const SubMenu = Menu.SubMenu;

let Logo = (props) => {
    return <div className="logo">
        <Icon className="logo-icon" type="compass"/>
        <span className="logo-txt">{props.name}</span>
        <i className="logo-version">v{props.version}</i>
    </div>;
};


@withRouter
export class AppLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            name: "",
            version: "",
            // User info
            user: {
                name: "admin"
            }
        };
    }

    componentDidMount() {
        let t = this;
        http.jsonPost(fn.api("/initial"), {}, function (r) {
            t.setState({
                name: r["sys_name"],
                version: r["version"],
                user: r["user"]
            });
        });
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    assignUrl = (href) => {
        this.props.history.push(href);
    };

    render() {
        return (
            <Layout style={{minHeight: '100vh'}}>
                <Sider collapsible
                       className="app-slider"
                       trigger={null}
                       collapsed={this.state.collapsed}>
                    <Logo name={this.state.name} version={this.state.version}/>
                    <Menu theme="dark" defaultSelectedKeys={['menu-board']} mode="inline">
                        <Menu.Item key="menu-board" onClick={this.assignUrl.bind(this, "/dashboard")}>
                            <Icon type="home"/>
                            <span>面板首页</span>
                        </Menu.Item>
                        <Menu.Item key="menu-domains" onClick={this.assignUrl.bind(this, "/domain")}>
                            <Icon type="menu-unfold" />
                            <span>域名</span>
                        </Menu.Item>
                        <Menu.Item key="menu-users" onClick={this.assignUrl.bind(this, "/users")}>
                            <Icon type="user"/>
                            <span>用户</span>
                        </Menu.Item>
                        <SubMenu
                            key="sub1"
                            title={<span><Icon type="pie-chart"/><span>报表</span></span>}>
                            <Menu.Item key="3" onClick={this.assignUrl.bind(this, "/home/next")}>点击量统计</Menu.Item>
                            <Menu.Item key="4" onClick={this.assignUrl.bind(this, "/home/next")}>月分析统计</Menu.Item>
                            <Menu.Item key="5" onClick={this.assignUrl.bind(this, "/home/next")}>日分析统计</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="menu-api" onClick={this.assignUrl.bind(this, "/api")}>
                            <Icon type="api"/>
                            <span>开放API</span>
                        </Menu.Item>
                        <SubMenu key="sub2"
                                 title={<span><Icon type="setting" /><span>系统设置</span></span>}>
                            <Menu.Item key="sub-domain-2"
                                       onClick={this.assignUrl.bind(this, "/domain")}>域名绑定</Menu.Item>
                            <Menu.Item key="6" onClick={this.assignUrl.bind(this, "/profile/edit")}>资料修改</Menu.Item>
                            <Menu.Item key="8" onClick={this.assignUrl.bind(this, "/user/exit")}>退出登陆</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout>
                    <Header className="app-header">
                        <Row>
                            <Col span={6}>
                                <Icon
                                    className="trigger menu-trigger"
                                    type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                    onClick={this.toggle}
                                /></Col>
                            <Col span={12} offset={6}>
                                <MyHeader user={this.state.user}/>
                            </Col>
                        </Row>
                    </Header>
                    <Content className="app-content-box">
                        {/*<Breadcrumb style={{margin: '16px 0'}}>*/}
                        {/*    <Breadcrumb.Item>User</Breadcrumb.Item>*/}
                        {/*    <Breadcrumb.Item>Bill</Breadcrumb.Item>*/}
                        {/*</Breadcrumb>*/}
                        {/*<div style={{padding: 24, background: '#fff', minHeight: 360}}>*/}
                        {/*    Bill is a cat.*/}
                        {/*</div>*/}
                        <AppBreadcrumb/><br />
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

