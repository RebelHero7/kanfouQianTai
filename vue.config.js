const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  lintOnSave: true,
  chainWebpack: config => {
    config.resolve.alias
      .set("@$", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("layout", resolve("src/layout"))
      .set("base", resolve("src/base"))
      .set("static", resolve("src/static"))
      .set("styles", resolve("src/assets/styles"))
      .set("common", resolve("src/common"));
  },
  devServer: {
    host: "192.168.25.1",
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8080/api",
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};
