import React from 'react';
import ReviewsSection from '../../ReviewsSection';

class HeadlightsReviews extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { text, lang, reviewIgnis } = this.props;

    const reviews = [
      {
        author: 'Anish Berry',
        date: '20.12.2018',
        productImage: reviewIgnis.childImageSharp.fluid,
        message: [
          'The Xenosys Loupes really do everything they promise to and more - brilliant build quality, excellent design, and they just work! Coupled with the Ignis light they are absolutely fantastic and have become a huge factor in improving clinical skills and outcomes in dentistry and facial aesthetics. Many thanks to the Bryant Dental team.',
        ],
        stars: 5,
        isVerifiedBuyer: true,
      },
      {
        author: 'Gurpeet',
        date: '14.11.2018',
        productImage: reviewIgnis.childImageSharp.fluid,
        message: [
          'I was pretty sick and tired of my XV1s from orascoptic. They were the first ones I had from dental school (over 5 years ago). By the end of the day they got quite heavy, and always feeling tight in the traps after a day of using them. I was interested but wanted to make the right choice as I probably will use my next set for another 5 years. I saw excellent feedback, pretty much all 5 star reviews for a company in this era is practically unheard of.',
        ],
        stars: 5,
        isVerifiedBuyer: true,
      },
      {
        author: 'Arjan Singh',
        date: '08.12.2018',
        productImage: reviewIgnis.childImageSharp.fluid,
        message: [
          'A genuine game changer! 6 months on from purchasing my 5 mag loupes and I can truley say they have improved the care I provide for my patients, I would not feel comfortable to work without them. They are extremely light and the ignis wireless light works effortlessly. I have been extremely impressed with the quality from Bryant Dental and they have been fantastic at helping to tailor the loupes over my Turban and checking up on how I am getting on with the loupes, I cannot recommend these guys enough! Thank you so much!',
        ],
        stars: 5,
        isVerifiedBuyer: true,
      },
      {
        author: 'Vishal Patel',
        date: '28.02.2019',
        productImage: reviewIgnis.childImageSharp.fluid,
        message: [
          'Bryant dental have been honestly incredible. From their customer service to the delivery of the loupes, the quality of the loupes has just been outstanding. Both me and my wife have brought loupes with them and I would have no hesistation I’m recommending them to all my colleagues or in fact any clinician. The most impressive aspect for me was their after care service. I had a faulty part and within 24 hours of speaking to Priyam a replacement part was sitting at my door step. I would like to thank the whole team but specially Priyam, Lucy and Wendy.',
        ],
        stars: 5,
        isVerifiedBuyer: true,
      },
      {
        author: 'Zahra Javed',
        date: '14.09.2018',
        productImage: reviewIgnis.childImageSharp.fluid,
        message: [
          'I had been working with 2.5x magnification for a few years and decided that it was about time to upgrade my loupes. The loupes are also so much lighter than some of the other companies out there... which after a long day of work I am very thankful for. And the light is fantastic and lasts all day! I am so happy with my purchase and I’d also like to give a special thanks to Connor and his team for customer service.',
        ],
        stars: 5,
        isVerifiedBuyer: true,
      },
    ];

    return (
      <ReviewsSection
        text={text}
        lang={lang}
        reviews={reviews}
        page="headlights"
      />
    );
  }
}

export default HeadlightsReviews;
