// webpack.build.js is not strictly necessary, but will allow us to add specifications for the webpack build.
const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = {
    // assigns entrypoints; root of bundle and beginning of dependency graph (default is ./src/index.js)
    entry: {
        app: './assets/js/script.js',
        events: './assets/js/events.js',
        schedule: './assets/js/schedule.js',
        tickets: './assets/js/tickets.js',
    },
    // webpack will bundle code at each entry point and output to folder of sameName.bundle in /dist (default is ./dist/main.js)
    output: {
        filename: '[name].bundle.js',
        path: __dirname + '/dist',
    },
    module: {
        // this object will id the type of files to pre-process using 'test' property, for example, this rule could be expanded to search for other types of image files, in addition to .jpg
        rules: [
            {
                test: /\.jpg$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name (file) {
                                return '[path][name].[ext]'
                            },
                            publicPath: function(url) {
                                return url.replace('../', '/assets/')
                            }
                        }
                    },
                    {
                        loader: 'image-webpack-loader'
                    }
                ]
            }
        ]
    },
    // default is 'production' mode, which will minify code automatically; in this case we do not want this feature
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
        }),
        // outputs an HTML file 'report.html' that will generate in the dist folder; if set to 'disable' rather than 'static', will stop the reporting and openin of this report in the browser
        new BundleAnalyzerPlugin({
            analyzerMode: "static",
        })
    ],
    mode: 'development'
};

