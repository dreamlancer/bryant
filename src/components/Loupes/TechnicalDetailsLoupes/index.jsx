import React from 'react';
import inView from 'js/in-view.min';
import Button from '../../Shared/Button';
import Img from 'gatsby-image';
import { XENOSYS } from '../../../constants/externalLinks';
import ReactGA from 'react-ga';

class TechnicalDetailsLoupes extends React.Component {
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
  renderBottom() {
    const { text, lang, xenosysLogo } = this.props;
    return (
      <div className="tech-book-wrapper">
        <div className="row">
          <div className="col-md-2 order-last order-md-first">
            <Button
              type="primary"
              onClick={() => {
                fbq('track', 'BookADemo');

                ReactGA.event({
                  category: 'BookADemo',
                  action: 'BookADemo',
                });
                Intercom('showNewMessage', 'Hi, Can I arrange a free demo?');
              }}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: text.bookADemo[lang]
                    ? text.bookADemo[lang]
                    : text.bookADemo['en'],
                }}
              />
            </Button>
          </div>
          <div className="col-md-10 order-first order-md-last">
            <p className="book-demo-wrapper">
              <span
                onClick={() => this.setState({ isCalendarOpen: true })}
                dangerouslySetInnerHTML={{
                  __html: text.bookADemoText[lang]
                    ? text.bookADemoText[lang]
                    : text.bookADemoText['en'],
                }}
              />
              <span className="partnership">
                <span> In partnership with</span>
                <a href={XENOSYS} target="_blank" className="xenosys-logo">
                  <Img
                    fluid={xenosysLogo}
                    critical
                    alt="xenosys"
                    title="xenosys"
                  />
                </a>
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  renderFirstTab() {
    const { text, lang } = this.props;
    return (
      <div className="technical-box d-none d-sm-block">
        <div className="row">
          <div className="col-12">
            <table className="box-table">
              <tbody>
                <tr>
                  <th
                    dangerouslySetInnerHTML={{
                      __html: text.tableMagnification[lang]
                        ? text.tableMagnification[lang]
                        : text.tableMagnification['en'],
                    }}
                  />
                  <th
                    dangerouslySetInnerHTML={{
                      __html: text.tableWeight[lang]
                        ? text.tableWeight[lang]
                        : text.tableWeight['en'],
                    }}
                  />
                  <th
                    dangerouslySetInnerHTML={{
                      __html: text.tableDOF[lang]
                        ? text.tableDOF[lang]
                        : text.tableDOF['en'],
                    }}
                  />
                  <th
                    dangerouslySetInnerHTML={{
                      __html: text.tableFOV[lang]
                        ? text.tableFOV[lang]
                        : text.tableFOV['en'],
                    }}
                  />
                </tr>
                <tr>
                  <td>2.5X</td>
                  <td>
                    21.5{' '}
                    {text.tableGrams[lang]
                      ? text.tableGrams[lang]
                      : text.tableGrams['en']}
                  </td>
                  <td>30 - 40 cm</td>
                  <td>15 cm</td>
                </tr>
                <tr>
                  <td>2.8X</td>
                  <td>
                    26{' '}
                    {text.tableGrams[lang]
                      ? text.tableGrams[lang]
                      : text.tableGrams['en']}
                  </td>
                  <td>20 - 30 cm</td>
                  <td>13 cm</td>
                </tr>
                <tr>
                  <td>3.5X</td>
                  <td>
                    62{' '}
                    {text.tableGrams[lang]
                      ? text.tableGrams[lang]
                      : text.tableGrams['en']}
                  </td>
                  <td>15 - 20 cm</td>
                  <td>9.8 cm</td>
                </tr>
                <tr>
                  <td>5.0X</td>
                  <td>
                    75{' '}
                    {text.tableGrams[lang]
                      ? text.tableGrams[lang]
                      : text.tableGrams['en']}
                  </td>
                  <td>11 - 14 cm</td>
                  <td>6.2 - 9 cm</td>
                </tr>
              </tbody>
            </table>
          </div>
          {this.renderBottom()}
        </div>
      </div>
    );
  }
  renderMobileTab() {
    const { lang, text } = this.props;
    return (
      <div className="technical-box d-sm-none technical-box-mobile">
        <div className="row">
          <div className="col-6">
            <div className="box box-1">
              <div className="box-text">
                <h4 className="box-title">2.5X</h4>
              </div>
              <div className="box-text">
                <p className="box-info">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: text.tableWeight[lang]
                        ? text.tableWeight[lang]
                        : text.tableWeight['en'],
                    }}
                  />{' '}
                  21.5{' '}
                  {text.tableGrams[lang]
                    ? text.tableGrams[lang]
                    : text.tableGrams['en']}
                </p>
                <p className="box-info">
                  <span>DoF:</span> 30 - 40 cm
                </p>
                <p className="box-info">
                  <span>FoV:</span> 15 cm
                </p>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="box box-2">
              <div className="box-text">
                <h4 className="box-title">2.8X</h4>
              </div>

              <div className="box-text">
                <p className="box-info">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: text.tableWeight[lang]
                        ? text.tableWeight[lang]
                        : text.tableWeight['en'],
                    }}
                  />{' '}
                  26{' '}
                  {text.tableGrams[lang]
                    ? text.tableGrams[lang]
                    : text.tableGrams['en']}
                </p>
                <p className="box-info">
                  <span>DoF:</span> 20 - 30cm
                </p>
                <p className="box-info">
                  <span>FoV:</span> 13 cm
                </p>
              </div>
            </div>
          </div>

          <div className="col-6">
            <div className="box box-3">
              <div className="box-text">
                <h4 className="box-title">3.5X</h4>
              </div>

              <div className="box-text">
                <p className="box-info">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: text.tableWeight[lang]
                        ? text.tableWeight[lang]
                        : text.tableWeight['en'],
                    }}
                  />{' '}
                  62{' '}
                  {text.tableGrams[lang]
                    ? text.tableGrams[lang]
                    : text.tableGrams['en']}
                </p>
                <p className="box-info">
                  <span>DoF:</span> 15 - 20cm
                </p>
                <p className="box-info">
                  <span>FoV:</span> 9.8 cm
                </p>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="box box-4">
              <div className="box-text">
                <h4 className="box-title">5.0X</h4>
              </div>
              <div className="box-text">
                <p className="box-info">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: text.tableWeight[lang]
                        ? text.tableWeight[lang]
                        : text.tableWeight['en'],
                    }}
                  />{' '}
                  75{' '}
                  {text.tableGrams[lang]
                    ? text.tableGrams[lang]
                    : text.tableGrams['en']}
                </p>
                <p className="box-info">
                  <span>DoF:</span> 11 - 14 cm
                </p>
                <p className="box-info">
                  <span>FoV:</span> 6.2- 9 cm
                </p>
              </div>
            </div>
          </div>
          <div className="col-6 offset-3">
            <div className="box box-5">
              <div className="box-text">
                <h4 className="box-title">7.5X</h4>
              </div>
              <div className="box-text">
                <p className="box-info">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: text.tableWeight[lang]
                        ? text.tableWeight[lang]
                        : text.tableWeight['en'],
                    }}
                  />{' '}
                  81.7{' '}
                  {text.tableGrams[lang]
                    ? text.tableGrams[lang]
                    : text.tableGrams['en']}
                </p>
                <p className="box-info">
                  <span>DoF:</span> 4 - 5 cm
                </p>
                <p className="box-info">
                  <span>FoV:</span> 4.1 cm
                </p>
              </div>
            </div>
          </div>

          {this.renderBottom()}
        </div>
      </div>
    );
  }

  render() {
    const { text, lang } = this.props;
    return (
      <section className="technical-details lazy-show">
        <div className="technical-anchor" id="technical-details" />
        <div className="container">
          <h1
            className="details-title lazy-title"
            dangerouslySetInnerHTML={{
              __html: text.technicalDetailsTitle[lang]
                ? text.technicalDetailsTitle[lang]
                : text.technicalDetailsTitle['en'],
            }}
          />

          <div className="technical-info lazy-content">
            <div className="tab-content" id="myTabContent">
              {this.renderFirstTab()}

              {this.renderMobileTab()}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default TechnicalDetailsLoupes;
