import React, { Component } from 'react';
import JobListItem from './JobListItem';

class JobsList extends Component {
  render() {
    const { jobs, openForm, lang, text } = this.props;

    return (
      <div className="jobs-list-container">
        <div className="jobs-list">
          {jobs &&
            jobs.length > 0 &&
            jobs.map((job, index) => (
              <JobListItem
                key={index}
                job={job}
                openForm={openForm}
                lang={lang}
                text={text}
              />
            ))}
        </div>
      </div>
    );
  }
}

export default JobsList;
