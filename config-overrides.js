const {
  addWebpackAlias,
  disableEsLint,
  override
} = require('customize-cra');

const path = require('path');

module.exports = override(
  addWebpackAlias({
    ['components']: path.resolve(__dirname, 'src/components'),
    ['hooks']: path.resolve(__dirname, 'src/hooks'),
    ['lib']: path.resolve(__dirname, 'src/lib'),
    ['pages']: path.resolve(__dirname, 'src/pages'),
    ['routes']: path.resolve(__dirname, 'src/routes'),
    ['services']: path.resolve(__dirname, 'src/services')
  }),
  // MUTE THE WARNINGS.
  disableEsLint()
);