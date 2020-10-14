export default {
  plugins: [],
  themes: [
    [
      '@docusaurus/theme-search-algolia',
      {
        id: '01',
      },
    ],
  ],
  onBrokenLinks: 'ignore',
  title: 'Availity React Docs',
  tagline: 'React components using Availity UIKit and Bootstrap 4',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'availity',
  projectName: 'availity-react',
  themeConfig: {
    algolia: {
      apiKey: 'eec0154a008662c32d440b7de7982cd2',
      indexName: 'availity',
      appId: 'BH4D9OD16A',
    },
    announcementBar: {
      id: 'supportus',
      backgroundColor: '#e29f0d',
      textColor: 'black',
      content:
        '⭐️ If you like Availity-React, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/availity/availity-react">GitHub</a>! ⭐️',
      isCloseable: true,
    },
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
      disableSwitch: false,
      switchConfig: {
        darkIcon: '🌜',
        darkIconStyle: {},
        lightIcon: '🌞',
        lightIconStyle: {},
      },
    },
    navbar: {
      title: 'Availity-React',
      logo: {
        alt: 'Availity Logo',
        src: 'img/favicon.ico',
      },
      items: [
        {
          to: '/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {
          href:
            'https://availity.github.io/availity-react/storybook/?path=/story/components-analytics--default',
          label: 'Storybook',
          position: 'left',
        },
        {
          href: 'https://github.com/availity/availity-react',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
      hideOnScroll: false,
    },
    metadatas: [],
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          routeBasePath: '/',
          homePageId: 'intro',
          sidebarPath:
            '/Users/brobinson/Workspaces/availity-react/docusaurus/sidebars.js',
          editUrl: 'https://github.com/avaiity/availity-react/edit/master/',
        },
        theme: {
          customCss:
            '/Users/brobinson/Workspaces/availity-react/docusaurus/src/css/custom.css',
        },
      },
    ],
  ],
  onDuplicateRoutes: 'warn',
  customFields: {},
  titleDelimiter: '|',
};
