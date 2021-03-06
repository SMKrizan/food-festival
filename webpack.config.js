// webpack.build.js is not strictly necessary, but will allow us to add specifications for the webpack build.
const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const WebpackPwaManifest = require('webpack-pwa-manifest');

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
                test: /\.(jpg|png)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name (file) {
                                return "[path][name].[ext]"
                            },
                            publicPath: function(url) {
                                return url.replace('../', 'assets/')
                            },
                            esModule: false
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
        }),
        // invokes constructor function to instantiate manifest, providing an object as argument
        new WebpackPwaManifest({
            name: "Food Event",
            short_name: "Foodies",
            description: "An app that allows you to view upcoming food events.",
            // specifies homepage for pwa relative to location of manifest file
            start_url: "../index.html",
            background_color: "#01579b",
            theme_color: "#ffffff",
            // the following two specifications are specific to the webpack manifest plugin:
            // 'fingerprints' generates unique id of sorts each time a manifest is generated(not needed)
            fingerprints: false,
            // 'inject' determines whether link to manifest.json is added to the html; since we are not using fingerprints, we will not use this, either.
            inject: false,
            publicPath: './',
            icons: [{
                src: path.resolve("assets/img/icons/icon-512x512.png"),
                sizes: [96, 128, 192, 256, 384, 512],
                destination: path.join("assets", "icons")   
            }]
        })
    ],
    mode: 'development'
};

