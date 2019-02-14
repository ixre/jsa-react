import React, {Fragment} from "react";
import GridTable from "../../components/grid/GridTable";
import Button from "antd/es/button";
import {fn, http} from "../../base";
import Tag from "antd/es/tag";
import Divider from "antd/es/divider";
import Search from "antd/es/input/Search";


const columns = [{
    title: '用户',
    dataIndex: 'name',
    width: '30%',
    render: (name, row) => {
        return <span>{name}&nbsp;
            {(row.flag & 2) == 2 ? <Tag color="blue">管理员</Tag> : null}
        </span>;
    }
}, {
    title: '邮箱',
    dataIndex: 'email',
    width: '20%'
}, {
    title: '类型',
    dataIndex: 'flag',
    width: '20%',
    render: (flag) => {
      return flag;
    }
}, {
    title: '操作',
    dataIndex: '',
    render: (_, row) => {
        if ((row.flag & 2) == 2) {
            return <a href="javascript:;">修改</a>;
        }
        return <span>{
            (row.flag & 1) == 1 ?
                <a href="javascript:;">停用</a> :
                <a href="javascript:;">启用</a>
        }
            <Divider type="vertical"/>
            <a href="javascript:;">修改</a>
        </span>;
    }
}];


export class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reload: false,
            loading: false,
            searchValue: "",
            searchHolder: "用户/邮箱"
        };
        // rowSelection object indicates the need for row selection
        this.rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
                disabled: (record.flag & 2) === 2,
                name: record.name,
            }),
        };
    }

    dataFetch(params, bind) {
        // http fetch callback
        const fc = (() => {
            return (data) => {
                bind(data);
                this.setState({reload: false, loading: false});
            };
        }).apply(this);
        // Attach some params from page
        params.keyword = this.state.searchValue;
        // Send fetch request
        http.jsonPost(fn.api("/user/list"), params, (data) => {
            fc({total: data.total, rows: data.rows});
        }, (err) => {
            fc({total: 0, rows: []});
        });
    }

    // Refresh grid table
    refresh() {
        this.setState({reload: true, loading: true});
    }

    onSearch(txt) {
        this.setState({searchValue: txt,reload:true});
    }

    render() {
        const {loading, reload,searchHolder} = this.state;
        return <React.Fragment>
            <div className="gra-control-bar">
                <Button type="primary" onClick={this.refresh}>
                    新增用户
                </Button>
                <span className="gra-divider-x2"/>
                <Search style={{width: "300px"}} placeholder={searchHolder}
                        onSearch={this.onSearch.bind(this)}
                        enterButton/>
                <span className="gra-divider"/>
                <Button disabled loading={this.state.loading}>删除</Button>
            </div>
            <GridTable rowKey={r=>r.name} bordered reload={reload} dataFetch={this.dataFetch.bind(this)} rowSelection={this.rowSelection}
                       scroll={{y: 1}}
                       columns={columns}/>
        </React.Fragment>
    }
}