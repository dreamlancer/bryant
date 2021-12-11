const path = require('path');

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    author: 'Kappa London',
    siteTitle: 'Bryant Dental: Loupes & Headlights',
    keywords:
      'bryant dental, dental loupes, dental loupes 2019, dental loupes 2018, student dental loupes, surgical loupes, loupes, dental head light, best dental loupes, medical loupes, dental hygiene loupes',
    image: 'https://chanappr.sirv.com/Bryant-dental/seo/Ignis_2.jpg',
    imageType: 'image/jpg',
    logo: 'https://chanappr.sirv.com/Bryant-dental/global/logo-2.png',
    siteTitleShort: 'Bryant Dental',
    siteDescription:
      "The world's lightest dental loupes; full arch even at 5x magnification. Innovative 3D scanning to render 32 million unique facial reference points to craft truly bespoke loupes. Get in touch with us to arrange a loupes demo anywhere in the UK or rest of the world.", // eslint-disable-line
    siteUrl: 'https://bryant.dental',
  },
  plugins: [
    '@razvan-soare/gatsby-plugin-react-helmet',
    'gatsby-plugin-eslint',
    'gatsby-plugin-layout',
    'gatsby-plugin-sass',
    'gatsby-plugin-sharp',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-webpack-size',
    'gatsby-transformer-json',
    'gatsby-transformer-remark',
    'gatsby-transformer-sharp',
    'gatsby-plugin-remove-serviceworker',
    // 'gatsby-plugin-offline',
    // {
    //   resolve: 'gatsby-plugin-offline',
    //   options: {
    //     runtimeCaching: [
    //       {
    //         // Use cacheFirst since these don't need to be revalidated (same RegExp
    //         // and same reason as above)
    //         urlPattern: /(\.js$|\.css$|\/static\/)/,
    //         handler: 'cacheFirst',
    //       },
    //     ],
    //   },
    // },
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: 'https://bryant.dental',
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /images/,
        },
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: path.join(__dirname, 'static', 'images'),
      },
    },
    {
      resolve: 'gatsby-plugin-intercom',
      options: {
        appId: process.env.INTERCOM,
        custom_launcher_selector: '#intercom-window',
        vertical_padding: 40,
      },
    },
    // ANALYTICS
    {
      resolve: 'gatsby-plugin-fullstory',
      options: {
        fs_org: process.env.FULLSTORY,
      },
    },
    {
      resolve: 'gatsby-plugin-heap',
      options: {
        appId: process.env.HEAP,
        enableOnDevMode: false,
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS,
        // Puts tracking script in the head instead of the body
        head: true,
        anonymize: true,
        respectDNT: true,
      },
    },
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: process.env.GOOGLE_TAGMANAGER,
        includeInDevelopment: false,
      },
    },
  ],
};
