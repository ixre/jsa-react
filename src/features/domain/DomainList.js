import React from "react";
import GridTable from "../../components/grid/GridTable";
import Tag from "antd/es/tag";
import {fn, http} from "../../base";
import {Modal} from "../../components/common";
import Button from "antd/es/button";
import Search from "antd/es/input/Search";
import {withRouter} from "react-router-dom";

@withRouter
export class DomainList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reload: false,
            delLoading: false,
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
                disabled: false,
                name: this.rowKey(record),
            }),
        };
    }

    // 定义列
    rowKey = r => r.user;
    searchHolder = "用户/邮箱";
    columns = [{
        title: '域名',
        dataIndex: 'domain',
        width: '30%'
    }, {
        title: '域名编号',
        dataIndex: 'hash',
        width: '20%'
    }, {
        title: '备注',
        dataIndex: 'notes',
        width: '20%'
    }, {
        title: '状态',
        dataIndex: 'state',
        width: '10%',
        render: (s) => {
            if (s == 1) {
                return <Tag color="green">正常</Tag>;
            }
            return <Tag color="red">已停用</Tag>;
        }
    }, {
        title: '操作',
        dataIndex: '',
        render: (_, row) => {
            // <Divider type="vertical"/>
            return <a href="javascript:;" onClick={this.onEdit.bind(this, this.rowKey(row))}>更新</a>;
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
        http.jsonPost(fn.api("/domain/list"), params, (data) => {
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
        this.props.history.push("/domain/new");
    }

    onEdit(key) {
        this.props.history.push("/domain/edit/" + key);
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
        const {searchHolder, rowSelection, columns, rowKey} = this;
        const {reload, delLoading} = this.state;
        const {checkedRowKeys} = this.state;
        const hasChecked = checkedRowKeys != "";
        return <React.Fragment>
            <div className="gra-control-bar">
                <Button type="primary" onClick={this.onCreate.bind(this)}>
                    添加域名
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