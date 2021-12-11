import React from 'react';
import ReviewsSection from '../../ReviewsSection';

class LoupesReviews extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      text,
      lang,
      reviewLoupes25,
      reviewLoupes28,
      reviewLoupes35,
      reviewLoupes50,
      reviewLoupes75,
    } = this.props;

    const reviews = [
      {
        author: 'Miten Daji',
        date: '29.12.2018',
        productImage: reviewLoupes35.childImageSharp.fluid,
        productMagnification: '3.5x',
        message: [
          // eslint-disable-next-line
          "Amazing loupes, as a first time user i went for the 3.5x and literally cannot work without them! Connor's team made getting the loupes so easy and he talked me through all the stages. Being a dentist himself he understands the struggles of working in the industry and the need for excellent magnification. I would highly recommend anybody looking for loupes to consider Bryant Dental!",
        ],
        stars: 5,
        isVerifiedBuyer: true,
      },
      {
        author: 'Anish',
        date: '10.03.2017',
        productImage: reviewLoupes28.childImageSharp.fluid,
        productMagnification: '2.8x',
        message: [
          'I bought the xenosys loupes and lumadent light from Connor, received a fantastic service with a demo at a place that suited me and a quick turnaround once I placed the order, the loupes are excellent and have improved my clinical dentistry and posture, Connor also provided a brand new hard shell case months after my purchase, would definitely recommend.',
        ],
        stars: 5,
        isVerifiedBuyer: true,
      },
      {
        author: 'Drisna Gorasia',
        date: '05.05.2018',
        productImage: reviewLoupes50.childImageSharp.fluid,
        productMagnification: '5.0x',
        message: [
          'Really pleased with my new loupes. Was dubious about going for the higher magnification (5x), but Priyam convinced me I would not regret my choice. He was right. I absolutely love them. They are super ligtweight compared to others and I love the frame. Great service amazing loupes!',
        ],
        stars: 5,
        isVerifiedBuyer: true,
      },
      {
        author: 'Samantha',
        date: '25.05.2017',
        productImage: reviewLoupes25.childImageSharp.fluid,
        productMagnification: '2.5x',
        message: [
          'Excellent service throughout & fab product. Regular updates on my order and they guys were on hand to answer any questions I had.  Loupes took a little while to arrive but are 100% worth the wait they are amazing. Highly recommend Bryant dental !',
        ],
        stars: 5,
        isVerifiedBuyer: true,
      },
      {
        author: 'Alison Guilmartin',
        date: '04.09.2018',
        productImage: reviewLoupes35.childImageSharp.fluid,
        productMagnification: '3.5x',
        message: [
          'My loupes are absolutely fantastic, couldn’t be happier. Connor made the whole process very easy and I’d highly recommend other dentists getting their loupes from Bryant Dental. 5 star service and quality.',
        ],
        stars: 5,
        isVerifiedBuyer: true,
      },
      {
        author: 'Paul Simmons',
        date: '20.06.2018',
        productImage: reviewLoupes50.childImageSharp.fluid,
        productMagnification: '5.0x',
        message: [
          // eslint-disable-next-line
          "After a slight delay in getting my loupes, my god was it worth the wait! I've previously used 3 pairs of orascoptics and after returning the interchangeable magnification ones, I was advised to go straight to 5x. I use them for everything and they are lighter than my old 2.5x. Almost every dentist in our practice now uses bryant loupes, and were still working on the owner.",
        ],
        stars: 5,
        isVerifiedBuyer: true,
      },
    ];

    return <ReviewsSection text={text} lang={lang} reviews={reviews} />;
  }
}

export default LoupesReviews;
