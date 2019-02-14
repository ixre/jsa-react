import M from "antd/es/modal";

export class Modal {
    static confirm(title, content, callback, options) {
        if (options == undefined) options = {};
        M.confirm({
            title: title,
            content: content,
            okText: options.okText || "确定",
            onOk: () => callback(true),
            onCancel: () => callback(false),
            cancelText: options.cancelText || '取消',
        });
    }
}