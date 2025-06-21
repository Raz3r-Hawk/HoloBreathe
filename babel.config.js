module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@': './src',
            '@components': './src/components',
            '@screens': './src/screens',
            '@contexts': './src/contexts',
            '@services': './src/services',
            '@types': './src/types',
            '@data': './src/data',
            '@theme': './src/theme',
            '@config': './src/config',
          },
        },
      ],
    ],
  };
};