const { CracoAliasPlugin } = require('react-app-alias');
const FontPreloadPlugin = require('webpack-font-preload-plugin');

module.exports = {
  plugins: [
    {
      plugin: CracoAliasPlugin,
      options: {
        source: 'tsconfig',
        tsConfigPath: 'tsconfig.paths.json',
      },
    },
  ],
  webpack: {
    plugins: {
      add: [new FontPreloadPlugin({ extensions: ['woff2'] })],
    },
  },
};
