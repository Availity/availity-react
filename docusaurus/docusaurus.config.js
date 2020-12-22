module.exports = {
  plugins: [],
  themes: [['@docusaurus/theme-search-algolia', { id: '01' }]], // FIXME: duplicate search routes being created
  onBrokenLinks: 'log',
  title: 'Availity React Docs',
  tagline: 'React components using Availity UIKit and Bootstrap 4',
  url: 'https://availity.github.io/availity-react',
  baseUrl: '/availity-react/',
  favicon: 'img/favicon.ico',
  organizationName: 'availity', // Usually your GitHub org/user name.
  projectName: 'availity-react', // Usually your repo name.
  themeConfig: {
    algolia: {
      apiKey: 'eec0154a008662c32d440b7de7982cd2',
      indexName: 'availity',
    },
    // announcementBar: {
    //   id: 'supportus',
    //   backgroundColor: '#e29f0d',
    //   textColor: 'black',
    //   content:
    //     '⭐️ If you like Availity-React, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/availity/availity-react">GitHub</a>! ⭐️',
    // },
    colorMode: { defaultMode: 'dark' },

    navbar: {
      title: 'Availity Docs',
      // hideOnScroll: true,
      logo: {
        alt: 'Availity Docs Logo',
        src: 'img/icon.png',
        href: '..', // availity.github.io
      },
      items: [
        {
          // to:
          //   'https://deploy-preview-571--condescending-leavitt-66e607.netlify.app/', // The target URL (string).
          to: '../availity-react', // availity.github.io/availity-react, this repo
          label: 'React',
          position: 'right',
        },
        {
          to: '../sdk-js/', // availity.github.io/sdk-js
          label: 'SDK-JS',
          position: 'right',
        },
        {
          to: '../availity-workflow/', // availity.github.io/availity-workflow
          label: 'Workflow',
          position: 'right',
        },
        {
          href: 'https://github.com/availity/availity-react',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          // It is recommended to set document id as docs home page (`docs/` path).
          routeBasePath: '/',

          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/availity/availity-react/edit/feat/docusaurus-docs/docusaurus/',
        },

        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
