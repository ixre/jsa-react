import React from "react";
import GridTable from "../../components/grid/GridTable";
import Icon from "antd/es/icon";
import {UserIFaceExtend} from "../../lib";


const columns = [{
    title: '用户',
    dataIndex: 'name',
    width: '40%',
}, {
    title: '邮箱',
    dataIndex: 'age',
    width: '40%'
}, {
    title: '是否启用',
    dataIndex: 'address'
}];

const data = [];
for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        flag: 1,
        name: `Edward King ${i}`,
        age: <Icon type="setting"/>,
        address: `London, Park Lane no. ${i}`,
    });
}


export class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {y: 1};
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

    componentDidMount() {
        this.setState({y: UserIFaceExtend.getTableScrollY(this, "table1")});
    }

    render() {
        return <GridTable ref="table1" rowSelection={this.rowSelection} scroll={{y: this.state.y}}
                          columns={columns} dataSource={data}/>
    }
}