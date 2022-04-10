const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const IncludeWebpackPlugin = require('include-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const args = process.argv.slice(2);
const devMode = args.indexOf('--env') < 0 ? true : /^dev/.test(args[args.indexOf('--env') + 1]);

const htmlPage = (title, filename, chunks) => new HtmlWebpackPlugin({
  title: title,
  filename: filename,
  template: path.resolve(__dirname, './src/template.html'),
  inject: true,
  chunks: chunks,
  // 压缩HTML
  minify: {
    // 移除注释
    removeComments: true,
    // 删除空白符和换行符
    collapseWhitespace: true
  }
});

module.exports = {
  mode: devMode ? 'development' : 'production',
  entry: {
    'background': path.resolve(__dirname, './src/background'),
    'content': path.resolve(__dirname, './src/content'),
    'inject': path.resolve(__dirname, './src/inject'),
    'popup': path.resolve(__dirname, './src/popup'),
    'options': path.resolve(__dirname, './src/options'),
  },
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name].[chunkhash:8].js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.json', '.css'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader',
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader', 'postcss-loader']

    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      type: 'asset',
      generator: {
        filename: 'images/[name].[hash:7][ext]'
      }
    },
    {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      type: 'asset/resource',
      generator: {
        filename: 'media/[name].[hash:7][ext]'
      }
    },
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      type: 'asset',
      generator: {
        // filename: 'fonts/[name].[hash:7][ext]'
        filename: 'fonts/[name][ext]'
      }
    }, {
      test: /(manifest\.json|help\.tpl)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: IncludeWebpackPlugin.loader,
          options: {
            compress: false,
            decoding: 'UTF-8',
            encoding: 'base64',
            variables: {
              plugin: {
                name: "ChromeTools",
                title: "Chrome Tools"
              }
            }
          }
        }
      ],
    }]
  },
  optimization: {
    minimize: false,
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vue: {
          test: /[\\/]node_modules[\\/]vue/,
          name: 'vue-vendors',
          chunks: 'all',
          priority: -10
        },
        element: {
          test: /[\\/]node_modules[\\/]element/,
          name: 'element-vendors',
          chunks: 'all',
          priority: -10
        },
        default: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          minChunks: 2,
          priority: -20
        },
      },
    },
  },
  plugins: [
    new IncludeWebpackPlugin({
      'manifest.json': path.resolve(__dirname, 'src/manifest.json'),
      'constants.js': path.resolve(__dirname, 'src/constants.js?full=false'),
    }, {
      encoding: 'UTF-8',
      variable: true
    }),
    new VueLoaderPlugin(),
    htmlPage("popup", "pages/popup.html", ['popup']),
    htmlPage("options", "pages/options.html", ['options']),
  ]
}