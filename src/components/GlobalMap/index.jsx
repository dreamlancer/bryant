import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

import inView from '../../js/in-view.min';
import RepMap from '../RepMap';

import text from '../../text/components/globalMap.text';
import withContext from '../../helpers/withContext';
import Button from '../Shared/Button';

let interval = null;
let pinTimeout = null;

class GlobalMap extends React.Component {
  state = {
    worldMapActive: true,
  };

  componentDidMount() {
    Sirv.start();

    inView({
      selector: '.lazy-show',
      enter: el => {
        if (el.classList.contains('product-page-wrapper')) {
          el.classList.add('page-loaded');
        } else {
          el.classList.add('entered');
        }
      },
      offset: 0.4,
      exit: el => {
        el.classList.remove('entered');
      },
    });
    this.animatePins();
  }

  componentWillUnmount() {
    clearInterval(interval);
    clearTimeout(pinTimeout);
  }

  animatePins() {
    const pins = Array.from(document.querySelectorAll('.pin'));
    interval = setInterval(() => {
      const selected = parseInt(Math.random() * pins.length, 10);
      const selected2 = parseInt(Math.random() * pins.length, 10);

      pins[selected].classList.add('animate');
      if (selected2 % 2 === 0) {
        pins[selected2].classList.add('animate');
      }
      pinTimeout = setTimeout(() => {
        pins[selected].classList.remove('animate');
        pins[selected2].classList.remove('animate');
        clearTimeout(pinTimeout);
      }, 400);
    }, 1000);
  }

  renderWorldMap = () => {
    const { mapImg } = this.props;
    const { worldMapActive } = this.state;
    return (
      <div
        className={`map-image lazy-content ${
          worldMapActive ? 'active' : 'hidden-map'
        }`}
      >
        <Img fluid={mapImg} critical alt="Global map" title="Global map" />
        <div className="pin-wrapper pin-1">
          <div className="pin" />
          <div className="pulse" />
        </div>
        <div className="pin-wrapper pin-2">
          <div className="pin" />
          <div className="pulse" />
        </div>
        <div className="pin-wrapper pin-3">
          <div className="pin" />
          <div className="pulse" />
        </div>
        <div className="pin-wrapper pin-4">
          <div className="pin" />
          <div className="pulse" />
        </div>
        <div className="pin-wrapper pin-5">
          <div className="pin" />
          <div className="pulse" />
        </div>
        <div className="pin-wrapper pin-6">
          <div className="pin" />
          <div className="pulse" />
        </div>
        <div className="pin-wrapper pin-7">
          <div className="pin" />
          <div className="pulse" />
        </div>
        <div className="pin-wrapper pin-8">
          <div className="pin" />
          <div className="pulse" />
        </div>
        <div className="pin-wrapper pin-9">
          <div className="pin" />
          <div className="pulse" />
        </div>
        <div className="pin-wrapper pin-10">
          <div className="pin" />
          <div className="pulse" />
        </div>
        <div className="pin-wrapper pin-11">
          <div className="pin" />
          <div className="pulse" />
        </div>
        <div className="pin-wrapper pin-12">
          <div className="pin" />
          <div className="pulse" />
        </div>
        <div className="pin-wrapper pin-13">
          <div className="pin" />
          <div className="pulse" />
        </div>
        <div className="pin-wrapper pin-14">
          <div className="pin" />
          <div className="pulse" />
        </div>
        <div className="pin-wrapper pin-15">
          <div className="pin" />
          <div className="pulse" />
        </div>
        <div className="pin-wrapper pin-16">
          <div className="pin" />
          <div className="pulse" />
        </div>
        <div className="pin-wrapper pin-17">
          <div className="pin" />
          <div className="pulse" />
        </div>
        <div className="pin-wrapper pin-18">
          <div className="pin" />
          <div className="pulse" />
        </div>
        <div className="pin-wrapper pin-19">
          <div className="pin" />
          <div className="pulse" />
        </div>
        <div className="pin-wrapper pin-20">
          <div className="pin blue" />
          <div className="pulse" />
        </div>
        <div className="pin-wrapper pin-21">
          <div className="pin blue" />
          <div className="pulse" />
        </div>
        <div className="pin-wrapper pin-22">
          <div className="pin blue" />
          <div className="pulse" />
        </div>
        <div className="pin-wrapper pin-23">
          <div className="pin" />
          <div className="pulse" />
        </div>
        <div className="pin-wrapper pin-24">
          <div className="pin" />
          <div className="pulse" />
        </div>
        <div className="pin-wrapper pin-25">
          <div className="pin blue" />
          <div className="pulse" />
        </div>
      </div>
    );
  };

  toggleMaps = () => {
    this.setState({ worldMapActive: !this.state.worldMapActive });
  };

  render() {
    const {
      state: { worldMapActive },
      props: {
        store: { lang },
      },
    } = this;
    const textButton1 = text.button1[lang]
      ? text.button1[lang]
      : text.button1['en'];
    const textButton2 = text.button2[lang]
      ? text.button2[lang]
      : text.button2['en'];
    return (
      <section className="map lazy-show">
        <div className="container">
          <div className="map-header lazy-title" id="representatives">
            <h2
              className="map-title"
              dangerouslySetInnerHTML={{
                __html: text.title[lang] ? text.title[lang] : text.title['en'],
              }}
            />
            <Button onClick={this.toggleMaps} type="secondary">
              {worldMapActive ? textButton1 : textButton2}
            </Button>
          </div>
          <div className="maps-wrapper">
            {this.renderWorldMap()}
            <RepMap worldMapActive={worldMapActive} />
          </div>
          <div className="button-wrapper">
            <Link to="/bryant-store/all">
              <Button type="primary">
                <span
                  dangerouslySetInnerHTML={{
                    __html: text.buttonStore[lang]
                      ? text.buttonStore[lang]
                      : text.buttonStore['en'],
                  }}
                />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    );
  }
}

export default withContext(GlobalMap);
