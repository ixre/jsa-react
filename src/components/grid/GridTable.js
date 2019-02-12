import React from "react";
import {Table} from "antd";

export default class GridTable extends Table {
    static scrollAuto(table){
        console.log("---",table.props);
        return {y:200};
    }

    render() {
        return <div className="gra-grid-table">
            {super.render()}
        </div>;
    }
}