import React from 'react';
import Loadable from 'react-loadable';

import Seo from '../components/Seo';
import withContext from '../helpers/withContext';
import inView from '../js/in-view.min';
import Loader from '../components/Shared/Loader';
import text from '../text/students.text';

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

class Students extends React.Component {
  componentDidMount() {
    Sirv.start();
    timeout = setTimeout(() => {
      const pageContainer = document.querySelector('.page-container');
      pageContainer && pageContainer.classList.add('show');
    }, 100);

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
    timeout2 = setTimeout(() => {
      this.props.store.loaded(false);
    }, 500);
  }

  componentWillUnmount() {
    clearTimeout(timeout);
    clearTimeout(timeout2);
  }

  render() {
    const {
      store: { lang },
    } = this.props;
    return (
      <div className="students-page page-container">
        <Seo
          title="Student Discount"
          keywords="bryant dental, dental loupes, dental loupes discount, dental loupes students, dental loupes, dental loupes 10% off"
          url="students"
          description="We offer £150 off Bryant Dental 2.5x and 2.8x loupes for undergraduate dental students."
        />

        <div className="container">
          <div className="row">
            <div className="col-sm-8 offset-sm-2">
              <h1
                className="page-title"
                dangerouslySetInnerHTML={{
                  __html: text.title[lang]
                    ? text.title[lang]
                    : text.title['en'],
                }}
              />
              <h4
                className="page-subtitle"
                dangerouslySetInnerHTML={{
                  __html: text.description[lang]
                    ? text.description[lang]
                    : text.description['en'],
                }}
              />

              <h2
                className="page-title"
                dangerouslySetInnerHTML={{
                  __html: text.subTitle[lang]
                    ? text.subTitle[lang]
                    : text.subTitle['en'],
                }}
              />
              <h4
                className="page-subtitle"
                dangerouslySetInnerHTML={{
                  __html: text.subDescription[lang]
                    ? text.subDescription[lang]
                    : text.subDescription['en'],
                }}
              />
            </div>
          </div>
        </div>
        <LoadableSupportCall />
        <LoadableMap />
      </div>
    );
  }
}

export default withContext(Students);
