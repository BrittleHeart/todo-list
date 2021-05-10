const { resolve } = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: resolve('./server.ts'),
  target: 'node',
  output: {
    filename: 'server.js',
    path: resolve('./dist')
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [resolve(__dirname)],
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['ts-loader'],
        exclude: /node_modules/,
      }
    ]
  }
}