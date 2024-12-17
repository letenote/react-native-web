const createExpoWebpackConfigAsync = require("@expo/webpack-config");
const path = require("path");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");

module.exports = async function (env, argv) {
  const isProduction = env.mode === "production";
  const config = await createExpoWebpackConfigAsync(env, argv);
  config.resolve.fallback = {
    fs: false,
    RNRenderer: false,
    crypto: false,
    path: false,
  };

  config.output = {
    ...config.output,
    uniqueName: "pmn_portal",
    publicPath: "/",
    scriptType: "text/javascript",
  };

  if (isProduction) {
    config.plugins.push(
      new WorkboxWebpackPlugin.InjectManifest({
        swSrc: path.resolve(__dirname, "sw/ngsw-worker.js"),
        dontCacheBustURLsMatching: /\.[0-9a-f]{8}\./,
        exclude: [
          /\.map$/,
          /asset-manifest\.json$/,
          /LICENSE/,
          /\.js\.gz$/,
          /(apple-touch-startup-image|chrome-icon|apple-touch-icon).*\.png$/,
        ],
        maximumFileSizeToCacheInBytes: 250 * 1024 * 1024,
      })
    );
  }

  return config;
};
