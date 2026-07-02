import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js, so don't use client-side code here (browser APIs, JSX).

const config: Config = {
  title: 'abapctl',
  tagline: 'The ABAP engine for AI agents.',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  // Published to GitHub Pages at the org's user/organization site.
  url: 'https://abapctl.github.io',
  baseUrl: '/',

  organizationName: 'abapctl',
  projectName: 'abapctl.github.io',
  deploymentBranch: 'gh-pages',
  // Default (undefined) emits both /path and /path/ forms, so a visitor who
  // types a trailing slash never hits a 404 on GitHub Pages.
  trailingSlash: undefined,

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  headTags: [
    {
      tagName: 'link',
      attributes: {rel: 'icon', type: 'image/svg+xml', href: 'img/favicon.svg'},
    },
    {
      tagName: 'link',
      attributes: {rel: 'apple-touch-icon', href: 'img/apple-touch-icon.png'},
    },
    {
      tagName: 'link',
      attributes: {rel: 'preconnect', href: 'https://fonts.googleapis.com'},
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'anonymous',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap',
      },
    },
    // Structured data: describe the software so search engines can build
    // rich results and a sitelinks search box.
    {
      tagName: 'script',
      attributes: {type: 'application/ld+json'},
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'abapctl',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Linux, macOS, Windows',
        description:
          'A standalone CLI for SAP ABAP Development Tools (ADT). Read, navigate, refactor, and write ABAP; run ATC and unit checks; manage transports; assess and remediate toward Clean Core; query OData runtime services. Headless, JSON-first, and built for AI agents.',
        url: 'https://abapctl.github.io',
        license: 'https://opensource.org/license/mit-0',
        offers: {'@type': 'Offer', price: '0', priceCurrency: 'USD'},
      }),
    },
    {
      tagName: 'script',
      attributes: {type: 'application/ld+json'},
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'abapctl',
        url: 'https://abapctl.github.io',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://abapctl.github.io/search?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      }),
    },
  ],

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/docs',
          editUrl:
            'https://github.com/abapctl/abapctl.github.io/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          createSitemapItems: async (params) => {
            const {defaultCreateSitemapItems, ...rest} = params;
            const items = await defaultCreateSitemapItems(rest);
            const base = 'https://abapctl.github.io';
            return items
              // The local-search page has no indexable content; keep it out.
              .filter((item) => !item.url.replace(base, '').startsWith('/search'))
              .map((item) => {
                const path = item.url.replace(base, '') || '/';
                if (path === '/') return {...item, priority: 1.0};
                if (path.startsWith('/docs/getting-started'))
                  return {...item, priority: 0.8};
                if (path.startsWith('/docs')) return {...item, priority: 0.7};
                return item;
              });
          },
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      // Keep the old /docs/workshop* URLs working after the section was
      // renamed to /docs/use-cases.
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {from: '/docs/workshop', to: '/docs/use-cases'},
          {from: '/docs/workshop/use-case-readiness', to: '/docs/use-cases/readiness'},
          {from: '/docs/workshop/use-case-clean-core', to: '/docs/use-cases/clean-core'},
          {from: '/docs/workshop/use-case-tdd', to: '/docs/use-cases/tdd'},
          {from: '/docs/workshop/going-further', to: '/docs/use-cases/going-further'},
        ],
      },
    ],
  ],

  themes: [
    [
      // Offline/local full-text search. No Algolia account needed, so it
      // works on GitHub Pages out of the box.
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        indexDocs: true,
        indexBlog: false,
        indexPages: true,
        docsRouteBasePath: '/docs',
        highlightSearchTermsOnTargetPage: true,
        searchResultLimits: 8,
      },
    ],
  ],

  themeConfig: {
    image: 'img/social-card.png',
    metadata: [
      {
        name: 'description',
        content:
          'abapctl is a standalone CLI for SAP ADT: read, navigate, refactor, and write ABAP; run ATC and unit checks; manage transports; assess Clean Core; query OData. Headless, JSON-first, agent-ready.',
      },
      {name: 'keywords', content: 'SAP, ABAP, ADT, ATC, Clean Core, CLI, OData, RAP, agentic AI, AI agents'},
    ],
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'abapctl',
      logo: {
        alt: 'abapctl logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {to: '/docs/command-reference', label: 'Commands', position: 'left'},
        {to: '/docs/use-cases', label: 'Use Cases', position: 'left'},
        {
          href: 'https://github.com/aws-for-sap/Automate-SAP-development-workflows-using-ABAP-CTL',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      // The nav links all live in the top bar, so the footer stays minimal:
      // one line naming the project, where to get it, and the doc tooling.
      copyright: `<a href="https://github.com/aws-for-sap/Automate-SAP-development-workflows-using-ABAP-CTL">abapctl</a>, an agent-ready CLI for SAP ABAP.`,
    },
    prism: {
      theme: prismThemes.oneLight,
      darkTheme: prismThemes.oneDark,
      additionalLanguages: ['bash', 'json', 'abap', 'sql', 'powershell'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
