import React, { Component } from 'react';
import Img from 'gatsby-image';
import './index.scss';
import { whatsAppHref } from '../../helpers/actionUrls';
import { MOBILE_NUMBER } from '../../constants/phoneNumbers';
import withContext from '../../helpers/withContext';
import text from '../../text/components/team.text';

class Team extends Component {
  componentDidMount() {
    const memberTab = document.querySelector('#member-0-tab');
    const memberPanel = document.querySelector('#member-0');
    memberTab && memberTab.classList.add('active');
    memberPanel && memberPanel.classList.add('active');
    memberPanel && memberPanel.classList.add('show');
  }

  renderName = name => {
    const {
      props: { isMobile },
    } = this;

    if (isMobile) {
      return name;
    } else {
      const splitName = name.split(' ');
      return splitName.map((namePart, index) => {
        if (splitName[0] === 'Dr.') {
          return (
            <React.Fragment key={index}>
              {index === 1 ? (
                <React.Fragment>
                  {namePart}
                  <br />
                </React.Fragment>
              ) : (
                `${namePart} `
              )}
            </React.Fragment>
          );
        } else {
          return (
            <React.Fragment key={index}>
              {index === 0 ? (
                <React.Fragment>
                  {namePart}
                  <br />
                </React.Fragment>
              ) : (
                `${namePart} `
              )}
            </React.Fragment>
          );
        }
      });
    }
  };

  renderMemberBody = member => {
    const { renderName } = this;

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-6">
            <div className="member-image">
              {member.image && (
                <Img
                  fluid={member.image}
                  critical
                  alt={member.name}
                  title={member.name}
                />
              )}
            </div>
          </div>
          <div className="col-md-5 col-all-center-helper">
            <div className="member-info">
              <h2 className="member-name">{renderName(member.name)}</h2>
              <h3 className="member-function">{member.function}</h3>
              <div className="member-social">
                {member.instagram && (
                  <div className="social">
                    <a
                      target="_blank"
                      rel="noopener"
                      href={`https://www.instagram.com/${member.instagram}`}
                    >
                      <i className="fab fa-instagram instagram" />
                      {member.instagram}
                    </a>
                  </div>
                )}
                {member.twitter && (
                  <div className="social">
                    <a
                      target="_blank"
                      rel="noopener"
                      href={`https://twitter.com/${member.twitter}`}
                    >
                      <i className="fab fa-twitter twitter" />
                      {member.twitter}
                    </a>
                  </div>
                )}
                {member.mail && (
                  <div className="social">
                    <a
                      target="_blank"
                      rel="noopener"
                      href={`mailto:${member.mail}`}
                    >
                      <i className="far fa-envelope" />
                      {member.mail}
                    </a>
                  </div>
                )}
                {member.phone && (
                  <div className="social">
                    <a
                      target="_blank"
                      rel="noopener"
                      href={`${whatsAppHref(member.phone)}`}
                    >
                      <i className="fab fa-whatsapp" />
                      {member.phone}
                    </a>
                  </div>
                )}
                {member.site && (
                  <div className="social">
                    <a target="_blank" rel="noopener" href={member.site}>
                      <i className="fas fa-home" />
                      {member.site}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <p className="member-description">{member.description}</p>
          </div>
        </div>
      </React.Fragment>
    );
  };

  render() {
    const {
      data,
      store: { lang },
    } = this.props;

    const members = [
      {
        description: text.connorBryant[lang]
          ? text.connorBryant[lang]
          : text.connorBryant['en'],
        image: data.connorBryant.childImageSharp.fluid,
        name: 'Dr. Connor Bryant',
        function: 'CEO',
        shortFunc: 'CEO',
        instagram: null,
        twitter: null,
        phone: MOBILE_NUMBER,
        mail: 'connor@bryant.dental',
        site: null,
      },
      {
        description: text.priyamPatel[lang]
          ? text.priyamPatel[lang]
          : text.priyamPatel['en'],
        image: data.priyamPatel.childImageSharp.fluid,
        name: 'Dr. Priyam Patel',
        function: 'COO',
        shortFunc: 'COO',
        instagram: null,
        twitter: null,
        phone: MOBILE_NUMBER,
        mail: 'priyam@bryant.dental',
        site: null,
      },
      {
        description: text.nicolaKeay[lang]
          ? text.nicolaKeay[lang]
          : text.nicolaKeay['en'],
        image: data.nicolaKeay.childImageSharp.fluid,
        name: 'Nicola Ward',
        function: 'Head of Accounts',
        shortFunc: 'Head of Accounts',
        instagram: null,
        twitter: null,
        phone: '+44 (0)7341 905861‬‬‬‬',
        mail: 'nicola@bryant.dental',
        site: null,
      },
      {
        description: text.angelaLy[lang]
          ? text.angelaLy[lang]
          : text.angelaLy['en'],
        image: data.angelaLy.childImageSharp.fluid,
        name: 'Dr. Angela Ly',
        function: 'Product Specialist - Manchester',
        shortFunc: 'Product Specialist',
        instagram: 'your_smile_clinic',
        twitter: '@yoursmileclinic',
        phone: '+44 (0)7850293617',
        mail: 'angela@bryant.dental',
        site: 'www.yoursmileclinic.co.uk',
      },
      {
        description: text.sarahGibson[lang]
          ? text.sarahGibson[lang]
          : text.sarahGibson['en'],
        image: data.sarahGibson.childImageSharp.fluid,
        name: 'Sarah Gibson',
        function: 'Customer Success Manager',
        shortFunc: 'Customer Success Manager',
        instagram: null,
        twitter: null,
        phone: MOBILE_NUMBER,
        mail: 'sarah@bryant.dental',
        site: null,
      },
      {
        description: text.henryChen[lang]
          ? text.henryChen[lang]
          : text.henryChen['en'],
        image: data.henryChen.childImageSharp.fluid,
        name: 'Dr. Henry Chen',
        function: 'Senior Product Specialist - Scotland',
        shortFunc: 'Senior Product Specialist',
        instagram: null,
        twitter: null,
        phone: '+44(0)7733 256000',
        mail: 'henry@bryant.dental',
        site: null,
      },
      {
        description: text.lucyTaylor[lang]
          ? text.lucyTaylor[lang]
          : text.lucyTaylor['en'],
        image: data.lucyTaylor.childImageSharp.fluid,
        name: 'Lucy Taylor-Bard',
        function: 'Customer Support Assistant',
        shortFunc: 'Customer Support Assistant',
        instagram: null,
        twitter: null,
        phone: '+44(0)7871 808178',
        mail: 'lucy@bryant.dental',
        site: null,
      },
      {
        description: text.jessicaHuang[lang]
          ? text.jessicaHuang[lang]
          : text.jessicaHuang['en'],
        image: data.jessicaHuang.childImageSharp.fluid,
        name: 'Dr. Jessica Huang',
        function: 'Product Specialist – Central England',
        shortFunc: 'Product Specialist',
        instagram: null,
        twitter: null,
        phone: '+44 (0) 7585 661978‬‬‬‬',
        mail: 'jessica@bryant.dental',
        site: null,
      },
      {
        description: text.georgeHallwood[lang]
          ? text.georgeHallwood[lang]
          : text.georgeHallwood['en'],
        image: data.georgeHallwood.childImageSharp.fluid,
        name: 'George Hallwood',
        function: 'Product Specialist – Midlands',
        shortFunc: 'Product Specialist',
        instagram: null,
        twitter: null,
        phone: '+44 (0)7593 697582‬',
        mail: 'george@bryant.dental',
        site: null,
      },
      {
        description: text.steveTaylor[lang]
          ? text.steveTaylor[lang]
          : text.steveTaylor['en'],
        image: data.steveTaylor.childImageSharp.fluid,
        name: 'Dr. Stephen Taylor',
        function: 'Product Specialist - Newcastle',
        shortFunc: 'Product Specialist',
        instagram: null,
        twitter: null,
        phone: '+44(0)7723335423‬‬‬‬',
        mail: 'stephen@bryant.dental',
        site: null,
      },
      {
        description: text.wendyTaylor[lang]
          ? text.wendyTaylor[lang]
          : text.wendyTaylor['en'],
        image: data.wendyTaylor.childImageSharp.fluid,
        name: 'Wendy Taylor-Bard',
        function: 'Customer Relationship Manager',
        shortFunc: 'Customer Relationship Manager',
        instagram: null,
        twitter: null,
        phone: '+44 (0)7542 586722',
        mail: 'wendy@bryant.dental',
        site: null,
      },
      {
        description: text.thomasHayes[lang]
          ? text.thomasHayes[lang]
          : text.thomasHayes['en'],
        image: data.thomasHayes.childImageSharp.fluid,
        name: 'Thomas Hayes-Powell',
        function: 'Senior Product Specialist - England',
        shortFunc: 'Senior Product Specialist',
        instagram: null,
        twitter: null,
        phone: '+44 (0)7930 116570‬‬‬',
        mail: 'thomas@bryant.dental',
        site: null,
      },
      {
        description: text.tochiUdeh[lang]
          ? text.tochiUdeh[lang]
          : text.tochiUdeh['en'],
        image: data.tochiUdeh.childImageSharp.fluid,
        name: 'Dr. Tochukwu Udeh (Tochi)',
        function: 'Product Specialist – South East England',
        shortFunc: 'Product Specialist',
        instagram: null,
        twitter: null,
        phone: '+44(0) 7581 726693‬‬‬‬',
        mail: 'tochi@bryant.dental',
        site: null,
      },
    ];
    return (
      <section className="team lazy-show">
        <div className="container">
          <div className="team-header">
            <h2
              dangerouslySetInnerHTML={{
                __html: text.title[lang] ? text.title[lang] : text.title['en'],
              }}
            />
          </div>
          <div className="team-content d-none d-md-block">
            <div className="row">
              <div className="col-md-4 order-last order-md-first">
                <div className="team-members">
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    {members.map((member, key) => {
                      return (
                        <li key={key} className="nav-item nav-left">
                          <a
                            className="nav-link"
                            id={`member-${key}-tab`}
                            data-toggle="tab"
                            href={`#member-${key}`}
                            role="tab"
                            aria-controls={`#member-${key}`}
                            aria-selected="true"
                          >
                            <div className="table-name-wrapper">
                              <p>{member.name}</p>
                              <p className="small">{member.shortFunc}</p>
                            </div>
                            <div className="image-wrapper">
                              {member.image && (
                                <Img
                                  fluid={member.image}
                                  critical
                                  alt={member.name}
                                  title={member.name}
                                />
                              )}
                            </div>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <div className="col-md-8 order-first order-md-last col-all-center-helper">
                <div className="tab-content" id="myTabContent">
                  {members.map((member, key) => {
                    return (
                      <div
                        className="tab-pane fade"
                        id={`member-${key}`}
                        role="tabpanel"
                        key={key}
                        aria-labelledby={`member-${key}-tab`}
                      >
                        {this.renderMemberBody(member)}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="team-content d-md-none">
            <div className="row">
              <div className="col-12">
                <div className="accordion" id="accordionExample">
                  {members.map((member, index) => (
                    <div className="card" key={index}>
                      <div className="card-header" id={`heading${index}`}>
                        <h5 className="mb-0">
                          <button
                            className="btn btn-link accordion-button"
                            type="button"
                            data-toggle="collapse"
                            data-target={`#collapse${index}`}
                            aria-expanded="false"
                            aria-controls={`collapse${index}`}
                          >
                            <p>{member.name}</p>
                            <div className="image-wrapper">
                              {member.image && (
                                <Img
                                  fluid={member.image}
                                  critical
                                  alt={member.name}
                                  title={member.name}
                                />
                              )}
                            </div>
                          </button>
                        </h5>
                      </div>

                      <div
                        id={`collapse${index}`}
                        className="collapse"
                        aria-labelledby={`heading${index}`}
                        data-parent="#accordionExample"
                      >
                        <div className="card-body">
                          {this.renderMemberBody(member)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default withContext(Team);
