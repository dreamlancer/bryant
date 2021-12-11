import React from 'react';
import { graphql } from 'gatsby';
import { Router, Redirect } from '@reach/router';

import Seo from '../components/Seo';
import StoreList from '../components/Store/StoreList';
import ProductPage from '../components/Store/ProductPage';

class Store extends React.Component {
  render() {
    const {
      data,
      data: { map },
      location,
    } = this.props;

    return (
      <div>
        <h1
          style={{
            color: 'white',
            height: '10px',
            margin: '0',
            marginBottom: '-10px',
          }}
        >
          Store
        </h1>
        <Seo
          title="Store"
          url="bryant-store/all"
          keywords="bryant dental, dental loupes headlight, formula 42, wireless headlight, wireless dental headlight, professional dental headlight"
          description="Bryant Dental Headlight and Loupes can be ordered online at the guaranteed lowest price. Free next-day delivery and free 45-day returns on all our items as standard."
        />
        <Router>
          <Redirect from="/bryant-store" to="/bryant-store/all" noThrow />
          <Redirect from="/bryant-store/" to="/bryant-store/all" noThrow />
          <StoreList path="/bryant-store/all" />
          <ProductPage
            path="/bryant-store/:item"
            map={map}
            data={data}
            location={location}
          />
        </Router>
      </div>
    );
  }
}

export default Store;

export const query = graphql`
  query {
    prod1: file(relativePath: { eq: "store/prod-1.jpg" }) {
      childImageSharp {
        fluid(maxHeight: 800, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    prod2: file(relativePath: { eq: "store/prod-2.jpg" }) {
      childImageSharp {
        fluid(maxHeight: 800, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    prod3: file(relativePath: { eq: "store/prod-3.jpg" }) {
      childImageSharp {
        fluid(maxHeight: 800, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    prod4: file(relativePath: { eq: "store/prod-4.jpg" }) {
      childImageSharp {
        fluid(maxHeight: 800, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    prod5: file(relativePath: { eq: "store/prod-5.jpg" }) {
      childImageSharp {
        fluid(maxHeight: 800, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    prod6: file(relativePath: { eq: "store/prod-6.jpg" }) {
      childImageSharp {
        fluid(maxHeight: 800, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    arrowRight: file(relativePath: { eq: "arrow-right.png" }) {
      childImageSharp {
        fluid(maxHeight: 800, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    arrowLeft: file(relativePath: { eq: "arrow-left.png" }) {
      childImageSharp {
        fluid(maxHeight: 800, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    map: file(relativePath: { eq: "map.png" }) {
      childImageSharp {
        fluid(maxHeight: 800, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`;
