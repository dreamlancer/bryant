import React from 'react';
import PropTypes from 'prop-types';
import Helmet from '@razvan-soare/react-helmet';

import { StaticQuery, graphql } from 'gatsby';

import { MOBILE_NUMBER } from '../../constants/phoneNumbers';

function Seo({
  children,
  description,
  image,
  keywords,
  lang,
  meta,
  imageType,
  title,
  url,
  homepage,
}) {
  return (
    <StaticQuery
      query={detailsQuery}
      render={data => {
        const metaDescription =
          description || data.site.siteMetadata.siteDescription;
        const metaKeywords = keywords || data.site.siteMetadata.keywords;
        const metaImage = image || data.site.siteMetadata.image;
        const metaImageType = imageType || data.site.siteMetadata.imageType;
        const metaUrl = url
          ? `${data.site.siteMetadata.siteUrl}/${url}`
          : data.site.siteMetadata.siteUrl;
        const titleTemplate = `%s | ${data.site.siteMetadata.siteTitle}`;
        return (
          <Helmet
            htmlAttributes={{
              lang,
            }}
            title={title}
            titleTemplate={homepage ? title : titleTemplate}
            meta={[
              // General
              {
                name: 'ahrefs-site-verification',
                content:
                  '94790d6e7524cfb10f7718d5d384cb4d1a462db65fd270623422676d5363aa6c',
              },
              {
                name: 'p:domain_verify',
                content: '31e42706def673a92ddcb5a68e36b8ca',
              },
              {
                name: 'application-name',
                content: data.site.siteMetadata.siteTitleShort,
              },
              {
                name: 'author',
                content: data.site.siteMetadata.author,
              },
              {
                name: 'description',
                content: metaDescription,
              },
              {
                name: 'thumbnailUrl',
                content: metaImage,
              },
              {
                name: 'image',
                content: metaImage,
              },
              {
                name: 'keywords',
                content: metaKeywords,
              },

              // Facebook

              {
                property: 'og:title',
                content: `${title} | ${data.site.siteMetadata.siteTitle}`,
              },
              {
                property: 'og:description',
                content: metaDescription,
              },
              {
                property: 'og:type',
                content: 'website',
              },
              {
                property: 'og:url',
                content: metaUrl,
              },
              {
                property: 'og:site_name',
                content: data.site.siteMetadata.siteTitleShort,
              },
              {
                property: 'og:image',
                content: metaImage,
              },
              {
                property: 'og:image:secure_url',
                content: metaImage,
              },
              {
                property: 'og:image:height',
                content: '1000',
              },
              {
                property: 'og:image:width',
                content: '1500',
              },
              {
                property: 'og:image:type',
                content: metaImageType || 'jpg',
              },
              {
                property: 'og:image:alt',
                content: 'Custom made dental loupes and headlight made in UK',
              },
              {
                property: 'og:locale',
                content: 'en_UK',
              },

              // Twitter

              {
                name: 'twitter:card',
                content: 'summary',
              },
              {
                name: 'twitter:creator',
                content: data.site.siteMetadata.author,
              },
              {
                name: 'twitter:title',
                content: `${title} | ${data.site.siteMetadata.siteTitle}`,
              },
              {
                name: 'twitter:description',
                content: metaDescription,
              },
              {
                name: 'twitter:image',
                content: metaImage,
              },
              {
                name: 'twitter:url',
                content: metaUrl,
              },
            ].concat(meta)}
          >
            <script type="application/ld+json">
              {`
                {
                  "@context": "http://www.schema.org",
                  "@type": "LocalBusiness",
                  "name": "${data.site.siteMetadata.siteTitle}",
                  "url": "${data.site.siteMetadata.siteUrl}",
                  "logo": "${data.site.siteMetadata.logo}",
                  "telephone": "${MOBILE_NUMBER}",
                  "image": "${data.site.siteMetadata.image}",
                  "description": "${data.site.siteMetadata.siteDescription}",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Kemp House, 160 City Road",
                    "addressLocality": "London",
                    "addressRegion": "London",
                    "postalCode": "EC1V 2NX",
                    "addressCountry": "United Kingdom"
                  },
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": "51.2885948",
                    "longitude": "-0.3548765"
                  },
                  "hasMap": "https://www.google.co.in/maps/place/Bryant+Dental/@51.2885948,-0.3548765,17z/data=!4m8!1m2!2m1!1sbryant+dental!3m4!1s0x4876035c6e0b9d5f:0xc6acd4e1440e1939!8m2!3d51.2887781!4d-0.3522828",
                  "openingHours": "Mo 08:00-22:00, Tu 08:00-22:00, We 08:00-22:00, Th 08:00-22:00, Fr 08:00-22:00, Sa 08:00-22:00, Su 08:00-22:00",
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "${MOBILE_NUMBER}",
                    "contactType": "Customer Care"
                  }
                }
              `}
            </script>
            <script type="application/ld+json">
              {`
                {
                  "@context" : "http://schema.org",
                  "@type" : "Organization",
                  "name" : "${data.site.siteMetadata.siteTitle}",
                  "url" : "${data.site.siteMetadata.siteUrl}",
                  "logo" : "${data.site.siteMetadata.logo}",
                  "sameAs" : [
                    "https://www.facebook.com/BryantDentalOfficial",
                    "https://twitter.com/Bryant_Dental",
                    "https://www.instagram.com/bryantdental/"
                  ],
                  "contactPoint" : [{
                    "@type" : "ContactPoint",
                    "telephone" : "${MOBILE_NUMBER}",
                    "contactType" : "customer service"
                  }]
                }
              `}
            </script>

            <script type="text/javascript">
              {`
              (function(e,t,o,n,p,r,i){e.visitorGlobalObjectAlias=n;e[e.visitorGlobalObjectAlias]=e[e.visitorGlobalObjectAlias]||function(){(e[e.visitorGlobalObjectAlias].q=e[e.visitorGlobalObjectAlias].q||[]).push(arguments)};e[e.visitorGlobalObjectAlias].l=(new Date).getTime();r=t.createElement("script");r.src=o;r.async=true;i=t.getElementsByTagName("script")[0];i.parentNode.insertBefore(r,i)})(window,document,"https://diffuser-cdn.app-us1.com/diffuser/diffuser.js","vgo");
              vgo('setAccount', '66198962');
              vgo('setTrackByDefault', true);

              vgo('process');
              `}
            </script>

            {/* <!-- Facebook Pixel Code --> */}
            <script>
              {`
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window,document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '1001331109962666'); 
                fbq('track', 'PageView');
              `}
            </script>

            <noscript>
              {`
                <img
                  height="1"
                  width="1"
                  src="https://www.facebook.com/tr?id=1001331109962666&ev=PageView&noscript=1"
                />
              `}
            </noscript>

            {/* <!-- End Facebook Pixel Code --> */}

            {children}
          </Helmet>
        );
      }}
    />
  );
}

Seo.defaultProps = {
  description: null,
  keywords: null,
  lang: 'en',
  meta: [],
};

Seo.propTypes = {
  description: PropTypes.string,
  keywords: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
  imageType: PropTypes.string,
};

export default Seo;

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        author
        keywords
        siteDescription
        siteTitle
        siteTitleShort
        siteUrl
        image
        logo
      }
    }
  }
`;
