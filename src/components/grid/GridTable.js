import React from "react";
import {Table} from "antd";
import PropsType from "prop-types";
import {UserIFaceExtend} from "../../lib";

export default class GridTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollOffsetY: props.offsetY || 0,
            scroll: props.scroll,
            loading: true,
            pagination: {
                showQuickJumper: true,
                pageSize: props.pageSize || 10,
                current: props.current || 1,
            },
        }
    }

    static propTypes = {
        offsetY: PropsType.number,
        ref: PropsType.string,
        rowKey: PropsType.func,
        pageSize: PropsType.number,
        // 获取数据的方法,内部实现如：(params, bind) {bind({rows:[],total:100})
        dataFetch: PropsType.func,
        // 数据表格重新加载，值为true时加载
        reload: PropsType.bool,
    };
    static defaultProps = {
        ref: "table1"
    };
    onTableChange = (pagination, filters, sorter) => {
        const pager = {...this.state.pagination};
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetchData({
            size: pagination.pageSize,
            page: pagination.current,
            sortField: sorter.field || "",
            sortOrder: sorter.order || true,
            ...filters,
        });
    }

    fetchData = (params = {
        size: this.state.pagination.pageSize,
        page: this.state.pagination.current
    }) => {
        this.setState({loading: true});
        let callback = (data) => {
            const pagination = {...this.state.pagination};
            pagination.total = data.total || data.length;
            this.setState({
                loading: false,
                data: data.rows || data.results || data,
                pagination,
            });
        };
        if(this.props.dataFetch) {
            this.props.dataFetch(params, callback);
        }else{
            callback({total:0,rows:[]});
        }
    }

    componentDidMount() {
        this.fetchData();
        if (this.state.scroll) {
            let y = UserIFaceExtend.getTableScrollY(this, this.props.ref);
            this.setState({scroll: {y: y + this.state.scrollOffsetY}});
        }
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (this.props.reload != nextProps.reload && nextProps.reload == true) {
            this.fetchData();
        }
    }

    render() {
        const {onRow, rowSelection, columns, rowKey} = this.props;
        return <div className="gra-grid-table">
            <Table ref={this.props.ref}
                   {...this.props}
                   rowKey={rowKey}
                   rowSelection={rowSelection}
                   pagination={this.state.pagination}
                   dataSource={this.state.data}
                   columns={columns}
                   loading={this.state.loading}
                   scroll={this.state.scroll}
                   onChange={this.onTableChange}
                   onRow={onRow ? onRow : null}/>
        </div>;
    }
}