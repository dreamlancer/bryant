import React, { Component } from 'react';
import { StaticQuery, graphql } from 'gatsby';

import Swiper from 'swiper';
import inView from 'js/in-view.min';
import disableScroll from 'disable-scroll';
import Button from '../../Shared/Button';
import computeIsMobile from 'js/isMobile';
import './index.scss';
import ImagesModal from '../../ImagesModal';

const isMobile = computeIsMobile();
let mySwiper = null;

class LoupesGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalImageIndex: 0,
      isImagesModalOpen: false,
      showGallery: false,
    };
  }

  componentDidMount() {
    inView({
      selector: '.slide-explanation',
      enter: el => {
        el.classList.add('active');
      },
      offset: isMobile ? 0.7 : 0.5,
      exit: el => {
        el.classList.remove('active');
      },
    });
    mySwiper = new Swiper('.swiper-gallery', {
      loop: false,
      slidesPerView: isMobile ? 1 : 2,
      speed: 250,
      height: '100vh',
      direction: 'horizontal',
      spaceBetween: 50,
      // effect: 'fade',
      // fadeEffect: {
      //   crossFade: true,
      // },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      // autoplay: {
      // delay: 7000,
      // disableOnInteraction: false,
      // },
    });
  }
  componentWillUnmount() {
    if (mySwiper) {
      mySwiper.destroy(true, true);
    }
  }

  handleOpenModal = imageIndex => {
    disableScroll.on();
    this.setState({
      isImagesModalOpen: true,
      modalImageIndex: imageIndex,
    });
  };

  handleCloseModal = () => {
    disableScroll.off();
    this.setState({ isImagesModalOpen: false });
  };

  computeGalleryImages = images => {
    return images.map(img => img.fluid.src);
  };

  showGallery = () => {
    this.setState({ showGallery: true });
  };

  render() {
    const {
      state: { modalImageIndex, isImagesModalOpen, showGallery },
      props: { images },
      computeGalleryImages,
      handleOpenModal,
      handleCloseModal,
    } = this;

    const imagesLen = images.length;
    const arr = Array(Math.ceil(imagesLen / 2)).fill(0);

    return (
      <div className="loupes-gallery">
        <div
          className={`gallery-wrapper ${
            showGallery ? 'open-gallery' : 'close-gallery'
          }`}
        >
          <div className="gallery-left">
            <div className="wrapper-left">
              <h2>View our gallery</h2>
              <p>
                For a closer look and inspection, take a trip around our gallery
                of dental loupes to see what peaks your interest
              </p>
              <Button type="primary" onClick={this.showGallery}>
                Open gallery
              </Button>
            </div>
          </div>
          <div className="gallery-right swiper-gallery">
            <i
              onClick={() => this.setState({ showGallery: false })}
              className={`close-circle far fa-times-circle ${
                showGallery ? '' : 'hidden'
              }`}
            />
            <div
              className={`gallery-overlay ${showGallery ? 'hidden' : ''}`}
              onClick={this.showGallery}
            />

            <div
              className="swiper-button-prev"
              style={{ display: showGallery ? 'block' : 'none' }}
            />
            <div
              className="swiper-button-next"
              style={{ display: showGallery ? 'block' : 'none' }}
            />

            <div className="swiper-wrapper">
              {arr.map((nothing, index) => {
                return (
                  <div className="swiper-slide" key={index}>
                    <div
                      className="img-wrapper gallery-img"
                      name={`${2 * index}`}
                      onClick={() => {
                        handleOpenModal(2 * index);
                      }}
                    >
                      <img
                        src={images[2 * index].fluid.src}
                        alt={images.alt}
                        title={images.title}
                      />
                    </div>
                    {images[2 * index + 1] && (
                      <div
                        className="img-wrapper gallery-img"
                        name={`${2 * index + 1}`}
                        onClick={() => handleOpenModal(2 * index + 1)}
                      >
                        <img
                          src={images[2 * index + 1].fluid.src}
                          alt={images.alt}
                          title={images.title}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <ImagesModal
          imageIndexClicked={modalImageIndex}
          images={computeGalleryImages(images)}
          isModalOpen={isImagesModalOpen}
          onOpenModal={handleOpenModal}
          onCloseModal={handleCloseModal}
          isMobile={isMobile}
        />
      </div>
    );
  }
}

export default () => (
  <StaticQuery
    query={graphql`
      query gallery {
        gallery1: file(relativePath: { eq: "loupes/gallery/gallery-1.png" }) {
          childImageSharp {
            fluid(maxHeight: 500, quality: 90) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        gallery2: file(relativePath: { eq: "loupes/gallery/gallery-2.png" }) {
          childImageSharp {
            fluid(maxHeight: 500, quality: 90) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        gallery3: file(relativePath: { eq: "loupes/gallery/gallery-13.png" }) {
          childImageSharp {
            fluid(maxHeight: 500, quality: 90) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        gallery4: file(relativePath: { eq: "loupes/gallery/gallery-4.png" }) {
          childImageSharp {
            fluid(maxHeight: 500, quality: 90) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        gallery5: file(relativePath: { eq: "loupes/gallery/gallery-5.png" }) {
          childImageSharp {
            fluid(maxHeight: 500, quality: 90) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        gallery6: file(relativePath: { eq: "loupes/gallery/gallery-6.png" }) {
          childImageSharp {
            fluid(maxHeight: 500, quality: 90) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        gallery7: file(relativePath: { eq: "loupes/gallery/gallery-7.png" }) {
          childImageSharp {
            fluid(maxHeight: 500, quality: 90) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        gallery8: file(relativePath: { eq: "loupes/gallery/gallery-14.png" }) {
          childImageSharp {
            fluid(maxHeight: 500, quality: 90) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        gallery9: file(relativePath: { eq: "loupes/gallery/gallery-9.png" }) {
          childImageSharp {
            fluid(maxHeight: 500, quality: 90) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        gallery10: file(relativePath: { eq: "loupes/gallery/gallery-10.png" }) {
          childImageSharp {
            fluid(maxHeight: 500, quality: 90) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        gallery11: file(relativePath: { eq: "loupes/gallery/gallery-11.png" }) {
          childImageSharp {
            fluid(maxHeight: 500, quality: 90) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        gallery12: file(relativePath: { eq: "loupes/gallery/gallery-12.png" }) {
          childImageSharp {
            fluid(maxHeight: 500, quality: 90) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `}
    render={data => {
      const images = [
        {
          fluid: data.gallery1.childImageSharp.fluid,
          alt: 'Bryant dental - 2.5x loupes front with black frame',
          title: 'Bryant dental - 2.5x loupes front with black frame',
        },
        {
          fluid: data.gallery2.childImageSharp.fluid,
          alt: 'Bryant dental - 2.5x loupes side with black frame',
          title: 'Bryant dental - 2.5x loupes side with black frame',
        },
        {
          fluid: data.gallery3.childImageSharp.fluid,
          alt: 'Bryant dental - 2.8x rounded frames',
          title: 'Bryant dental - 2.8x rounded frames',
        },
        {
          fluid: data.gallery4.childImageSharp.fluid,
          alt: 'Bryant dental - 2.8x loupes angle',
          title: 'Bryant dental - 2.8x loupes angle',
        },
        {
          fluid: data.gallery5.childImageSharp.fluid,
          alt: 'Bryant dental - 2.8x loupes front',
          title: 'Bryant dental - 2.8x loupes front',
        },
        {
          fluid: data.gallery6.childImageSharp.fluid,
          alt: 'Bryant dental - 3.5x loupes angle',
          title: 'Bryant dental - 3.5x loupes angle',
        },
        {
          fluid: data.gallery7.childImageSharp.fluid,
          alt: 'Bryant dental - 5.0x loupes side',
          title: 'Bryant dental - 5.0x loupes side',
        },
        {
          fluid: data.gallery8.childImageSharp.fluid,
          alt: 'Bryant dental - 3.5x loupes front close orange',
          title: 'Bryant dental - 3.5x loupes front close orange',
        },
        {
          fluid: data.gallery9.childImageSharp.fluid,
          alt: 'Bryant dental - 5.0x loupes front close',
          title: 'Bryant dental - 5.0x loupes front close',
        },
        {
          fluid: data.gallery10.childImageSharp.fluid,
          alt: 'Bryant dental - Matt Black Box',
          title: 'Bryant dental - Matt Black Box',
        },
        {
          fluid: data.gallery11.childImageSharp.fluid,
          alt: 'Bryant dental - Matt Black Box Open',
          title: 'Bryant dental - Matt Black Box Open',
        },
        {
          fluid: data.gallery12.childImageSharp.fluid,
          alt: 'Bryant dental - Glasses',
          title: 'Bryant dental - Glasses',
        },
      ];
      return <LoupesGallery images={images} />;
    }}
  />
);
