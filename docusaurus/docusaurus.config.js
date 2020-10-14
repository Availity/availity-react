module.exports = {
  plugins: [
    // 'docusaurus-plugin-sass',
    // ['sass-plugin', { id: 'plugin-2' }],
    // 'url-plugin',
  ],
  themes: [['@docusaurus/theme-search-algolia', { id: '01' }]],
  onBrokenLinks: 'log',
  title: 'Availity React Docs',
  tagline: 'React components using Availity UIKit and Bootstrap 4',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'availity', // Usually your GitHub org/user name.
  projectName: 'availity-react', // Usually your repo name.
  themeConfig: {
    algolia: {
      apiKey: 'eec0154a008662c32d440b7de7982cd2',
      indexName: 'availity',
    },
    announcementBar: {
      id: 'supportus',
      backgroundColor: 'orange',
      textColor: 'black',
      content:
        '⭐️ If you like Availity-React, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/availity/availity-react">GitHub</a>! ⭐️',
    },
    colorMode: { defaultMode: 'dark', respectPrefersColorScheme: true },

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
            'https://availity.github.io/availity-react/storybook/?path=/story/components-analytics--default', // The target URL (string).
          label: 'Storybook',
          position: 'left',
        },
        // { to: 'blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/availity/availity-react',
          label: 'GitHub',
          position: 'right',
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
          // homePageId: 'intro',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/avaiity/availity-react/edit/master/',
        },

        theme: {
          //   customCss: require.resolve('./src/theme/ReactLiveScope/index.scss'),
        },
      },
    ],
  ],
};
