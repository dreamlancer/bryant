/* global Sirv $ */
import React from 'react';
import Loadable from 'react-loadable';
import Img from 'gatsby-image';
import { graphql } from 'gatsby';
import { Link } from 'gatsby';

import Seo from '../components/Seo';
import withContext from '../helpers/withContext';
import Loader from '../components/Shared/Loader';
import Button from '../components/Shared/Button';

import smoothscroll from 'smoothscroll-polyfill';

import text from '../text/about-us.text';

if (typeof window !== 'undefined') {
  smoothscroll.polyfill();
  window.__forceSmoothScrollPolyfill__ = true;
}

const LoadableTeam = Loadable({
  loader: () => import('../components/Team'),
  loading() {
    return <Loader />;
  },
});

const LoadableRating = Loadable({
  loader: () => import('../components/Rating'),
  loading() {
    return <Loader />;
  },
});

const LoadableGlobalMap = Loadable({
  loader: () => import('../components/GlobalMap'),
  loading() {
    return <Loader />;
  },
});

import inView from '../js/in-view.min';

let timeout = null;
let timeout2 = null;
let timeout3 = null;

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      load: false,
      openExtraText: false,
    };
    this.extraDescription = React.createRef();
  }

  componentDidMount() {
    // Start sirv
    Sirv.start();
    // const extraText = this.extraDescription.current;
    // if (extraText) {
    //   extraText.classList.remove('closed');
    //   extraText.style.maxHeight = `${extraText.offsetHeight + 500}px`;
    //   extraText.classList.add('closed');
    // }

    timeout = setTimeout(() => {
      $('.page-container').addClass('show');
    }, 100);
    timeout2 = setTimeout(() => {
      this.setState({
        load: true,
      });
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
    clearTimeout(timeout3);
  }

  computeHeroHeight = () => {
    const { isMobile } = this.props.store;
    // if (
    //   typeof window !== 'undefined' &&
    //   window.innerHeight < 870 &&
    //   !isMobile
    // ) {
    //   return '150vh';
    // }
    if (isMobile) {
      return '307px';
    }
    return '98vh';
  };

  removeOverlay = () => {
    const { loaded, loaderLoading } = this.props.store;
    if (loaderLoading) {
      timeout3 = setTimeout(() => loaded(false), 500);
    }
  };

  toggleExtraText = () =>
    this.setState({ openExtraText: !this.state.openExtraText });

  render() {
    const {
      props: {
        data,
        data: { map, einsteinDark },
        store: { isMobile, lang },
      },
      state: { load, openExtraText },
    } = this;

    return (
      <div className="about-page page-container">
        <Seo
          title="About Us"
          url="about-us"
          keywords="about bryant dental, dental loupes, dental loupes 2019, dental loupes 2018, student dental loupes, surgical loupes, loupes, dental head light, best dental loupes"
          description="Everyone has a story. Bryant Dental is committed to making smart dentistry simpler by empowering dentists with innovative technology - our dental loupes are just the first step"
        />

        <section
          className="about-hero"
          style={{ height: this.computeHeroHeight() }}
        >
          <div className="about-background">
            <Img
              alt="Bryant Dental Loupes Evolution.png"
              title="Bryant Dental Loupes Evolution.png"
              fluid={einsteinDark.childImageSharp.fluid}
              critical
              onLoad={this.removeOverlay}
            />
          </div>
          <div className="title-wrapper">
            <h1
              className="about-header"
              dangerouslySetInnerHTML={{
                __html: text.titleH1[lang]
                  ? text.titleH1[lang]
                  : text.titleH1['en'],
              }}
            />
          </div>
        </section>

        <section
          ref={this.extraDescription}
          className="about-extra-description open"
        >
          <div className="container">
            <h3
              className="extra-title"
              dangerouslySetInnerHTML={{
                __html: text.section2Title[lang]
                  ? text.section2Title[lang]
                  : text.section2Title['en'],
              }}
            />

            <h5
              className="extra-text"
              dangerouslySetInnerHTML={{
                __html: text.section2Text[lang]
                  ? text.section2Text[lang]
                  : text.section2Text['en'],
              }}
            />
            <div className="button-wrapper">
              <Link
                to="/bryant-store/all"
                // className="btn arrange-demo-btn extra-description-btn"
              >
                <Button type="secondary">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: text.section2Button[lang]
                        ? text.section2Button[lang]
                        : text.section2Button['en'],
                    }}
                  />
                </Button>
              </Link>
            </div>
          </div>
          {/* <button
            onClick={this.toggleExtraText}
            className={`extra-arrow ${openExtraText ? 'up' : 'down'}`}
          /> */}
        </section>

        {load && <LoadableTeam isMobile={isMobile} data={data} />}

        {load && <LoadableGlobalMap mapImg={map.childImageSharp.fluid} />}

        {load && <LoadableRating />}
      </div>
    );
  }
}

export default withContext(About);

export const query = graphql`
  query {
    map: file(relativePath: { eq: "map.png" }) {
      childImageSharp {
        fluid(maxHeight: 675, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    einsteinDark: file(relativePath: { eq: "about-page/einstein-dark.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1300, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    errorMember: file(relativePath: { eq: "team-members/error-member.png" }) {
      childImageSharp {
        fluid(maxWidth: 350, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    connorBryant: file(relativePath: { eq: "team-members/connor-bryant.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 350, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    priyamPatel: file(relativePath: { eq: "team-members/priyam-patel.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 350, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    angelaLy: file(relativePath: { eq: "team-members/Angela-Ly.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 350, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    dominicClark: file(
      relativePath: { eq: "team-members/Dominic-Clark-Roberton.jpg" }
    ) {
      childImageSharp {
        fluid(maxWidth: 350, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    georgeHallwood: file(
      relativePath: { eq: "team-members/George-Hallwood.jpg" }
    ) {
      childImageSharp {
        fluid(maxWidth: 350, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    henryChen: file(relativePath: { eq: "team-members/Henry-Chen.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 350, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    jessicaHuang: file(relativePath: { eq: "team-members/Jessica-Huang.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 350, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    lucyTaylor: file(
      relativePath: { eq: "team-members/Lucy-Taylor-Bard.jpg" }
    ) {
      childImageSharp {
        fluid(maxWidth: 350, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    nicolaKeay: file(relativePath: { eq: "team-members/Nicola-Keay.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 350, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    sarahGibson: file(relativePath: { eq: "team-members/Sarah-Gibson.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 350, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    steveTaylor: file(relativePath: { eq: "team-members/Steve-Taylor.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 350, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    thomasHayes: file(
      relativePath: { eq: "team-members/Thomas-Hayes-Powell.jpg" }
    ) {
      childImageSharp {
        fluid(maxWidth: 350, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    tochiUdeh: file(relativePath: { eq: "team-members/Tochi-Udeh.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 350, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    wendyTaylor: file(
      relativePath: { eq: "team-members/Wendy-Taylor-Bard.jpg" }
    ) {
      childImageSharp {
        fluid(maxWidth: 350, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    smallGlasses: file(relativePath: { eq: "team-members/small-glasses.png" }) {
      childImageSharp {
        fluid(maxWidth: 150, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`;
