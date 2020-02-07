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
        contentDir: 'docs/source',
        description: 'Documentation for React Components',
        gitRepo: 'availity/availity-react',
        sidebarCategories: {
          null: [
            'index',
            {
              resolve: '[Storybook](/storybook)',
              isRelative: false,
              withPrefix: true,
            },
            'contributing',
          ],
          'form/index': [
            'form/migrating',
            {
              resolve: 'form/components/index',
              pages: [
                'form/components/form',
                'form/components/input',
                'form/components/form-group',
                'form/components/feedback',
                'form/components/field',
                'form/components/checkbox-group',
                'form/components/checkbox',
                'form/components/radio-group',
                'form/components/radio',
              ],
            },
            {
              resolve: 'form/date/index',
              pages: [
                'form/date/components/date',
                'form/date/components/date-field',
                'form/date/components/date-range',
                'form/date/components/date-range-field',
              ],
            },
            {
              resolve: 'form/select/index',
              pages: [
                'form/select/components/select',
                'form/select/components/select-field',
                'form/select/components/resource-select',
                'form/select/components/region-select',
              ],
            },
            {
              resolve: 'form/upload/index',
              pages: [
                'form/upload/upload',
                'form/upload/file-picker',
                'form/upload/file-picker-btn',
                'form/upload/upload-progress-bar',
              ],
            },
          ],
          'Portal Components': [
            {
              resolve: 'components/analytics/index',
              pages: [
                'components/analytics/analytics',
                'components/analytics/hook',
              ],
            },
            'components/authorize',
            'components/avatar',
            {
              resolve: 'components/favorites/index',
              pages: [
                'components/favorites/favorites',
                'components/favorites/heart',
                'components/favorites/hook',
              ],
            },
            'components/feature',
            {
              resolve: 'components/feedback/index',
              pages: [
                'components/feedback/feedback',
                'components/feedback/form',
              ],
            },
            'components/link',
            'components/page-header',
            {
              resolve: 'components/spaces/index',
              pages: [
                'components/spaces/spaces',
                'components/spaces/use-spaces',
                'components/spaces/use-spaces-context',
                'components/spaces/context',
                'components/spaces/images',
                'components/spaces/disclaimer',
                'components/spaces/agreement',
                'components/spaces/ghost-text',
              ],
            },
            'components/training-link',
          ],
          'UI Kit Components': [
            'components/app-icon',
            'components/breadcrumbs',
            'components/icon',
            'components/list-group',
            {
              resolve: 'components/list-group-item/index',
              pages: [
                'components/list-group-item/list-group-item',
                'components/list-group-item/list-group-item-status',
              ],
            },
            {
              resolve: 'components/hooks/index',
              pages: [
                'components/hooks/use-current-user',
                'components/hooks/use-effect-async',
                'components/hooks/use-mount',
                'components/hooks/use-region',
                'components/hooks/use-timeout',
                'components/hooks/use-toggle',
              ],
            },
            {
              resolve: 'components/pagination/index',
              pages: [
                'components/pagination/pagination',
                'components/pagination/controls',
                'components/pagination/content',
                'components/pagination/resource',
                'components/pagination/hook',
                'components/pagination/context',
              ],
            },
            'components/progress',
            {
              resolve: 'components/step-wizard/index',
              pages: [
                'components/step-wizard/wizard',
                'components/step-wizard/wizard-step',
              ],
            },
            {
              resolve: 'components/typography/index',
              pages: [
                'components/typography/disclaimer',
                'components/typography/agreement',
              ],
            },
          ],
        },
      },
    },
  ],
};
