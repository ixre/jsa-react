import $b from "./lib/jr"
import {hex} from "./lib/crypto";
// Support develop api server.
let API_PREFIX = "/console/api";
if (location.host.startsWith("localhost")) {
    API_PREFIX = "http://localhost:8302" + API_PREFIX;
}
export const http = $b.xhr;
// Export some common functions
export const fn = {
    // 生成API地址
    api: function (url) {
        return API_PREFIX + url;
    },
    // 生成密码
    pwd:function(s){
        return hex("sha1",s);
    }
};
export default {
    $b: $b,
};