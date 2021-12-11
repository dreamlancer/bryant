// A simple wrapper that will center the content
// And keep consistent the distances
// To be used just as a container not to add colors or anything else

import React, { Component } from 'react';
import styled from 'styled-components';

const SectionWrapperCss = styled.div`
  padding: 5rem 1rem;
  font-size: 1rem;
  position: relative;
  display: block;
  color: white;
`;

class SectionWrapper extends Component {
  render() {
    const { children, fluid } = this.props;
    return (
      <SectionWrapperCss
        className={fluid ? 'container-fluid' : 'container'}
        id="container"
      >
        {children}
      </SectionWrapperCss>
    );
  }
}

export default SectionWrapper;
