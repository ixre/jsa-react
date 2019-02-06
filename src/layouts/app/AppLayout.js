import {Icon, Layout, Menu} from 'antd';
import React from "react";

const {Header, Content, Footer, Sider} = Layout;
const SubMenu = Menu.SubMenu;
import { withRouter } from 'react-router-dom';
@withRouter
export class AppLayout extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            collapsed: false,
        };
    }

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({collapsed});
    }
    assignUrl=(href)=>{
        this.props.history.push(href);
    }

    render() {
        return (
            <Layout style={{minHeight: '100vh'}}>
                <Sider collapsible
                       collapsed={this.state.collapsed}
                       onCollapse={this.onCollapse}>
                    <div className="logo"/>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1" onClick={this.assignUrl.bind(this,"/project")}>
                            <Icon type="pie-chart"/>
                            <span>项目</span>
                        </Menu.Item>
                        <SubMenu
                            key="sub1"
                            title={<span><Icon type="user"/><span>报表</span></span>}>
                            <Menu.Item key="3" onClick={this.assignUrl.bind(this,"/next")}>点击量统计</Menu.Item>
                            <Menu.Item key="4" onClick={this.assignUrl.bind(this,"/next")}>月分析统计</Menu.Item>
                            <Menu.Item key="5" onClick={this.assignUrl.bind(this,"/next")}>日分析统计</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2"
                                 title={<span><Icon type="team"/><span>系统设置</span></span>}>
                            <Menu.Item key="sub-domain-2" onClick={this.assignUrl.bind(this,"/domain")}>域名绑定</Menu.Item>
                            <Menu.Item key="6" onClick={this.assignUrl.bind(this,"/profile/edit")}>资料修改</Menu.Item>
                            <Menu.Item key="8" onClick={this.assignUrl.bind(this,"/user/exit")}>退出登陆</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{background: '#fff', padding: 0}}/>
                    <Content style={{margin: '0 16px'}}>
                        {/*<Breadcrumb style={{margin: '16px 0'}}>*/}
                        {/*    <Breadcrumb.Item>User</Breadcrumb.Item>*/}
                        {/*    <Breadcrumb.Item>Bill</Breadcrumb.Item>*/}
                        {/*</Breadcrumb>*/}
                        {/*<div style={{padding: 24, background: '#fff', minHeight: 360}}>*/}
                        {/*    Bill is a cat.*/}
                        {/*</div>*/}
                        {this.props.children}
                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        JSA ©2019 by jarrysix
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

