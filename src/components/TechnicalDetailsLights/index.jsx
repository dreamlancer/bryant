import React from 'react';
import inView from '../../js/in-view.min';
import Button from '../Shared/Button';

class TechnicalDetailsLights extends React.Component {
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
    const { openForm, lang, text } = this.props;
    return (
      <div className="tech-book-wrapper">
        <div className="row">
          <div className="col-md-4 col-lg-3 order-last order-md-first">
            <Button onClick={openForm} type="primary">
              <span
                dangerouslySetInnerHTML={{
                  __html: text.waitingList[lang]
                    ? text.waitingList[lang]
                    : text.waitingList['en'],
                }}
              />
            </Button>
          </div>
          <div className="col-md-8 col-lg-9 order-first order-md-last">
            <p className="book-demo-wrapper">
              <div
                className="book-text highlight"
                dangerouslySetInnerHTML={{
                  __html: text.waitingListText[lang]
                    ? text.waitingListText[lang]
                    : text.waitingListText['en'],
                }}
              />
            </p>
          </div>
        </div>
      </div>
    );
  }

  renderTab() {
    const { lang, text } = this.props;
    return (
      <div className="technical-box lights">
        <div className="row">
          <div className="col-12">
            <table className="box-table">
              <tbody>
                <tr>
                  <th
                    dangerouslySetInnerHTML={{
                      __html: text.tableWeight[lang]
                        ? text.tableWeight[lang]
                        : text.tableWeight['en'],
                    }}
                  />
                  <th
                    dangerouslySetInnerHTML={{
                      __html: text.tableIntensity[lang]
                        ? text.tableIntensity[lang]
                        : text.tableIntensity['en'],
                    }}
                  />
                  <th
                    dangerouslySetInnerHTML={{
                      __html: text.tableDimensions[lang]
                        ? text.tableDimensions[lang]
                        : text.tableDimensions['en'],
                    }}
                  />
                  <th
                    dangerouslySetInnerHTML={{
                      __html: text.tableBatteryLife[lang]
                        ? text.tableBatteryLife[lang]
                        : text.tableBatteryLife['en'],
                    }}
                  />
                </tr>
                <tr>
                  <td
                    dangerouslySetInnerHTML={{
                      __html: text.tableHeadUnit[lang]
                        ? text.tableHeadUnit[lang]
                        : text.tableHeadUnit['en'],
                    }}
                  />
                  <td
                    rowSpan="2"
                    dangerouslySetInnerHTML={{
                      __html: text.tableDaylight[lang]
                        ? text.tableDaylight[lang]
                        : text.tableDaylight['en'],
                    }}
                  />
                  <td
                    rowSpan="2"
                    dangerouslySetInnerHTML={{
                      __html: text.tableSpotSize[lang]
                        ? text.tableSpotSize[lang]
                        : text.tableSpotSize['en'],
                    }}
                  />
                  <td
                    dangerouslySetInnerHTML={{
                      __html: text.tableUltra[lang]
                        ? text.tableUltra[lang]
                        : text.tableUltra['en'],
                    }}
                  />
                </tr>
                <tr>
                  <td
                    dangerouslySetInnerHTML={{
                      __html: text.tableFullUnit[lang]
                        ? text.tableFullUnit[lang]
                        : text.tableFullUnit['en'],
                    }}
                  />
                  <td style={{ display: 'none' }} />
                  <td style={{ display: 'none' }} />
                  <td
                    dangerouslySetInnerHTML={{
                      __html: text.tableRegular[lang]
                        ? text.tableRegular[lang]
                        : text.tableRegular['en'],
                    }}
                  />
                </tr>
                <tr>
                  <td
                    colSpan="4"
                    dangerouslySetInnerHTML={{
                      __html: text.tableAvailability[lang]
                        ? text.tableAvailability[lang]
                        : text.tableAvailability['en'],
                    }}
                  />
                </tr>
              </tbody>
            </table>
          </div>
          {this.renderBottom()}
        </div>
      </div>
    );
  }

  render() {
    const { lang, text } = this.props;
    return (
      <section className="technical-details lazy-show">
        <div className="technical-anchor" id="technical-details" />
        <div className="container">
          <h2
            className="details-title lazy-title"
            dangerouslySetInnerHTML={{
              __html: text.technicalDetails[lang]
                ? text.technicalDetails[lang]
                : text.technicalDetails['en'],
            }}
          />

          <div className="technical-info lazy-content">
            <div className="tab-content" id="myTabContent">
              {this.renderTab()}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default TechnicalDetailsLights;
