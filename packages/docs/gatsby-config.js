const themeOptions = require('@availity/gatsby-theme-docs/theme-options');

module.exports = {
  pathPrefix: '/availity-react',
  plugins: [
    {
      // For compling `availity-react` modules
      resolve: `gatsby-plugin-compile-es6-packages`,
      options: {
        modules: ['@availity/message-core'],
      },
    },
  ],
  __experimentalThemes: [
    {
      resolve: '@availity/gatsby-theme-docs',
      options: {
        ...themeOptions,
        root: __dirname,
        subtitle: 'React Components',
        contentDir: 'packages/docs/source',
        description: 'Documentation for React Components',
        githubRepo: 'availity/availity-react',
        sidebarCategories: {
          null: ['index', 'contributing'],
          Components: [
            'components/app-icon',
            'components/authorize',
            'components/avatar',
            'components/breadcrumbs',
            'components/date',
            'components/favorites',
            'components/feature',
            'components/feedback',
            'components/form',
            'components/hooks',
            'components/icon',
            'components/link',
            'components/list-group',
            'components/list-group-item',
            'components/page-header',
            'components/pagination',
            'components/progress',
            'components/select',
            'components/spaces',
            'components/step-wizard',
            'components/training-link',
            'components/typography',
            'components/upload',
          ],
        },
      },
    },
  ],
};
