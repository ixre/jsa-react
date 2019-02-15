import React from "react";
import GridTable from "../../components/grid/GridTable";
import Button from "antd/es/button";
import {fn, http} from "../../base";
import Tag from "antd/es/tag";
import Search from "antd/es/input/Search";
import {Modal} from "../../components/common";
import {withRouter} from "react-router-dom";
import {USER_FLAG} from "./Users";


@withRouter
export class UserList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            reload: false,
            delLoading: false,
            rowKey: r => r.name,
            // 选中的行
            checkedRowKeys: "",
            searchValue: "",
        };
        // rowSelection object indicates the need for row selection
        this.rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({checkedRowKeys: selectedRowKeys});
            },
            getCheckboxProps: record => ({
                disabled: (record.flag & USER_FLAG.Super) === USER_FLAG.Super,
                name: this.state.rowKey(record),
            }),
        };
    }

    // 定义列
    searchHolder = "用户/邮箱";
    columns = [{
        title: '用户',
        dataIndex: 'name',
        width: '30%',
        render: (name, row) => {
            return <span>{name}&nbsp;
                {(row.flag & USER_FLAG.Super) == USER_FLAG.Super ?
                    <Tag color="blue">管理员</Tag> : null}
        </span>;
        }
    }, {
        title: '邮箱',
        dataIndex: 'email',
        width: '20%'
    }, {
        title: '状态',
        dataIndex: 'flag',
        width: '20%',
        render: (flag) => {
            if ((flag & USER_FLAG.Enabled) == USER_FLAG.Enabled) {
                if ((flag & USER_FLAG.Activated) == USER_FLAG.Activated) {
                    return <Tag color="blue">已激活</Tag>;
                }
                return <Tag color="silver">待激活</Tag>;
            }
            return <Tag color="red">已停用</Tag>;
        }
    }, {
        title: '操作',
        dataIndex: '',
        render: (_, row) => {
            // <Divider type="vertical"/>
            return <a href="javascript:;" onClick={this.onEdit.bind(this, row.name)}>更新</a>;
        }
    }];


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
        this.setState({reload: true});
    }

    onSearch(txt) {
        this.setState({searchValue: txt, reload: true});
    }

    onCreate() {
        this.props.history.push("/users/new");
    }

    onEdit(key) {
        this.props.history.push("/users/edit/" + key);
    }

    onDelete() {
        Modal.confirm(null, "删除后无法恢复，确定要删除吗？", (() => {
            return (r) => {
                if (!r) return;
                http.jsonPost(fn.api("/user/delete"), {
                    "keys": this.state.checkedRowKeys
                }, (r) => {
                    this.refresh();
                }, (err) => {
                    this.refresh();
                });
            };
        }).apply(this));
    }

    render() {
        const {searchHolder, rowSelection, columns} = this;
        const {reload, delLoading} = this.state;
        const {rowKey, checkedRowKeys} = this.state;
        const hasChecked = checkedRowKeys != "";
        return <React.Fragment>
            <div className="gra-control-bar">
                <Button type="primary" onClick={this.onCreate.bind(this)}>
                    新增用户
                </Button>
                <span className="gra-divider-x2"/>
                <Search style={{width: "300px"}} placeholder={searchHolder}
                        onSearch={this.onSearch.bind(this)}
                        enterButton/>
                <span className="gra-divider"/>
                <Button disabled={!hasChecked}
                        loading={delLoading}
                        onClick={this.onDelete.bind(this)}>删除</Button>
            </div>
            <GridTable rowKey={rowKey} bordered reload={reload} dataFetch={this.dataFetch.bind(this)}
                       rowSelection={rowSelection}
                       scroll={{y: 1}}
                       columns={columns}/>
        </React.Fragment>
    }
}