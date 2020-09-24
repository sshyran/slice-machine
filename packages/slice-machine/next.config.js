const path = require('path')
const withCustomBabelConfigFile = require('next-plugin-custom-babel-config');

console.log(__dirname, path.resolve(path.join(__dirname, 'node_modules', 'react')))

module.exports = withCustomBabelConfigFile({
  babelConfigFile: path.resolve("./babel.config.js"),
  env: {
    TEST_PROJECT_PATH: './tests/project'
  },
  webpack: (config, {
    isServer
  }) => {
    if (!isServer) {
      config.node = {
        fs: 'empty'
      }
    }
    config.resolve.alias.react = path.join(process.env.CWD, 'node_modules', 'react')
    config.resolve.alias['react-dom'] = path.join(process.env.CWD, "node_modules", 'react-dom');
    config.resolve.alias['src'] = path.join(__dirname, 'src')
    config.resolve.alias['lib'] = path.join(__dirname, 'lib')
    config.resolve.alias['components'] = path.join(__dirname, 'components')

    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: ['@svgr/webpack'],
    });

    return config
  }
});