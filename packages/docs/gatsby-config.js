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
          'Reactstrap Forms': ['form/form', 'form/date', 'form/select'],
          'Portal Components': [
            'components/authorize',
            'components/avatar',
            'components/favorites',
            'components/feature',
            'components/feedback',
            'components/link',
            'components/page-header',
            'components/spaces',
            'components/training-link',
            'components/upload',
          ],
          'UI Kit Components': [
            'components/app-icon',
            'components/breadcrumbs',
            'components/icon',
            'components/list-group',
            'components/list-group-item',
            'components/hooks',
            'components/pagination',
            'components/progress',
            'components/step-wizard',
            'components/typography',
          ],
        },
      },
    },
  ],
};
