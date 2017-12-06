const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    './app/app.js',
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    modules: [
      path.resolve('./app'),
      path.resolve('./node_modules')
    ],
  },
  module: {
    loaders: [
      { test: /\.json/, loader: 'json' },
      { test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          plugins: [
            'transform-runtime', 
            "transform-decorators-legacy", 
            ["transform-imports", {
                  "react-bootstrap": {
                      "transform": "react-bootstrap/lib/${member}",
                      "preventFullImport": true
                  }
              }]
          ],
          presets: ['es2015', 'stage-0', 'react']
        }
      },
      { test: /\.png$/, loader: 'file' },
      { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, loader: 'file'},
      {
        test: /\.css$/,
        loaders: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
};