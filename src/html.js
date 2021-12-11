import React from 'react';
import PropTypes from 'prop-types';

export default class HTML extends React.Component {
  render() {
    return (
      <html {...this.props.htmlAttributes} lang="en-GB">
        <head>
          <meta charSet="utf-8" />
          <meta name="ROBOTS" content="index, follow" />
          <meta name="GOOGLEBOT" content="index, follow" />
          <meta name="theme-color" content="#000000" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
            integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
            crossOrigin="anonymous"
          />
          {/* Swiper slider */}
          <link
            rel="stylesheet"
            crossOrigin="anonymous"
            href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.3.5/css/swiper.min.css"
          />
          {/* Mapbox */}
          <link
            crossOrigin="anonymous"
            href="https://api.mapbox.com/mapbox-gl-js/v0.49.0/mapbox-gl.css"
            rel="stylesheet"
          />
          {/* Sirv */}
          <link
            rel="dns-prefetch"
            href="https://scripts.sirv.com"
            crossOrigin="anonymous"
          />
          <link
            rel="dns-prefetch"
            href="https://chanappr-cdn.sirv.com"
            crossOrigin="anonymous"
          />
          <link
            rel="preconnect"
            href="https://scripts.sirv.com"
            crossOrigin="anonymous"
          />
          <link
            rel="preconnect"
            href="https://chanappr.sirv.com"
            crossOrigin="anonymous"
          />
          {this.props.headComponents}
        </head>
        <body {...this.props.bodyAttributes}>
          {this.props.preBodyComponents}
          <div id="bubble-root" />
          <div
            key={`body`}
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
          <script
            src="https://scripts.sirv.com/sirv.js"
            crossOrigin="anonymous"
          />
          <script
            src="https://api.mapbox.com/mapbox.js/v2.4.0/mapbox.js"
            crossOrigin="anonymous"
          />
          <script
            src="https://code.jquery.com/jquery-3.3.1.min.js"
            integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
            crossOrigin="anonymous"
          />
          <script
            src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.2/TweenMax.min.js"
            crossOrigin="anonymous"
          />
          <script
            src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.2/TimelineMax.min.js"
            crossOrigin="anonymous"
          />
          <script
            src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.2/plugins/EaselPlugin.min.js"
            crossOrigin="anonymous"
          />
          <script
            src="https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.6/ScrollMagic.min.js"
            crossOrigin="anonymous"
          />
          <script
            src="https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.6/plugins/debug.addIndicators.min.js"
            crossOrigin="anonymous"
          />
          <script
            src="https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.6/plugins/animation.gsap.js"
            crossOrigin="anonymous"
          />
          <script
            src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"
            integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49"
            crossOrigin="anonymous"
          />
          <script
            src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"
            integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy"
            crossOrigin="anonymous"
          />
          <script src="https://js.stripe.com/v3/" />

          <script src="https://bryantdental.agilecrm.com/core/js/api/web-rules?callback=json7689628743047669&amp;id=7d9nive5naqga17d414gd52qn5" />
          <script src="https://stats2.agilecrm.com/addstats?callback=json6224806742809075&amp;guid=07824b66-0ee6-4e23-0a94-b32a95320305&amp;sid=20d2f713-0c82-ff0a-52f3-461a31184ae7&amp;url=https%3A%2F%2Fbryant.dental%2F&amp;agile=7d9nive5naqga17d414gd52qn5&amp;domain=bryantdental" />
          <script
            src="https://ssl.geoplugin.net/javascript.gp?k=798ce9edcb5e389a"
            crossOrigin="anonymous"
          />
        </body>
      </html>
    );
  }
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
};
