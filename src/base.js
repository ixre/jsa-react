import $b from "./lib/jr"

const $http = $b.xhr;
export const http = $http;
export default {
    $b: $b,
}