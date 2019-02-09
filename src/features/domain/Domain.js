import React from "react";
import GridTable from "../../components/grid/GridTable";

const columns = [{
    title: 'Name',
    dataIndex: 'name',
}, {
    title: 'Age',
    dataIndex: 'age',
}, {
    title: 'Address',
    dataIndex: 'address',
}];

const data = [];
for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
    });
}

export class Domain extends React.Component {
    render() {
        return <GridTable columns={columns} dataSource={data}/>
    }
}