import rspack from "@rspack/core";

const isProduction = process.env.NODE_ENV === "production";

/** @type {import('@rspack/cli').Configuration} */
export default {
  mode: isProduction ? "production" : "development",
  entry: {
    index: "./src/index.tsx",
  },
  output: {
    filename: "[name].js",
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  module: {
    generator: {
      "css/auto": {
        exportsOnly: false,
        exportsConvention: "as-is",
        localIdentName: isProduction ? "[hash]" : "[path][name][ext]__[local]",
      },
      css: {
        exportsOnly: false,
        exportsConvention: "as-is",
      },
      "css/module": {
        exportsOnly: false,
        exportsConvention: "as-is",
        localIdentName: isProduction ? "[hash]" : "[path][name][ext]__[local]",
      },
    },
    parser: {
      "css/auto": {
        namedExports: false,
      },
      css: {
        namedExports: false,
      },
      "css/module": {
        namedExports: false,
      },
    },
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        loader: "builtin:swc-loader",
        options: {
          sourceMap: true,
          jsc: {
            parser: {
              syntax: "typescript",
              jsx: true,
            },
            transform: {
              react: {
                runtime: "automatic",
              },
            },
          },
        },
        type: "javascript/auto",
      },
      {
        test: /\.css$/i,
        type: "css",
      },
      {
        test: /\.(module|m)\.css$/i,
        type: "css/module",
      },
      {
        test: /\.(apng|avif|gif|jpg|jpeg|png|webp)$/i,
        type: "asset",
      },
    ],
  },
  plugins: [
    new rspack.CssExtractRspackPlugin(),
    new rspack.HtmlRspackPlugin({
      template: "./src/index.html",
      scriptLoading: "module",
      inject: "body",
    }),
    new rspack.CopyRspackPlugin({
      from: "src/static/favicon/**/*",
    }),
  ],
  experiments: {
    outputModule: true,
  },
  devServer: {
    historyApiFallback: true,
    host: "0.0.0.0",
    hot: false,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
};
