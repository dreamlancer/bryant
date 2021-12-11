import React from 'react';
import Loadable from 'react-loadable';

import withContext from '../helpers/withContext';
import inView from '../js/in-view.min';
import Loader from '../components/Shared/Loader';
import ReactModal from 'react-modal';
import Seo from '../components/Seo';
import disableScroll from 'disable-scroll';
import ReturnModal from '../components/ReturnModal';
import text from '../text/returns.text';

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
// const LoadableReturnModal = Loadable({
//   loader: () => import('../components/ReturnModal'),
//   loading() {
//     return <Loader />;
//   },
// });

let timeout = null;
let timeout2 = null;

class Returns extends React.Component {
  state = {
    modalOpen: false,
  };
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

  openModal = () => {
    this.setState({ modalOpen: true });
  };

  closeModal = () => {
    // disableScroll.off();
    this.setState({ modalOpen: false });
  };

  render() {
    const {
      closeModal,
      openModal,
      state: { modalOpen },
      props: {
        store: { products, loadingButton, returnRequest, lang },
      },
    } = this;
    return (
      <div className="returns-page page-container">
        <Seo
          keywords="bryant dental, dental loupes, wireless headlight, ignis"
          title="Returns"
          url="returns"
          description="45-day quibble free returns on all our products as standard."
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
              <button
                className="btn arrange-demo-btn blue-btn"
                onClick={openModal}
                dangerouslySetInnerHTML={{
                  __html: text.button[lang]
                    ? text.button[lang]
                    : text.button['en'],
                }}
              />
            </div>
          </div>
        </div>
        <LoadableSupportCall />
        <LoadableMap />

        <ReactModal
          isOpen={modalOpen}
          ariaHideApp={false}
          // onAfterOpen={() => disableScroll.on()}
          onRequestClose={closeModal}
          shouldCloseOnOverlayClick
          shouldCloseOnEsc
        >
          <ReturnModal
            closeModal={closeModal}
            products={products}
            loadingButton={loadingButton}
            returnRequest={returnRequest}
            lang={lang}
            text={text}
          />
        </ReactModal>
      </div>
    );
  }
}

export default withContext(Returns);
