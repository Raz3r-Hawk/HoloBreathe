const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add support for TypeScript and other file types
config.resolver.sourceExts.push('tsx', 'ts', 'jsx', 'js', 'json');

// Enable symlinks
config.resolver.symlinks = true;

// Add transformer for TypeScript
config.transformer.babelTransformerPath = require.resolve('react-native-typescript-transformer');

module.exports = config;