const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
(module.exports = {
  title: 'Dragon Dungeon',
  tagline: 'It\'s a game. With dragons. And dungeons. Sort of.',
  url: 'https://dragondungeon.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/icon.png',
  organizationName: 'jointheleague',
  projectName: 'dragondungeon',

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Dragon Dungeon',
        logo: {
          alt: 'Coin',
          src: 'img/icon.png',
        },
        items: [
          {
            to: '/about',
            label: 'About',
            position: 'left'
          },
          {
            type: 'doc',
            docId: 'tutorial/basics',
            position: 'left',
            label: 'Help',
          },
          {
            to: '/blog',
            label: 'Blog',
            position: 'left'
          },
          {
            href: 'https://reddit.com/r/dragondungeon',
            position: 'left',
            label: 'Community',
          },
          {
            to: '/play',
            label: 'Play Now',
            position: 'right'
          },
          {
            to: '/account',
            label: 'Account',
            position: 'right'
          },
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            title: 'Help',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/tutorial',
              },
              {
                label: 'Error Codes',
                to: '/docs/troubleshooting',
              },
              {
                label: 'Development',
                to: '/docs/development',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Reddit',
                href: 'https://reddit.com/r/dragondungeon',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/dragondungeonio',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/jointheleague/dragondungeon',
              },
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} The LEAGUE of Amazing Programmers`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
});
