import RX from "./RX";

// 用户界面扩展
export class UserIFaceExtend {
    // 计算表格滚动高度
    static getTableScrollY(component, ref) {
        let v = RX.findRefNode(component, ref || "table1");
        let rect = v.getBoundingClientRect();
        const height = document.documentElement.offsetHeight;
        return height - rect.top - 120;
    }
}