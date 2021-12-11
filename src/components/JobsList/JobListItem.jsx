import React, { Component } from 'react';

class JobListItem extends Component {
  render() {
    const { job, lang, text } = this.props;
    return (
      <div className="jobs-list-item">
        <div className="container">
          <div className="row">
            <div className="col-md-10 offset-md-1 lazy-title">
              <h1 className="list-item-title">{job.title}</h1>
              <h3 className="list-item-sub-title">{job.subTitle}</h3>
              <p className="list-item-description">{job.description}</p>
              <button className="btn blue-btn" onClick={this.props.openForm}>
                <span
                  dangerouslySetInnerHTML={{
                    __html: text.registerInterest[lang]
                      ? text.registerInterest[lang]
                      : text.registerInterest['en'],
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default JobListItem;
