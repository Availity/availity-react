const themeOptions = require('@availity/gatsby-theme/theme-options');

module.exports = {
  pathPrefix: '/availity-react',
  __experimentalThemes: [
    {
      resolve: '@availity/gatsby-theme',
      options: {
        ...themeOptions,
        root: __dirname,
        subtitle: 'React Components',
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
