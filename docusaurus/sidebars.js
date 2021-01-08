module.exports = {
  someSidebar: {
    'React Docs': [
      'intro',
      'contributing',
      // {
      //   type: 'link',
      //   label: 'Storybook', // The label that should be displayed (string).
      //   href:
      //     'https://availity.github.io/availity-react/storybook/?path=/story/components-analytics--default', // The target URL (string).
      // },

      {
        type: 'category',
        label: 'Components',
        items: [
          {
            type: 'category',
            label: 'Analytics',
            items: [
              'components/analytics/index',
              'components/analytics/analytics',
              'components/analytics/hook',
            ],
          },
          'components/app-icon',

          'components/authorize',
          'components/avatar',
          'components/breadcrumbs',
          {
            type: 'category',
            label: 'Favorites',
            items: [
              'components/favorites/index',
              'components/favorites/favorites',
              'components/favorites/heart',
              'components/favorites/hook',
            ],
          },
          'components/feature',
          {
            type: 'category',
            label: 'Feedback',
            items: [
              'components/feedback/index',
              'components/feedback/feedback',
              'components/feedback/form',
            ],
          },
          'components/help',
          {
            type: 'category',
            label: 'Hooks',
            items: [
              'components/hooks/use-current-user',
              'components/hooks/use-effect-async',
              'components/hooks/use-mount',
              'components/hooks/use-region',
              'components/hooks/use-timeout',
              'components/hooks/use-toggle',
              'components/hooks/use-permissions',
              'components/hooks/use-organizations',
              'components/hooks/use-providers',
            ],
          },
          'components/icon',
          'components/link',
          'components/list-group',
          {
            type: 'category',
            label: 'List Group Item',
            items: [
              'components/list-group-item/index',
              'components/list-group-item/list-group-item',
              'components/list-group-item/list-group-item-status',
            ],
          },

          'components/page-header',

          {
            type: 'category',
            label: 'Pagination',
            items: [
              'components/pagination/index',
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
            type: 'category',
            label: 'Spaces',
            items: [
              'components/spaces/index',
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
          {
            type: 'category',
            label: 'Step Wizard',
            items: [
              'components/step-wizard/index',
              'components/step-wizard/wizard',
              'components/step-wizard/wizard-step',
            ],
          },
          'components/training-link',

          {
            type: 'category',
            label: 'Typography',
            items: [
              'components/typography/index',
              'components/typography/disclaimer',
              'components/typography/agreement',
            ],
          },
        ],
      },
      {
        type: 'category',
        label: 'Form Components',
        items: [
          'form/index',
          'form/migrating',

          'form/components/checkbox-group',
          'form/components/checkbox',
          'form/components/feedback',
          'form/components/field',
          'form/components/form-group',
          'form/components/form',
          'form/components/input',
          'form/components/radio-group',
          'form/components/radio',
          {
            type: 'category',
            label: 'Date',
            items: [
              'form/date/index',
              'form/date/components/date-field',
              'form/date/components/date-range-field',
              'form/date/components/date-range',
              'form/date/components/date',
            ],
          },
          {
            type: 'category',
            label: 'Phone',
            items: [
              'form/phone/index',
              'form/phone/components/phone',
              'form/phone/components/validate-phone',
            ],
          },
          {
            type: 'category',
            label: 'Select',
            items: [
              'form/select/index',
              'form/select/components/select',
              'form/select/components/select-field',
              'form/select/components/resource-select',
              'form/select/components/region-select',
              'form/select/components/organization-select',
            ],
          },
          {
            type: 'category',
            label: 'Upload',
            items: [
              'form/upload/index',
              'form/upload/upload',
              'form/upload/file-picker',
              'form/upload/file-picker-btn',
              'form/upload/upload-progress-bar',
            ],
          },
        ],
      },
    ],
  },
};
