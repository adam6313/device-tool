const path = require('path')

module.exports = {
   devtool: 'inline-source-map',
   entry: './src/index.ts',
   output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'device-tool',
    libraryTarget: 'umd'
   },
   module:  {
    rules: [
      {
        test: /\.ts$/,
        loader: ['babel-loader', 'ts-loader'],
        exclude: ['node_modules', 'dist']
      }
    ]
   }
}