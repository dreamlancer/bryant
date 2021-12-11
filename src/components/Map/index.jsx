/* global L */
import React from 'react';
import { blue } from '../Shared/variables';

let timeout;
const myAccessToken =
  'pk.eyJ1Ijoia2xhdXNzMTk0IiwiYSI6ImNqM3JyN29iYTAwMW00MGxtNnhsYWVmbHQifQ.7iI1HFArZy8ln49XpsIH6Q';

class Map extends React.Component {
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

  initMapbox() {
    L.mapbox.accessToken = myAccessToken;

    const geojson = [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-0.352222, 51.288535],
        },
        properties: {
          'marker-color': blue,
        },
      },
    ];

    const map = L.mapbox.map('map').setView([51.288535, -0.352222], 16);
    L.mapbox
      .styleLayer('mapbox://styles/klauss194/cjnbj95om07i62srwomhosqw9')
      .addTo(map);
    L.mapbox
      .featureLayer()
      .setGeoJSON(geojson)
      .addTo(map);
    // L.marker([51.288535,-0.352222]).addTo(map);
    if (map.scrollWheelZoom) {
      map.scrollWheelZoom.disable();
    }
  }

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
    return (
      <section className="support-map">
        <div className="container">
          <div id="map">
            <div className="map-address">
              <h2 className="title">Our Location:</h2>
              <h4 className="location">
                Fetcham Park House
                <br />
                Lower Road
                <br />
                Fetcham
                <br />
                Surrey
                <br />
                KT22 9HD
              </h4>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Map;
