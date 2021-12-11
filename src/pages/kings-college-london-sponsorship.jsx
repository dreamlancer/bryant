/* global $ Sirv */
import React from 'react';
import Loadable from 'react-loadable';
import { ReactTypeformEmbed } from 'react-typeform-embed';

import Seo from '../components/Seo';
import withContext from '../helpers/withContext';
import inView from '../js/in-view.min';
import Loader from '../components/Shared/Loader';
import text from '../text/extrapages.text';

const LoadableSupportCall = Loadable({
  loader: () => import('../components/SupportCall'),
  loading() {
    return <Loader />;
  },
});

const LoadableMap = Loadable({
  loader: () => import('../components/Map'),
  loading() {
    return <Loader />;
  },
});

let timeout = null;
let timeout2 = null;

class kcl extends React.Component {
  componentDidMount() {
    Sirv.start();

    timeout = setTimeout(() => {
      const pageContainer = document.querySelector('.page-container');
      pageContainer && pageContainer.classList.add('show');
    }, 100);

    timeout2 = setTimeout(() => {
      this.props.store.loaded(false);
    }, 500);

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

  openForm = () => {
    this.typeformEmbed.typeform.open();
  };

  render() {
    const {
      openForm,
      props: {
        store: { lang },
      },
    } = this;
    return (
      <div>
        <Seo
          title="KCL Dental Society"
          url="kings-college-london-sponsorship"
          keywords="bryant dental, dental loupes, barts hoodies, student dentant loupes, kcl sponsorship, bryant dental hoodies"
          description="Bryant Dental is the proud Sponsor of King’s College London Dental Society Hoodies."
        />

        <section className="kcl-page page-container">
          <div className="container">
            <h1
              className="kcl-title"
              dangerouslySetInnerHTML={{
                __html: text.kingsTitle[lang]
                  ? text.kingsTitle[lang]
                  : text.kingsTitle['en'],
              }}
            />
            <button
              className="btn blue-btn"
              onClick={openForm}
              dangerouslySetInnerHTML={{
                __html: text.kingsButton[lang]
                  ? text.kingsButton[lang]
                  : text.kingsButton['en'],
              }}
            />
          </div>

          <ReactTypeformEmbed
            popup={true}
            autoOpen={false}
            url={'https://bryantdental.typeform.com/to/T8nC1R'}
            hideHeaders={true}
            hideFooter={true}
            buttonText="Go!"
            style={{ position: 'relative' }}
            ref={tf => (this.typeformEmbed = tf)}
          />
        </section>
        <LoadableSupportCall />
        <LoadableMap />
      </div>
    );
  }
}

export default withContext(kcl);
