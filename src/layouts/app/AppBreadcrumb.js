import {Link, withRouter,} from 'react-router-dom';
import {Breadcrumb} from 'antd';
import React from "react";
import Icon from "antd/es/icon";
import {BREAD_CRUMB_MAP} from "./BreadcrumbMap";

/*
const breadcrumbNameMap = {
    '/users': '用户',
    '/users/new': '创建用户',
};*/
const AppBreadcrumb = withRouter((props) => {
    const {location} = props;
    const pathSnippets = location.pathname.split('/').filter(i => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        return (
            <Breadcrumb.Item key={url}>
                <Link to={url}>
                    {BREAD_CRUMB_MAP[url]}
                </Link>
            </Breadcrumb.Item>
        );
    });
    const breadcrumbItems = [(
        <Breadcrumb.Item key="home">
            <Link to="/"><Icon type="home"/></Link>
        </Breadcrumb.Item>
    )].concat(extraBreadcrumbItems);
    return <Breadcrumb>{breadcrumbItems}</Breadcrumb>;
});

export default AppBreadcrumb;