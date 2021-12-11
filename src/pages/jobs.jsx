/* global $ Sirv */
import React from 'react';
import { graphql } from 'gatsby';
import withContext from '../helpers/withContext';
import inView from '../js/in-view.min';
import Img from 'gatsby-image';
import { ReactTypeformEmbed } from 'react-typeform-embed';

import Seo from '../components/Seo';
import JobsList from '../components/JobsList';
import Map from '../components/Map';
import SupportCall from '../components/SupportCall';
import text from '../text/jobs.text';

let timeout = null;
let timeout2 = null;

class Jobs extends React.Component {
  state = {
    load: false,
  };

  componentDidMount() {
    timeout2 = setTimeout(() => {
      this.props.store.loaded(false);

      this.setState({
        load: true,
      });
    }, 500);

    // Start sirv
    Sirv.start();

    // Start inview to fade in/out elements on page
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

    timeout = setTimeout(() => {
      $('.page-container').addClass('show');
    }, 100);
  }

  componentWillUnmount() {
    clearTimeout(timeout);
    clearTimeout(timeout2);
  }

  openForm = () => {
    this.typeformEmbed.typeform.open();
  };

  render() {
    const {
      state: { load },
      props: {
        store: { isMobile, lang },
        data: { jobsHero },
      },
    } = this;

    const jobs = [
      {
        title: text.job1Title[lang]
          ? text.job1Title[lang]
          : text.job1Title['en'],
        subTitle: text.job1Subtitle[lang]
          ? text.job1Subtitle[lang]
          : text.job1Subtitle['en'],
        description: text.job1Description[lang]
          ? text.job1Description[lang]
          : text.job1Description['en'],
      },
    ];

    return (
      <div className="jobs-page page-container">
        <Seo
          title="Jobs"
          url="jobs"
          keywords="bryant dental, dental loupes, dental student, dental students workplace, dental student job"
          description="Work where the very best in Dental Technology is developed and supplied to our customers."
        />

        <div className="jobs-page-content ">
          <section className="jobs-hero lazy-show">
            <div className="container">
              <div className="row">
                <div className="col-md-10 offset-md-1">
                  <div className="jobs-hero-image-container lazy-title">
                    <div className="jobs-hero-image-wrapper">
                      <Img
                        fluid={jobsHero.childImageSharp.fluid}
                        alt="Work for Bryant Dental"
                        title="Work for Bryant Dental"
                        critical
                        placeholderStyle={{ background: 'black' }}
                      />
                    </div>
                  </div>
                  <div className="jobs-hero-content">
                    <h1
                      className="jobs-hero-title lazy-content"
                      dangerouslySetInnerHTML={{
                        __html: text.title[lang]
                          ? text.title[lang]
                          : text.title['en'],
                      }}
                    />
                    <div className="row">
                      <div className="col-md-10 offset-md-1">
                        <p
                          className="jobs-hero-description lazy-content"
                          dangerouslySetInnerHTML={{
                            __html: text.description[lang]
                              ? text.description[lang]
                              : text.description['en'],
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="lazy-show">
            <div className="lazy-content-list">
              <JobsList
                jobs={jobs}
                isMobile={isMobile}
                openForm={this.openForm}
                lang={lang}
                text={text}
              />

              <div className="ExamplePopup">
                <ReactTypeformEmbed
                  popup={true}
                  autoOpen={false}
                  url={'https://bryantdental.typeform.com/to/j0imaD'}
                  hideHeaders={true}
                  hideFooter={true}
                  buttonText="Go!"
                  style={{ position: 'relative' }}
                  ref={tf => (this.typeformEmbed = tf)}
                />
              </div>
            </div>
          </div>
        </div>

        {load && <SupportCall />}
        {load && <Map />}
      </div>
    );
  }
}

export default withContext(Jobs);

export const query = graphql`
  query {
    jobsHero: file(relativePath: { eq: "jobs/jobs-hero.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 700, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
`;
