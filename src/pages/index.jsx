import React from 'react';
import Loadable from 'react-loadable';
import { graphql } from 'gatsby';
import withContext from '../helpers/withContext';
import Seo from '../components/Seo';
import text from '../text/homepage.text';
import HomepageAnimation from '../components/homepage/HomepageAnimation';
import Loader from '../components/Shared/Loader';

const LoadableParallax = Loadable({
  loader: () => import('../components/homepage/Parallax'),
  loading() {
    return <Loader />;
  },
});

const LoadableExplodeAnimation = Loadable({
  loader: () => import('../components/ExplodeAnimation'),
  loading() {
    return <Loader />;
  },
});

const LoadableTestimonialsBig = Loadable({
  loader: () => import('../components/homepage/TestimonialsBig'),
  loading() {
    return <Loader />;
  },
});

import inView from '../js/in-view.min';

let timeout = null;

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      load: false,
    };
  }

  componentDidMount() {
    $('.page-container').addClass('show');
    Sirv.start();
    inView({
      selector: '.lazy-show',
      offset: 0.2,
      enter: el => {
        el.classList.add('entered');
      },
      exit: el => {
        el.classList.remove('entered');
      },
    });
    timeout = setTimeout(() => {
      this.setState({ load: true });
    }, 600);
  }

  componentWillUnmount() {
    clearTimeout(timeout);
  }

  loadStatus = status => {
    this.setState({ loading: status });
    this.props.store.loaded(status);
  };

  render() {
    const {
      props: {
        store,
        store: { isMobile },
        data: { xenosysLogo },
      },
      state: { loading, load },
      loadStatus,
    } = this;

    return (
      <div className="homepage">
        <Seo
          homepage
          title="Bryant Dental | Dental Loupes & Headlights"
          keywords="bryant dental, dental loupes, loupes, dental loupes uk, dental headlight, best dental loupes, dental loupes 2018, dentist loupes"
        />

        <section className="hero">
          <HomepageAnimation
            isMobile={isMobile}
            loaded={loadStatus}
            loading={loading}
            store={store}
            text={text}
            xenosysLogo={xenosysLogo.childImageSharp.fluid}
          />
        </section>
        {load && (
          <LoadableParallax isMobile={isMobile} store={store} text={text} />
        )}
        {load && (
          <LoadableExplodeAnimation
            homepage
            loading={loading}
            isMobile={isMobile}
            store={store}
            text={text}
          />
        )}
        {load && (
          <LoadableTestimonialsBig
            isMobile={isMobile}
            store={store}
            text={text}
          />
        )}
      </div>
    );
  }
}

export default withContext(Index);

export const query = graphql`
  query {
    xenosysLogo: file(relativePath: { eq: "xenosys_logo.png" }) {
      childImageSharp {
        fluid(maxHeight: 200, quality: 100) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`;
