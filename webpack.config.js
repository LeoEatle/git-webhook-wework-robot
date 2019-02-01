var path = require("path");

module.exports = {
    entry: "./src/server.ts",
    mode: "production",
    target: "node",
    output: {
        filename: "server.js",
        path: path.resolve(__dirname, "dist")
    },
    devtool: "source-map",
    plugins: [

    ],
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            { test: /\.tsx?$/, loader: "ts-loader", exclude: /node_modules/ }
        ]
    }
};
