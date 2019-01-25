import $b from "./lib/jr"

// Support develop api server.
let API_PREFIX = "/console/api";
if (location.host.startsWith("localhost")) {
    API_PREFIX = "http://localhost:8302" + API_PREFIX;
}
export const http = $b.xhr;

// Export some common functions
export const fn = {
    api: function (url) {
        return API_PREFIX + url;
    }
};
export default {
    $b: $b,
};