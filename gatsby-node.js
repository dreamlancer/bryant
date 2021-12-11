const path = require('path');
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  try {
    if (stage === 'build-html') {
      actions.setWebpackConfig({
        module: {
          rules: [
            {
              test: /scrollingelement/,
              use: loaders.null(),
            },
            {
              test: /@typeform/,
              use: loaders.null(),
            },
            {
              test: /react-simple-zoom/,
              use: loaders.null(),
            },
            {
              test: /smoothscroll-polyfill/,
              use: loaders.null(),
            },
          ],
        },
      });
    }
  } catch (err) {
    console.log(err);
  }
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      plugins: [new DirectoryNamedWebpackPlugin()],
    },
  });
};

// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;

  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/bryant-store/)) {
    page.matchPath = '/bryant-store/*';

    // Update the page.
    createPage(page);
  }
};
