/**
 * nodejs утилита для работы c путями до файлов.
 */
const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;

const CopyPlugin = require('copy-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
/**
 * Мапа путей в проекте.
 */
const PATHS = {
  /**
   * Директория в которую будет складироваться собранные файлы.
   */
  dist: path.resolve(__dirname, 'dist'),
  /**
   * Наша рабочая директория.
   */
  src: path.resolve(__dirname, 'src'),
};

module.exports = {
  /**
   * Режим, в котором webpack будет собирать наш проект.
   */
  mode: isDev ? 'development' : 'production',

  /**
   * Входные пути, относительно которых, webpack будет собирать
   * общий файл (на самом деле группу файлов) с нашим кодом.
   */
  entry: {
    /**
     * main - просто название для webpack, которое мы дали стартовому файлу.
     * Это название будет фигурировать в итоговом файле, который соберет webpack.
     *
     * Когда webpack будет собирать нам проект, он сделает с этим массивом нечто
     * следующее:
     *
     * ```js
     * // создаст файл main.js в котором будет
     *
     * // это модуль, который будет добавлять методы: map, forEach и другие,
     * // если сам браузер их не предоставляет.
     * import '@babel/polyfill';
     *
     * // это уже модуль с нашим кодом
     * import './src/index.jsx';
     * ```
     */
    main: ['@babel/polyfill', './src/index.jsx'],
  },

  /**
   * Объект с параметрами, которые говорят webpack, куда и как класть файлы соберет.
   */
  output: {
    /**
     * так как при запущенно dev-сервере статика у нас отдаётся с
     * отдельного порта, то переконфигурируем publicPath,
     * чтобы в production-режиме manifest готовил корретные ссылки
     **/
    publicPath: isDev ? 'http://localhost:1337/' : 'http://localhost/dist/',

    /**
     * Путь до директории, куда надо класть наши файлы.
     */
    path: `${PATHS.dist}/`,

    /**
     * filename - отвечает за имя js-файлов, которые соберет webpack.
     *
     *
     * Для дева имя будет `[name].js` - то `[есть_имя_модуля.js]`.
     * Помните ключ `main` в объекте `entry`, это как раз `[name]`
     * для самого главного файла, который соберет webpack. Из него
     * затем будут исходить другие.
     *
     * Для production сборки у нас уже будет примешиваться `hash` в
     * имя файла, для того чтобы потом, когда мы загрузим нашу сборку,
     * на хостинг, какие-то файлы загрузились заново, ведь браузер не сможет
     * их найти в кеше.
     */
    filename: `${isDev ? '[name].js' : '[name].[hash].js'}`,
  },

  /**
   * Объект с настройками 'решения путей до файлов'.
   */
  resolve: {
    /**
     * Массив расширений, который говорит webpack, какие расширения
     * нужно автоматически дописывать.
     *
     * То есть если мы напишем.
     *
     * ```js
     * import MyUtil from './utils/MyUtil';
     * ```
     *
     * То webpack сначала попробует найти файл:
     * - `./utils/MyUtil.js`, затем
     * - `./utils/MyUtil.jsx`, затем
     * - `./utils/MyUtil.json`
     */
    extensions: ['.js', '.jsx', '.json'],
  },

  /**
   * Объект с настройками нашего дев-сервера (localhost), куда webpack
   * будет складывать файлы, чтобы мы могли из загрузить при разработке.
   */
  devServer: {
    /**
     * Порт, на котором будет запущен дев-сервер.
     */
    port: 1337,

    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization',
    },
  },

  /**
   * Массив плагинов, которые могу вмешиваться в процесс сборки webpack,
   * и делать что-то своё.
   */
  plugins: [
    /**
     * Плагин, который будет чистить папку `dist` каждый раз, когда будет
     * запускаться production сборка.
     */
    ...(isDev ? [] : [new CleanWebpackPlugin()]),

    new WebpackManifestPlugin({
      /**
       * скажем плагину, что файл надо создавать
       * вне зависимости от того прод или дев сборка
       **/
      writeToFileEmit: true,
    }),

    new MiniCssExtractPlugin(),

    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets/images'),
          to: path.resolve(__dirname, 'dist/assets/images'),
        },
      ],
    }),
  ],

  /**
   * Объект с настройками модулей (файлы, которые мы импортируем), с
   * которыми работает webpack.
   */
  module: {
    /**
     * Набор правил, которые говорят как именно нужно обрабатывать те,
     * или иные файлы с определенными расширениями.
     *
     * В webpack есть 2 главные сущности, это плагины и лоадеры (loaders),
     * на первый взгляд они очень похожи, и те и те как-то модифицируют файлы.
     *
     * Но, есть одна главная разница, плагин (если он работает с файлом), получает
     * себе в контроль какой-то обработанный кусок кода, который как раз был
     * обработан лоадером.
     *
     * Основная цель лоадера - загрузить (проимортировать) и изменить контент файла.
     * Основная цель плагина - сделать что-то с файлом, который был или не был
     * изменен лоадером.
     */
    rules: [
      {
        /**
         * Регулярное выражение, указывающее на имя файла, которое будет
         * обработано лоадером.
         */
        test: /\.js$/,
        /**
         * Правило, которое говорит, что импорты из node_modules, обрабатывать
         * не надо.
         */
        exclude: /node_modules/,
        /**
         * Набор лоадеров, которые обработают фалы из регулярного выражения.
         */
        use: [
          {
            /**
             * Название лоадера.
             *
             * Название - указание на название модуля в `node_modules`.
             */
            loader: 'babel-loader',
            /**
             * Объект с настройками лоадера.
             *
             * У каждого лоадера собственный набор настроек.
             */
            options: {
              /**
               * Данная настройка, указывает на какой-то пресет, набор фич,
               * которые будут как-то преобразованы таким образом, чтобы все бразеры
               * могли понять наш код.
               *
               * Фичи, которые позволит данный плагин использовать.
               * @see https://babeljs.io/docs/en/babel-plugin-transform-modules-amd
               *
               * (смотреть в левом меню)
               */
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },

      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            /**
             * То же самое правило, но для React.
             *
             * Говорит, что нужно еще использовать `@babel/preset-react` прежде
             * чем использовать `@babel/preset-env`.
             *
             * Да-да, webpack обрабатывает все в обратном порядке.
             *
             * Если мы передадим несколько лоадеров для 1 правила, то первым будет
             * задействован тот лоадер, что находится в конце.
             */
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        ],
      },

      {
        test: /\.css$/,
        use: [
          /* добавляем новый лоадер в только что добавленное правило */
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',

            options: {
              sourceMap: true,
            },
          },
          'postcss-loader',
        ],
      },
    ],
  },
};
