/* global $ Sirv */
import React from 'react';
import Loadable from 'react-loadable';

import Seo from '../components/Seo';
import withContext from '../helpers/withContext';
import inView from '../js/in-view.min';
import Loader from '../components/Shared/Loader';
import text from '../text/terms.text';

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

class Terms extends React.Component {
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

  render() {
    const {
      store: { lang },
    } = this.props;
    return (
      <div>
        <Seo
          title="T&Cs"
          url="terms"
          keywords="bryant dental, dental loupes, bryant dental T&C, wireless headlight T&C"
          description="Please read these Terms of Service carefully before accessing or using our website."
        />

        <div className="terms-page page-container">
          <div className="container">
            <div className="row">
              <div className="col-sm-10 offset-sm-1">
                <h1
                  className="page-title"
                  dangerouslySetInnerHTML={{
                    __html: text.title[lang]
                      ? text.title[lang]
                      : text.title['en'],
                  }}
                />
                <h5
                  className="page-info"
                  dangerouslySetInnerHTML={{
                    __html: text.info1[lang]
                      ? text.info1[lang]
                      : text.info1['en'],
                  }}
                />
                <h5
                  className="page-info"
                  dangerouslySetInnerHTML={{
                    __html: text.info2[lang]
                      ? text.info2[lang]
                      : text.info2['en'],
                  }}
                />
                <h5
                  className="page-info"
                  dangerouslySetInnerHTML={{
                    __html: text.info3[lang]
                      ? text.info3[lang]
                      : text.info3['en'],
                  }}
                />
                <h5
                  className="page-info"
                  dangerouslySetInnerHTML={{
                    __html: text.info4[lang]
                      ? text.info4[lang]
                      : text.info4['en'],
                  }}
                />
                <h5
                  className="page-info"
                  dangerouslySetInnerHTML={{
                    __html: text.info5[lang]
                      ? text.info5[lang]
                      : text.info5['en'],
                  }}
                />
                <h4
                  className="page-section"
                  dangerouslySetInnerHTML={{
                    __html: text.section1[lang]
                      ? text.section1[lang]
                      : text.section1['en'],
                  }}
                />
                <h5
                  className="page-info"
                  dangerouslySetInnerHTML={{
                    __html: text.info6[lang]
                      ? text.info6[lang]
                      : text.info6['en'],
                  }}
                />
                <h5
                  className="page-info"
                  dangerouslySetInnerHTML={{
                    __html: text.info7[lang]
                      ? text.info7[lang]
                      : text.info7['en'],
                  }}
                />
                <h5
                  className="page-info"
                  dangerouslySetInnerHTML={{
                    __html: text.info8[lang]
                      ? text.info8[lang]
                      : text.info8['en'],
                  }}
                />
                <h5
                  className="page-info"
                  dangerouslySetInnerHTML={{
                    __html: text.info9[lang]
                      ? text.info9[lang]
                      : text.info9['en'],
                  }}
                />
                <h4
                  className="page-section"
                  dangerouslySetInnerHTML={{
                    __html: text.section2[lang]
                      ? text.section2[lang]
                      : text.section2['en'],
                  }}
                />
                <h5
                  className="page-info"
                  dangerouslySetInnerHTML={{
                    __html: text.info10[lang]
                      ? text.info10[lang]
                      : text.info10['en'],
                  }}
                />
                <h5
                  className="page-info"
                  dangerouslySetInnerHTML={{
                    __html: text.info11[lang]
                      ? text.info11[lang]
                      : text.info11['en'],
                  }}
                />
                <h5
                  className="page-info"
                  dangerouslySetInnerHTML={{
                    __html: text.info12[lang]
                      ? text.info12[lang]
                      : text.info12['en'],
                  }}
                />
                <h5
                  className="page-info"
                  dangerouslySetInnerHTML={{
                    __html: text.info13[lang]
                      ? text.info13[lang]
                      : text.info13['en'],
                  }}
                />
                <h4
                  className="page-section"
                  dangerouslySetInnerHTML={{
                    __html: text.section3[lang]
                      ? text.section3[lang]
                      : text.section3['en'],
                  }}
                />
                <h5
                  className="page-info"
                  dangerouslySetInnerHTML={{
                    __html: text.info14[lang]
                      ? text.info14[lang]
                      : text.info14['en'],
                  }}
                />
                <h5
                  className="page-info"
                  dangerouslySetInnerHTML={{
                    __html: text.info15[lang]
                      ? text.info15[lang]
                      : text.info15['en'],
                  }}
                />
                <h4
                  className="page-section"
                  dangerouslySetInnerHTML={{
                    __html: text.section4[lang]
                      ? text.section4[lang]
                      : text.section4['en'],
                  }}
                />
                <h5
                  className="page-info"
                  dangerouslySetInnerHTML={{
                    __html: text.info16[lang]
                      ? text.info16[lang]
                      : text.info16['en'],
                  }}
                />
                <h5
                  className="page-info"
                  dangerouslySetInnerHTML={{
                    __html: text.info17[lang]
                      ? text.info17[lang]
                      : text.info17['en'],
                  }}
                />
                <h5
                  className="page-info"
                  dangerouslySetInnerHTML={{
                    __html: text.info18[lang]
                      ? text.info18[lang]
                      : text.info18['en'],
                  }}
                />
                <h4
                  className="page-section"
                  dangerouslySetInnerHTML={{
                    __html: text.section5[lang]
                      ? text.section5[lang]
                      : text.section5['en'],
                  }}
                />
                <h5
                  className="page-info"
                  dangerouslySetInnerHTML={{
                    __html: text.info19[lang]
                      ? text.info19[lang]
                      : text.info19['en'],
                  }}
                />
                <h5
                  className="page-info"
                  dangerouslySetInnerHTML={{
                    __html: text.info20[lang]
                      ? text.info20[lang]
                      : text.info20['en'],
                  }}
                />
                <h5
                  className="page-info"
                  dangerouslySetInnerHTML={{
                    __html: text.info21[lang]
                      ? text.info21[lang]
                      : text.info21['en'],
                  }}
                />
                <h5
                  className="page-info"
                  dangerouslySetInnerHTML={{
                    __html: text.info22[lang]
                      ? text.info22[lang]
                      : text.info22['en'],
                  }}
                />
                <h4
                  className="page-section"
                  dangerouslySetInnerHTML={{
                    __html: text.section6[lang]
                      ? text.section6[lang]
                      : text.section6['en'],
                  }}
                />
                <h5
                  className="page-info"
                  dangerouslySetInnerHTML={{
                    __html: text.info23[lang]
                      ? text.info23[lang]
                      : text.info23['en'],
                  }}
                />
                <h5
                  className="page-info"
                  dangerouslySetInnerHTML={{
                    __html: text.info24[lang]
                      ? text.info24[lang]
                      : text.info24['en'],
                  }}
                />
                <h5
                  className="page-info"
                  dangerouslySetInnerHTML={{
                    __html: text.info25[lang]
                      ? text.info25[lang]
                      : text.info25['en'],
                  }}
                />
                <h4
                  className="page-section"
                  dangerouslySetInnerHTML={{
                    __html: text.section7[lang]
                      ? text.section7[lang]
                      : text.section7['en'],
                  }}
                />
                <h5
                  className="page-info"
                  dangerouslySetInnerHTML={{
                    __html: text.info26[lang]
                      ? text.info26[lang]
                      : text.info26['en'],
                  }}
                />
                <h5
                  className="page-info"
                  dangerouslySetInnerHTML={{
                    __html: text.info27[lang]
                      ? text.info27[lang]
                      : text.info27['en'],
                  }}
                />
                <h5
                  className="page-info"
                  dangerouslySetInnerHTML={{
                    __html: text.info28[lang]
                      ? text.info28[lang]
                      : text.info28['en'],
                  }}
                />
                <h5
                  className="page-info"
                  dangerouslySetInnerHTML={{
                    __html: text.info29[lang]
                      ? text.info29[lang]
                      : text.info29['en'],
                  }}
                />
                <h4
                  className="page-section"
                  dangerouslySetInnerHTML={{
                    __html: text.section8[lang]
                      ? text.section8[lang]
                      : text.section8['en'],
                  }}
                />
                <h5
                  className="page-info"
                  dangerouslySetInnerHTML={{
                    __html: text.info30[lang]
                      ? text.info30[lang]
                      : text.info30['en'],
                  }}
                />
                <h5
                  className="page-info"
                  dangerouslySetInnerHTML={{
                    __html: text.info31[lang]
                      ? text.info31[lang]
                      : text.info31['en'],
                  }}
                />
                <h5
                  className="page-info"
                  dangerouslySetInnerHTML={{
                    __html: text.info32[lang]
                      ? text.info32[lang]
                      : text.info32['en'],
                  }}
                />
                <h4
                  className="page-section"
                  dangerouslySetInnerHTML={{
                    __html: text.section9[lang]
                      ? text.section9[lang]
                      : text.section9['en'],
                  }}
                />
                <h5
                  className="page-info"
                  dangerouslySetInnerHTML={{
                    __html: text.info33[lang]
                      ? text.info33[lang]
                      : text.info33['en'],
                  }}
                />
                <h5
                  className="page-info"
                  dangerouslySetInnerHTML={{
                    __html: text.info34[lang]
                      ? text.info34[lang]
                      : text.info34['en'],
                  }}
                />
                <h5
                  className="page-info"
                  dangerouslySetInnerHTML={{
                    __html: text.info35[lang]
                      ? text.info35[lang]
                      : text.info35['en'],
                  }}
                />
                <h4
                  className="page-section"
                  dangerouslySetInnerHTML={{
                    __html: text.section10[lang]
                      ? text.section10[lang]
                      : text.section10['en'],
                  }}
                />
                <h5
                  className="page-info"
                  dangerouslySetInnerHTML={{
                    __html: text.info36[lang]
                      ? text.info36[lang]
                      : text.info36['en'],
                  }}
                />
                <h4
                  className="page-section"
                  dangerouslySetInnerHTML={{
                    __html: text.section11[lang]
                      ? text.section11[lang]
                      : text.section11['en'],
                  }}
                />
                <h5
                  className="page-info"
                  dangerouslySetInnerHTML={{
                    __html: text.info37[lang]
                      ? text.info37[lang]
                      : text.info37['en'],
                  }}
                />
                <h5
                  className="page-info"
                  dangerouslySetInnerHTML={{
                    __html: text.info38[lang]
                      ? text.info38[lang]
                      : text.info38['en'],
                  }}
                />
                <h4
                  className="page-section"
                  dangerouslySetInnerHTML={{
                    __html: text.section12[lang]
                      ? text.section12[lang]
                      : text.section12['en'],
                  }}
                />
                <h5
                  className="page-info"
                  dangerouslySetInnerHTML={{
                    __html: text.info39[lang]
                      ? text.info39[lang]
                      : text.info39['en'],
                  }}
                />
                <h4
                  className="page-section"
                  dangerouslySetInnerHTML={{
                    __html: text.section13[lang]
                      ? text.section13[lang]
                      : text.section13['en'],
                  }}
                />
                <h5
                  className="page-info"
                  dangerouslySetInnerHTML={{
                    __html: text.info40[lang]
                      ? text.info40[lang]
                      : text.info40['en'],
                  }}
                />
                <h5
                  className="page-info"
                  dangerouslySetInnerHTML={{
                    __html: text.info41[lang]
                      ? text.info41[lang]
                      : text.info41['en'],
                  }}
                />
                <h5
                  className="page-info"
                  dangerouslySetInnerHTML={{
                    __html: text.info42[lang]
                      ? text.info42[lang]
                      : text.info42['en'],
                  }}
                />
                <h5
                  className="page-info"
                  dangerouslySetInnerHTML={{
                    __html: text.info43[lang]
                      ? text.info43[lang]
                      : text.info43['en'],
                  }}
                />
                <h5
                  className="page-info"
                  dangerouslySetInnerHTML={{
                    __html: text.info44[lang]
                      ? text.info44[lang]
                      : text.info44['en'],
                  }}
                />
                <h4
                  className="page-section"
                  dangerouslySetInnerHTML={{
                    __html: text.section14[lang]
                      ? text.section14[lang]
                      : text.section14['en'],
                  }}
                />
                <h5
                  className="page-info"
                  dangerouslySetInnerHTML={{
                    __html: text.info45[lang]
                      ? text.info45[lang]
                      : text.info45['en'],
                  }}
                />
                <h4
                  className="page-section"
                  dangerouslySetInnerHTML={{
                    __html: text.section15[lang]
                      ? text.section15[lang]
                      : text.section15['en'],
                  }}
                />
                <h5
                  className="page-info"
                  dangerouslySetInnerHTML={{
                    __html: text.info46[lang]
                      ? text.info46[lang]
                      : text.info46['en'],
                  }}
                />
                <h4
                  className="page-section"
                  dangerouslySetInnerHTML={{
                    __html: text.section16[lang]
                      ? text.section16[lang]
                      : text.section16['en'],
                  }}
                />
                <h5
                  className="page-info"
                  dangerouslySetInnerHTML={{
                    __html: text.info47[lang]
                      ? text.info47[lang]
                      : text.info47['en'],
                  }}
                />
                <h5
                  className="page-info"
                  dangerouslySetInnerHTML={{
                    __html: text.info48[lang]
                      ? text.info48[lang]
                      : text.info48['en'],
                  }}
                />
                <h5
                  className="page-info"
                  dangerouslySetInnerHTML={{
                    __html: text.info49[lang]
                      ? text.info49[lang]
                      : text.info49['en'],
                  }}
                />
                <h4
                  className="page-section"
                  dangerouslySetInnerHTML={{
                    __html: text.section17[lang]
                      ? text.section17[lang]
                      : text.section17['en'],
                  }}
                />
                <h5
                  className="page-info"
                  dangerouslySetInnerHTML={{
                    __html: text.info50[lang]
                      ? text.info50[lang]
                      : text.info50['en'],
                  }}
                />
                <h5
                  className="page-info"
                  dangerouslySetInnerHTML={{
                    __html: text.info51[lang]
                      ? text.info51[lang]
                      : text.info51['en'],
                  }}
                />
                <h5
                  className="page-info"
                  dangerouslySetInnerHTML={{
                    __html: text.info52[lang]
                      ? text.info52[lang]
                      : text.info52['en'],
                  }}
                />
                <h4
                  className="page-section"
                  dangerouslySetInnerHTML={{
                    __html: text.section18[lang]
                      ? text.section18[lang]
                      : text.section18['en'],
                  }}
                />
                <h5
                  className="page-info"
                  dangerouslySetInnerHTML={{
                    __html: text.info53[lang]
                      ? text.info53[lang]
                      : text.info53['en'],
                  }}
                />
                <h4
                  className="page-section"
                  dangerouslySetInnerHTML={{
                    __html: text.section19[lang]
                      ? text.section19[lang]
                      : text.section19['en'],
                  }}
                />
                <h5
                  className="page-info"
                  dangerouslySetInnerHTML={{
                    __html: text.info54[lang]
                      ? text.info54[lang]
                      : text.info54['en'],
                  }}
                />
                <h5
                  className="page-info"
                  dangerouslySetInnerHTML={{
                    __html: text.info55[lang]
                      ? text.info55[lang]
                      : text.info55['en'],
                  }}
                />
                <h4
                  className="page-section"
                  dangerouslySetInnerHTML={{
                    __html: text.section20[lang]
                      ? text.section20[lang]
                      : text.section20['en'],
                  }}
                />
                <h5
                  className="page-info"
                  dangerouslySetInnerHTML={{
                    __html: text.info56[lang]
                      ? text.info56[lang]
                      : text.info56['en'],
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <LoadableSupportCall />
        <LoadableMap />
      </div>
    );
  }
}

export default withContext(Terms);
