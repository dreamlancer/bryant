import React from 'react';
import inView from '../../js/in-view.min';
import { telHref, whatsAppHref } from '../../helpers/actionUrls';
import { OFFICE_NUMBER, MOBILE_NUMBER } from '../../constants/phoneNumbers';
import ChatBubble from '!svg-react-loader!../../../static/images/support/chat-bubble.svg';
import CallIcon from '!svg-react-loader!../../../static/images/support/phone.svg';
import withContext from '../../helpers/withContext';
import text from '../../text/components/supportCall.text';
import Button from '../Shared/Button';

class SupportCall extends React.Component {
  componentDidMount() {
    Sirv.start();
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
  render() {
    const {
      store: { lang },
    } = this.props;
    return (
      <section className="support-call lazy-show">
        <div className="container lazy-title">
          <div className="row">
            <div className="col-md-6">
              <div className="row">
                <div className="offset-md-1 col-md-3 col-sm-4 col-3">
                  <div className="call-icon phone">
                    <CallIcon />
                  </div>
                </div>
                <div className="col-md-8 col-sm-8 col-9">
                  <div className="call-text">
                    <h4
                      className="call-title"
                      dangerouslySetInnerHTML={{
                        __html: text.leftTitle[lang]
                          ? text.leftTitle[lang]
                          : text.leftTitle['en'],
                      }}
                    />
                    <h5
                      className="call-subtitle"
                      dangerouslySetInnerHTML={{
                        __html: text.leftSubtitle[lang]
                          ? text.leftSubtitle[lang]
                          : text.leftSubtitle['en'],
                      }}
                    />
                    <h5 className="call-contact">
                      Bryant Dental:{' '}
                      <a className="highlight" href={telHref(OFFICE_NUMBER)}>
                        {OFFICE_NUMBER}
                      </a>
                    </h5>
                    <h5 className="call-contact">
                      Whatsapp:{' '}
                      <a
                        className="highlight"
                        href={whatsAppHref(MOBILE_NUMBER)}
                        target="_blank"
                        rel="noopener"
                        dangerouslySetInnerHTML={{
                          __html: text.sendMessage[lang]
                            ? text.sendMessage[lang]
                            : text.sendMessage['en'],
                        }}
                      />
                    </h5>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="row">
                <div className="offset-md-1 col-md-3 col-sm-4 col-3">
                  <div className="chat-icon">
                    <ChatBubble />
                  </div>
                </div>
                <div className="col-md-8 col-sm-8 col-9">
                  <div className="call-text sm-last">
                    <h4
                      className="call-title"
                      dangerouslySetInnerHTML={{
                        __html: text.rightTitle[lang]
                          ? text.rightTitle[lang]
                          : text.rightTitle['en'],
                      }}
                    />
                    <h5
                      className="call-subtitle"
                      dangerouslySetInnerHTML={{
                        __html: text.rightSubtitle[lang]
                          ? text.rightSubtitle[lang]
                          : text.rightSubtitle['en'],
                      }}
                    />

                    <Button onClick={() => Intercom('showNewMessage', '.')}>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: text.chat[lang]
                            ? text.chat[lang]
                            : text.chat['en'],
                        }}
                      />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default withContext(SupportCall);
