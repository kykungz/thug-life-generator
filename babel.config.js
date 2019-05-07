module.exports = function(api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          extensions: ['.ios.js', '.android.js', '.js', '.json'],
          alias: {
            antd: '@ant-design/react-native',
          },
        },
      ],
      ['import', { libraryName: '@ant-design/react-native' }],
    ],
  }
}
