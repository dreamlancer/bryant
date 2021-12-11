import React from 'react';
import TextSwap from '../../Shared/TextSwap';

import {
  LoupesCollectionCss,
  LoupesCollectionWrapperCss,
  CircleSwitchCss,
  CircleSwitchWrapperCss,
  PhotosContainerCss,
  SmallPhotoHolderCss,
  SmallPhotosCss,
  SmallPhotoCss,
  SmallPhotoRingCss,
  SmallCircleCss,
  SwitchItemCss,
  TeethPhotosCss,
  TeethImg1Css,
  TeethImg2Css,
  BigCircleCss,
  InfoCss,
  TechDetailsCss,
  DetailsLineCss,
  DetailsLineIconCss,
  DetailsLineTextCss,
} from './index.css';

import inView from '../../../js/in-view.min';
import WeightIcon from '!svg-react-loader!../../../../static/images/loupes/weight-icon.svg';
import FovIcon from '!svg-react-loader!../../../../static/images/loupes/fov-icon.svg';
import DofIcon from '!svg-react-loader!../../../../static/images/loupes/dof-icon.svg';

let loupes = [
  { id: '2.5x', name: '2.5x', w: '21.5', fov: '16', dof: '30-40' }, //w = weight, fov= field of view, dof= depth of focus
  { id: '2.8x', name: '2.8x', w: '26', fov: '13', dof: '20-30' },
  { id: '3.5x', name: '3.5x', w: '62', fov: '9.8', dof: '15-20' },
  { id: '5.0x', name: '5.0x', w: '75', fov: '6.2', dof: '11-14' },
  { id: '7.5x', name: '7.5x', w: '81.7', fov: '4.1', dof: '4-5' },
];

let progress = 1; //progress parameter which will displayed on circular switcher;
let progressTimer;
let zoom = 1;
let zoomArray = [0.7, 1.3, 0.75, 1.2, 2.5];

class LoupesCollection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentLoupe: 0,
      textSwitch: 0,
      entered: false,
    };

    this.circleRef = React.createRef();
    this.circleSwitchRef = React.createRef();
    this.CircleSwitchWrapperRef = React.createRef();
    this.LoupesCollectionWrapperRef = React.createRef();
    this.switchItemRef = React.createRef();

    this.updateSection = this.updateSection.bind(this);
  }

  runTimer = () => {
    //timer to move progress bar when section appaers on screen
    progressTimer = setInterval(() => {
      progress += 0.2; //speed of progress filling
      if (progress > 100) {
        progress = 100;
        clearInterval(progressTimer);
      }
      let calc = Math.floor(progress / 25);
      this.forceUpdate();
      if (this.state.currentLoupe !== calc) {
        //this.setState({ currentLoupe: calc },()=>{
        this.changeLoupe(calc, false);
        //})
      }
    }, 100);
  };
  componentDidMount = () => {
    window.addEventListener('resize', this.updateSection);
    this.changeLoupe(0); //initial set of circle switcher to zero position

    inView({
      //standart function - when section appears on user view - start progress in circular switcher, otherwise - reset it
      selector: '.loupes-collection',
      enter: () => {
        if (!this.state.entered) {
          this.setState({
            entered: true,
          });
          this.runTimer();
        }
      },
      exit: () => {
        this.setState({
          entered: false,
        });
        clearInterval(progressTimer);
        progress = 0;
      },
      offset: 0,
    });
    this.updateSection();
  };

  updateSection = () => {
    //runs when window resizes, so calculate scale for circular switch
    if (this.CircleSwitchWrapperRef.current) {
      let cw = this.LoupesCollectionWrapperRef.current.clientWidth; //width of container

      let csw = this.CircleSwitchWrapperRef.current.clientWidth; //width of circular switch

      // let calc = cw / 2.15 / (csw + 55);

      if (window.innerWidth > 1200) {
        let calc = cw / 2.15 / (csw + 55);

        if (calc < 1.15) {
          this.CircleSwitchWrapperRef.current.style.transform = `scale(${calc})`;
        }
      } else if (window.innerWidth > 767) {
        let calc = cw / 1.2 / (csw + 55);

        this.CircleSwitchWrapperRef.current.style.transform = `scale(${calc})`;
      } else {
        let calc = cw / 0.9 / (csw + 55);

        if (calc <= 1) {
          this.CircleSwitchWrapperRef.current.style.transform = `scale(${calc})`;
        }
      }
    }
    this.forceUpdate();
  };

  componentWillUnmount = () => {
    clearInterval(progressTimer);
  };

  getCircumfrence = () => {
    //getting length of big circle to place switch points after
    let cr = 0; //circle radius
    if (this.circleRef.current)
      cr = 2 * Math.PI * this.circleRef.current.r.baseVal.value;

    return cr;
  };

  map = (value, x1, y1, x2, y2) => ((value - x1) * (y2 - x2)) / (y1 - x1) + x2; //mapping one range of numbes (min,max) to another one -
  //for exmaple - input range (1-10) , output range (20 - 100)
  //in result - will get mapped  number of 'value' => value=1, result = 20, etc.
  //

  changeLoupe = (i, manual = true) => {
    //when user click on point in circular switch, or progress bar reaches next point
    progress = i * 25;

    this.setState({ currentLoupe: i }, () => {
      let nextSwitch = this.state.textSwitch === 0 ? 1 : 0; //each 'sliding' text consist of 2 layers - when one fade out - next fade it, on next switch - roles changes

      zoom = zoomArray[this.state.currentLoupe];

      this.forceUpdate();

      this.setState({ textSwitch: nextSwitch });
    });

    if (manual) clearInterval(progressTimer);
  };

  render() {
    const { lang, text, loupesCollectionImages } = this.props;
    return (
      <LoupesCollectionCss>
        {/* <SectionWrapper> */}
        {/* <div className="container" id="container"> */}
        <LoupesCollectionWrapperCss
          className="loupes-collection"
          ref={this.LoupesCollectionWrapperRef}
        >
          <CircleSwitchCss id="CircleSwitchCss">
            <CircleSwitchWrapperCss ref={this.CircleSwitchWrapperRef}>
              <PhotosContainerCss>
                <SmallPhotoHolderCss>
                  <SmallPhotosCss>
                    {loupes.map((loupe, index) => {
                      return (
                        <SmallPhotoCss
                          className={
                            this.state.currentLoupe === index ? 'show' : ''
                          }
                          key={index}
                          fluid={
                            loupesCollectionImages['loupesImg' + (index + 1)]
                              .childImageSharp.fluid
                          }
                        />
                      );
                    })}
                  </SmallPhotosCss>
                  <SmallPhotoRingCss
                    width="100%"
                    height="100%"
                    preserveAspectRatio="none"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="50%"
                      cy="50%"
                      r="49.5%"
                      stroke="#EAEAEA"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                    />
                  </SmallPhotoRingCss>

                  <SmallCircleCss
                    width="100%"
                    height="100%"
                    preserveAspectRatio="none"
                    fill="#111111"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="50%"
                      cy="50%"
                      r="49.5%"
                      stroke="#EAEAEA"
                      strokeWidth="0"
                      strokeMiterlimit="10"
                    />
                    <clipPath id="clipSmall">
                      <circle cx="50%" cy="50%" r="49.5%" />
                    </clipPath>
                  </SmallCircleCss>
                </SmallPhotoHolderCss>

                {//place "points" around a circle
                loupes.map((loupe, index) => {
                  let radius = 200;

                  let x,
                    y,
                    cx,
                    cy = 0;
                  if (this.circleRef.current) {
                    radius = this.circleRef.current.r.baseVal.value;
                    let item = this.switchItemRef.current;

                    cx =
                      this.circleRef.current.cx.baseVal.value -
                      parseInt(item.clientWidth) / 2; //shift on half  of point width/height
                    cy =
                      this.circleRef.current.cy.baseVal.value -
                      parseInt(item.clientHeight) / 2;

                    x =
                      cx - radius * Math.cos((index * 2 * Math.PI) / 6 + 0.52); //0.52 - is approx 30deg in radians - shift on 30deg  according to arc
                    y =
                      cy - radius * Math.sin((index * 2 * Math.PI) / 6 + 0.52);

                    var left = 'auto';
                    var top = 'auto';
                    var right = 'auto';
                    var bottom = 'auto';

                    if (index === 0) {
                      left = 0;
                    }
                    if (index === 1) {
                      top = 0;
                    }
                    if (index === 2 || index === 3) {
                      right = 0;
                    }
                    if (index === 4) {
                      bottom = 0;
                    }
                  }
                  return (
                    <SwitchItemCss
                      ref={this.switchItemRef}
                      key={index}
                      className={
                        this.state.currentLoupe >= index ? 'selected' : ''
                      }
                      style={{ left: x, top: y }}
                      onClick={() => this.changeLoupe(index)}
                    >
                      <p
                        style={{
                          left: left,
                          top: top,
                          right: right,
                          bottom: bottom,
                        }}
                        id="txt"
                      >
                        {loupe.name}
                      </p>
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          id="point"
                          cx="20"
                          cy="20"
                          r="18.25"
                          fill="#111111"
                          stroke="#A1A1A1"
                          strokeWidth="2"
                        />
                      </svg>
                    </SwitchItemCss>
                  );
                })}

                <TeethPhotosCss>
                  <TeethImg1Css
                    zoom={zoom}
                    show={this.state.currentLoupe < 2 ? 'true' : ''}
                  />
                  <TeethImg2Css
                    zoom={zoom}
                    shift={
                      this.CircleSwitchWrapperRef.current &&
                      this.CircleSwitchWrapperRef.current.clientWidth / 2
                    }
                    show={this.state.currentLoupe > 1 ? 'true' : ''}
                  />
                </TeethPhotosCss>

                <BigCircleCss
                  width="100%"
                  height="100%"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="50%"
                    cy="50%"
                    r="49%"
                    stroke="#A1A1A1"
                    strokeDasharray={this.getCircumfrence()}
                    strokeDashoffset={this.getCircumfrence() * 0.3334}
                    ref={this.circleRef}
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                  <circle
                    cx="50%"
                    cy="50%"
                    r="49%"
                    stroke="#3A97C9"
                    className="circle-blue"
                    strokeDasharray={this.getCircumfrence()}
                    strokeDashoffset={
                      this.getCircumfrence() *
                      this.map(progress, 0, 100, 1, 0.3334)
                    }
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />

                  <clipPath id="clipTeeth">
                    <circle cx="50%" cy="50%" r="40%" />
                  </clipPath>
                </BigCircleCss>
              </PhotosContainerCss>
            </CircleSwitchWrapperCss>
          </CircleSwitchCss>

          <TextSwap
            step={this.state.currentLoupe}
            textArray={loupes.map(item => (
              <InfoCss>
                <h2>{text[`Title${item.id}`][lang ? lang : 'en']}</h2>
                <p>{text[`Text${item.id}`][lang ? lang : 'en']}</p>
              </InfoCss>
            ))}
          />
          <TechDetailsCss>
            <DetailsLineCss>
              <DetailsLineIconCss>
                <WeightIcon />
              </DetailsLineIconCss>
              <DetailsLineTextCss>
                <h6>{text['tableWeight'][lang ? lang : 'en']}</h6>
                <TextSwap
                  step={this.state.currentLoupe}
                  textArray={loupes.map(item => (
                    <h2>{item.w + ' ' + text['tableG'][lang ? lang : 'en']}</h2>
                  ))}
                />
              </DetailsLineTextCss>
            </DetailsLineCss>
            <DetailsLineCss>
              <DetailsLineIconCss>
                <FovIcon />
              </DetailsLineIconCss>
              <DetailsLineTextCss>
                <h6>{text['tableFOVsimple'][lang ? lang : 'en']}</h6>
                <TextSwap
                  step={this.state.currentLoupe}
                  textArray={loupes.map(item => (
                    <h2>
                      {item.fov + ' ' + text['tableCm'][lang ? lang : 'en']}
                    </h2>
                  ))}
                />
              </DetailsLineTextCss>
            </DetailsLineCss>
            <DetailsLineCss className="last">
              <DetailsLineIconCss>
                <DofIcon />
              </DetailsLineIconCss>
              <DetailsLineTextCss>
                <h6>{text['tableDOF'][lang ? lang : 'en']}</h6>
                <TextSwap
                  step={this.state.currentLoupe}
                  textArray={loupes.map(item => (
                    <h2>
                      {item.dof + ' ' + text['tableCm'][lang ? lang : 'en']}
                    </h2>
                  ))}
                />
              </DetailsLineTextCss>
            </DetailsLineCss>
          </TechDetailsCss>
        </LoupesCollectionWrapperCss>
        {/* </div> */}
        {/* </SectionWrapper> */}
      </LoupesCollectionCss>
    );
  }
}

export default LoupesCollection;
