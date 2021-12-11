/* global Sirv $ */
import React from 'react';
import Loadable from 'react-loadable';
import Img from 'gatsby-image';
import { graphql } from 'gatsby';

import Seo from '../components/Seo';
import withContext from '../helpers/withContext';
import Loader from '../components/Shared/Loader';

import text from '../text/about-us.text';

const LoadableRating = Loadable({
  loader: () => import('../components/Rating'),
  loading() {
    return <Loader />;
  },
});

import inView from '../js/in-view.min';

let timeout = null;
let timeout2 = null;

class Lumadent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      load: false,
    };
  }

  componentDidMount() {
    // Start sirv
    Sirv.start();

    timeout = setTimeout(() => {
      $('.page-container').addClass('show');
    }, 100);
    timeout2 = setTimeout(() => {
      this.setState({
        load: true,
      });
      this.props.store.loaded(false);
      setTimeout(() => {
        if (this.props.location.state && this.props.location.state.rep) {
          const reps = document.getElementById('representatives');
          reps && reps.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 200);
    }, 600);

    inView({
      selector: '.lazy-show',
      enter: el => {
        el.classList.add('entered');
      },
      offset: 0.2,
      exit: el => {
        el.classList.remove('entered');
      },
    });
  }

  componentWillUnmount() {
    clearTimeout(timeout);
    clearTimeout(timeout2);
  }

  render() {
    const {
      props: {
        store: { lang },
        data: {
          lumadent,
          lumadent2,
          lumadent3,
          lumadent4,
          lumadent5,
          lumadent6,
        },
      },
      state: { load },
    } = this;

    return (
      <div className="lumadent-page page-container">
        <Seo
          title="Lumadent Headlight"
          url="lumadent"
          keywords="bryant dental, lumadent, lumadent battery, lumadent headlights, lumadent light, lumadent charger, dental headlights"
          description="LumaDent UK Dental Light. A better way to see. An advanced 5g LED provides 60,000 lux to ensure you can see the tiniest of detail. 45-day free returns guaranteed."
        />

        <section className="lumadent-section">
          <div className="container">
            <h1 className="hero-title">
              Lumadent Dental Light
              <br className="hidden-sm" /> A better way to see
            </h1>

            <h3 className="hero-description">
              The LED is a 60,000 lux powerhouse packed into a sleek 5g
              aluminium casing. It will provide a uniformly lit field of vision
              no matter which part of the oral cavity you look at.
            </h3>

            <div className="row">
              <div className="col-md-4 offset-md-2">
                <div className="lumadent-first-section">
                  <h2 className="subtitle">See Every Detail</h2>
                  <h3 className="">Lumadent Dental Light</h3>
                  <button className="btn" disabled>
                    Out of stock
                  </button>
                </div>
              </div>
              <div className="col-md-4">
                <div className="image-wrapper">
                  <Img
                    alt="LumaDent LED Light System"
                    title="LumaDent LED Light System"
                    fluid={lumadent.childImageSharp.fluid}
                    critical
                  />
                </div>
                <div className="image-description">
                  <p>
                    The Lumadent LED Light System comes with either one or two
                    battery packs. It produces up to 60,000 lux for up to 24
                    hours, so you can use it for a full day. We provide a 45 day
                    guarantee with free returns, so if you don't love the
                    Lumadent LED light, then we'll refund you in full.
                    <br />
                    <br />
                    All accessories come as standard, including composite
                    filter, cable management kit and long/short connector wires.
                  </p>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-8 offset-md-2">
                <div className="lumadent-second-section">
                  <h2 className="subtitle">Superb Light Quality</h2>
                  <p className="description">
                    Advanced LED technology produces 60,000 lux (5570 foot
                    candles) at a colour temperature of 5000 kelvin (daylight).
                    This is enough light to spot the faintest of ulcers and the
                    tiniest MB2s. All accessories come as standard; composite
                    filters, re-enforced wires and cable management tools.
                  </p>
                  <div className="image-wrapper">
                    <Img
                      alt="lumadentled"
                      title="lumadentled"
                      fluid={lumadent2.childImageSharp.fluid}
                      critical
                    />
                  </div>

                  <h2 className="subtitle">Easily Replaceable Wires</h2>
                  <p className="description">
                    All wires have cyclical fatigue and will eventually fail.
                    We've thought carefully about design and ensured the LED
                    unit has a detachable wire. This means, if the wire fails,
                    instead of replacing the LED, you can replace the wire. We
                    provide 2 wires as standard and can be replaced from £10
                  </p>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="columns-wrapper">
                      <div className="columns-title">
                        <div className="image-wrapper">
                          <Img
                            alt="lumadentled"
                            title="lumadentled"
                            fluid={lumadent4.childImageSharp.fluid}
                            critical
                          />
                        </div>
                        <h2>An enormous 60,000lux (5570 foot-candles)</h2>
                        <p>
                          See Everything. From dubious margins to tiny MB2s
                          Built with an ultra-light aluminium casing for a
                          durable and beautiful finish. Mounts onto any frame
                          with our bespoke connectors.
                        </p>
                        <div className="image-wrapper">
                          <Img
                            alt="lumadentled"
                            title="lumadentled"
                            fluid={lumadent5.childImageSharp.fluid}
                            critical
                          />
                        </div>
                        <h2>
                          Defies Gravity at a virtually weightless 5g LED.
                        </h2>
                        <p>
                          Incredible engineering means this headlight can rest
                          effortlessly on your frames and illuminate your entire
                          field of view.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="columns-wrapper">
                      <div className="columns-title">
                        <div className="image-wrapper">
                          <Img
                            alt="lumadentled"
                            title="lumadentled"
                            fluid={lumadent3.childImageSharp.fluid}
                            critical
                          />
                        </div>
                        <h2>Incredible Focus. Light just where you want it.</h2>
                        <p>
                          Forget unpredictable technology. A well-designed
                          purely mechanical switch guaranteed to work when you
                          want it to. Built-in adjustable knob for precise
                          control over light output.
                        </p>
                        <div className="image-wrapper">
                          <Img
                            alt="lumadentled"
                            title="lumadentled"
                            fluid={lumadent6.childImageSharp.fluid}
                            critical
                          />
                        </div>
                        <h2>Last All Day.</h2>
                        <p>
                          We've packed a huge amount of charge into this battery
                          control unit so it will last all day. 24 hours to be
                          precise.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    <div className="lumadent-technical-details">
                      <h2 className="technical-title">
                        Technical Specifications
                      </h2>
                      <h2 className="technical-subtitle">
                        LUMADENT DENTAL LIGHT
                      </h2>
                      <h2 className="spec">Weight 5g</h2>
                      <h2 className="spec">60,000 lux illumination</h2>
                      <h2 className="spec">10-24 Hours battery life</h2>
                      <h2 className="spec">Replaceable cable</h2>
                      <h2 className="spec">Full aluminium construction</h2>
                      <h2 className="spec">Lifetime LED warranty</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {load && <LoadableRating />}
      </div>
    );
  }
}

export default withContext(Lumadent);

export const query = graphql`
  query {
    lumadent: file(relativePath: { eq: "lumadent/lumadent-1.jpeg" }) {
      childImageSharp {
        fluid(maxHeight: 675, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    lumadent2: file(relativePath: { eq: "lumadent/lumadent-2.jpg" }) {
      childImageSharp {
        fluid(maxHeight: 675, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    lumadent3: file(relativePath: { eq: "lumadent/lumadent-3.jpg" }) {
      childImageSharp {
        fluid(maxHeight: 675, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    lumadent4: file(relativePath: { eq: "lumadent/lumadent-4.jpg" }) {
      childImageSharp {
        fluid(maxHeight: 675, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    lumadent5: file(relativePath: { eq: "lumadent/lumadent-5.jpg" }) {
      childImageSharp {
        fluid(maxHeight: 675, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    lumadent6: file(relativePath: { eq: "lumadent/lumadent-6.jpg" }) {
      childImageSharp {
        fluid(maxHeight: 675, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`;
