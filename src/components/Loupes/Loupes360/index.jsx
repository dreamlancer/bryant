/* global Sirv */
import React from 'react';
import Img from 'gatsby-image';
import smoothscroll from 'smoothscroll-polyfill';

if (typeof window !== 'undefined') {
  smoothscroll.polyfill();
  window.__forceSmoothScrollPolyfill__ = true;
}

class Loupes360 extends React.Component {
  technicalDetails() {
    const element = document.querySelector('.technical-details');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  render() {
    const { spin, lang, text } = this.props;
    return (
      <section className="glasses-360">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="wrapper-360">
                <h2
                  className="title-360"
                  dangerouslySetInnerHTML={{
                    __html: text.left360[lang]
                      ? text.left360[lang]
                      : text.left360['en'],
                  }}
                />
                <div className="fade small-loupes show active">
                  <div
                    className="Sirv sirv-spin"
                    id="small-angle1"
                    data-src="https://chanappr.sirv.com/Bryant-dental/360/Small%20Loupes/Small%20Loupes.spin"
                  >
                    <div className="spin">
                      <Img fluid={spin} critical alt="Spin" title="Spin" />
                    </div>
                    <div
                      className="details d-none d-md-block"
                      onClick={this.technicalDetails}
                    >
                      <p
                        dangerouslySetInnerHTML={{
                          __html: text.technical[lang]
                            ? text.technical[lang]
                            : text.technical['en'],
                        }}
                      />
                    </div>
                  </div>
                </div>

                <ul className="nav">
                  <li className="nav-item nav-left">
                    <span className="nav-link">
                      <p>2.5x</p>
                    </span>
                  </li>
                  <li className="nav-item nav-right">
                    <span className="nav-link">
                      <p>2.8x</p>
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-md-6">
              <div className="wrapper-360">
                <h2
                  className="title-360"
                  dangerouslySetInnerHTML={{
                    __html: text.right360[lang]
                      ? text.right360[lang]
                      : text.right360['en'],
                  }}
                />
                <div className="tab-pane fade show">
                  <div
                    className="Sirv sirv-spin sirv-spin"
                    data-src="https://chanappr.sirv.com/Bryant-dental/360/Big%20loupes/Big%20loupes.spin"
                  >
                    <div className="spin">
                      <Img fluid={spin} critical alt="Spin" title="Spin" />
                    </div>
                    <div
                      className="details d-none d-md-block"
                      onClick={this.technicalDetails}
                    >
                      <p
                        dangerouslySetInnerHTML={{
                          __html: text.technical[lang]
                            ? text.technical[lang]
                            : text.technical['en'],
                        }}
                      />
                    </div>
                  </div>
                </div>
                <ul className="nav">
                  <li className="nav-item nav-left">
                    <span className="nav-link">
                      <p>3.5x</p>
                    </span>
                  </li>
                  <li className="nav-item nav-right">
                    <span className="nav-link">
                      <p>5.0x</p>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Loupes360;
