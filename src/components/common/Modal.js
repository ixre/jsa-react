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

    static success(title, content, callback) {
        M.success({
            title: title,
            content: content,
            onOk: callback,
        });
    }

    static error(title, content, callback) {
        M.error({
            title: title,
            content: content,
            onOk: callback,
        });
    }
}