/* global L */
import React from 'react';
import { blue } from '../Shared/variables';
import Img from 'gatsby-image';
import { whatsAppHref } from '../../helpers/actionUrls';

let timeout;
const myAccessToken =
  'pk.eyJ1Ijoia2xhdXNzMTk0IiwiYSI6ImNqM3JyN29iYTAwMW00MGxtNnhsYWVmbHQifQ.7iI1HFArZy8ln49XpsIH6Q';

class RepMap extends React.Component {
  componentDidMount() {
    timeout = setTimeout(() => {
      // TODO: Check if script loaded and handle with a static image
      const JsUrl = 'https://api.mapbox.com/mapbox.js/v2.4.0/mapbox.js';
      const cssUrl = 'https://api.mapbox.com/mapbox.js/v2.4.0/mapbox.css';
      this.loadScript(JsUrl, cssUrl, this.initMapbox);
    }, 500);
  }

  componentWillUnmount() {
    clearTimeout(timeout);
  }

  initMapbox = () => {
    L.mapbox.accessToken = myAccessToken;

    const geojson = [
      {
        coordinates: [52.4775215, -1.9336708],
        name: 'George Hallwood',
        status: 'Product Specialist – Midlands',
        phone: '+44(0)7593 697582‬',
        mail: 'george@bryant.dental',
        image: 'george-hallwood.jpg',
      },
      {
        coordinates: [51.5097852, -0.1401427],
        name: 'Thomas Hayes-Powell',
        status: 'Senior Product Specialist - England',
        phone: '+44(0)7930 116570',
        mail: 'thomas@bryant.dental',
        image: 'thomas-hayes-powell.jpg',
      },
      {
        coordinates: [55.8478126, -4.2586155],
        name: 'Dr. Henry Chen',
        status: 'Senior Product Specialist - Scotland',
        phone: '+44(0)7733 256000',
        mail: 'henry@bryant.dental',
        image: 'henry-chen.jpg',
      },
      {
        coordinates: [53.478553, -2.2465099],
        name: 'Dr. Angela Ly',
        status: 'Product Specialist - Manchester',
        phone: '+44(0)7850 293617',
        mail: 'angela@bryant.dental',
        image: 'angela-ly.jpg',
      },
      {
        coordinates: [55.1936652, -2.0696399],
        name: 'Dr. Stephen Taylor',
        status: 'Product Specialist - Newcastle',
        phone: '+44(0)7723 335423',
        mail: 'stephen@bryant.dental',
        image: 'steve-taylor.jpg',
      },
      {
        coordinates: [50.8967918, -0.0539922],
        name: 'Dr. Tochi Udeh',
        status: 'Product Specialist – South East England',
        phone: '+44(0)7581 726693',
        mail: 'tochi@bryant.dental',
        image: 'tochi-udeh.jpg',
      },
      {
        coordinates: [51.7516482, -1.2581615],
        name: 'Dr. Jessica Huang',
        status: 'Product Specialist – Central England',
        phone: '+44(0)7585 661978',
        mail: 'jessica@bryant.dental',
        image: 'jessica-huang.jpg',
      },
    ];

    const map = L.mapbox.map('map').setView([54.1617057, -2.8638552], 6);
    L.mapbox
      .styleLayer('mapbox://styles/klauss194/cjnbj95om07i62srwomhosqw9')
      .addTo(map);

    geojson.forEach(mark => {
      // https://www.mapbox.com/mapbox.js/api/v3.1.1/l-popup/
      var el = document.createElement('div');
      el.className = 'marker';
      const marker = L.marker(mark.coordinates, {
        icon: L.mapbox.marker.icon({
          'marker-color': blue,
        }),
      }).addTo(map);

      marker.bindPopup(`
        <div class="rep-map-popup">
          <h3 class="popup-name">${mark.name}</h3>
          <div class="row">
            <div class="col-7">
              <h3 class="popup-status">${mark.status}</h3>
              <h3 class="popup-phone">
                <a href="${whatsAppHref(mark.phone)}">
                  <i class="fab fa-whatsapp"></i>${mark.phone}
                </a>
              </h3>
              <h3 class="popup-email">
                <a href="mailto:${mark.mail}">
                  <i class="far fa-envelope"></i>${mark.mail}
                </a>
              </h3>
            </div>
            <div class="col-5">
              <img 
                src="https://chanappr.sirv.com/Bryant-dental/global/Members/${
                  mark.image
                }"
                onerror="this.src='https://chanappr.sirv.com/Bryant-dental/global/Members/error-member.png'"
                alt="${mark.name}"
                title="${mark.name}"
              />
            </div>
          </div>
        </div>
      `);
    });

    if (map.scrollWheelZoom) {
      map.scrollWheelZoom.disable();
    }
  };

  loadScript(sScriptSrc, cssSrc, oCallback) {
    const oHead = document.getElementsByTagName('head')[0];
    const oScript = document.createElement('script');
    const oCss = document.createElement('link');
    oCss.href = cssSrc;
    oCss.rel = 'stylesheet';
    oHead.appendChild(oCss);
    // make sure callback isn't run more than once
    function runCallback() {
      if (oCallback) {
        oCallback();
        oScript.onload = oScript.onreadystatechange = null;
        oCallback = null;
      }
    }
    oScript.type = 'text/javascript';
    // most browsers
    oScript.onload = runCallback;
    // IE 6 & 7
    oScript.onreadystatechange = () => {
      if (this.readyState === 'complete') {
        runCallback();
      }
    };
    oScript.src = sScriptSrc;
    oHead.appendChild(oScript);
  }

  render() {
    const { worldMapActive } = this.props;
    return (
      <section
        className={`rep-map ${!worldMapActive ? 'active' : 'hidden-map'}`}
      >
        <div id="map" />
      </section>
    );
  }
}

export default RepMap;
