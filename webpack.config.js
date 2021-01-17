// webpack.build.js is not strictly necessary, but will allow us to add specifications for the webpack build.
const path = require('path');
const webpack = require('webpack');
require('bootstrap');


module.exports = {
    module: {
        rules: [
            {
                test: require.resolve('jquery'),
                loader: 'expose-loader',
                options: {
                    exposes: {
                        globalName: "$",
                        override: true

                    },
                }
            }
        ],
    },

    // assigns root of bundle and beginning of dependency graph (default is ./src/index.js)
    entry: './assets/js/script.js',
    // webpack will bundle code at entry point and output into folder specified folder (default is ./dist/main.js)
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.bundle.js'
    },
    // default is 'production' mode, which will minify code automatically; in this case we do not want this feature
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
        }),
    ],
    mode: 'development'
};

