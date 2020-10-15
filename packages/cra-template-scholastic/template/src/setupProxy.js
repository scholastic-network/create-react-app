const proxy = require("http-proxy-middleware")

module.exports = function (app) {
    app.use(proxy("/api", {target: "http://localhost"}))
    app.use(proxy("/res/", {target: "http://localhost/"}))
}
