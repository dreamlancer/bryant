import React, { Component } from 'react';
import Konva from 'konva';

import text from '../../../text/loupes.text';
import './index.scss';
import arr from './img/cursor-rotation.png';

class LoupesSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      id: null,
    };

    this.contrRef = React.createRef();
    this.parentContrRef = React.createRef();
    this.spinRef = React.createRef();
  }

  componentDidMount() {
    // now we need to fit stage into parent
    let containerWidth;
    const stageWidth = 1900;
    const stageHeight = 800;

    let stage = new Konva.Stage({
      container: 'container',
      width: stageWidth,
      height: stageHeight,
    });

    // add canvas element
    let layer = new Konva.Layer();
    stage.add(layer);

    // create shape
    let box = [];
    const textContent = ['3.5X', '5.0X', '7.5X', '2.5X', '2.8X'];
    const textBottom = ['3.5x', '5.0x', '7.5x ', '2.5x', '2.8x'];
    const angleArrRight = [-111, -90, -69, -56, -43, -30];
    const angleArrLeft = [-137, -124, -111, -90, -69, -56];
    const angleArrNew = [-124, -111, -90, -69, -56];

    // crete 5 point
    for (let i = 0; i < 5; i++) {
      let grayCircle = new Konva.Circle({
        radius: 70,
        fill: '#111111',
        stroke: '#A1A1A1',
        strokeWidth: 2,
      });

      let whiteText = new Konva.Text({
        x: -65,
        y: -15,
        width: 130,
        fontSize: 40,
        text: textContent[i],
        align: 'center',
        fill: '#A1A1A1',
        fontFamily: 'Yantramanav light',
        opacity: 1,
      });

      let imageObj = new window.Image();
      imageObj.src = this.props.img[i];
      let img = new Konva.Image({
        image: imageObj,
        x: -440,
        y: -200,
        width: 892,
        height: 292,
        opacity: 0,
        id: i,
      });
      let bottomText = new Konva.Group({
        x: -120,
        y: 130,
        width: 235,
        draggable: false,
        opacity: 0,
      });
      let afterBottomText = new Konva.Text({
        x: i === 2 ? 95 : 75,
        fontSize: 55,
        text: textBottom[i],
        fill: '#EAEAEA',
        fontFamily: 'Yantramanav light',
        opacity: 1,
      });
      let beforeBottomText = new Konva.Text({
        x: 50,
        y: 20,
        fontSize: 16,
        text: 'NEW',
        fill: '#EAEAEA',
        fontFamily: 'Yantramanav',
        opacity: 1,
      });

      i === 2 && bottomText.add(beforeBottomText);
      bottomText.add(afterBottomText);

      box[i] = new Konva.Group({
        x: -200,
        y: 0,
        draggable: false,
        ang: angleArrNew[i],
      });

      img.on('mousedown', event => {
        // if (event.currentTarget.parent.attrs.main) {
        //   event.cancelBubble = true;
        //   event.currentTarget.opacity(0);
        //   window.img = event.currentTarget;
        //   this.setState({ id: event.currentTarget.attrs.id, open: true });
        // }
      });
      img.on('mouseover', event => {
        // if (event.currentTarget.parent && event.currentTarget.parent.attrs.main) {
        //   this.parentContrRef.current.classList.add('cursor-rotation');
        // }
      });
      img.on('mouseout', event => {
        // if (event.currentTarget.parent && event.currentTarget.parent.attrs.main) {
        //   this.parentContrRef.current.classList.remove('cursor-rotation');
        // }
      });
      box[i]
        .add(grayCircle)
        .add(whiteText)
        .add(img)
        .add(bottomText);
      box[i].aproveRotation = angleArrRight[i];
      box[i].aproveRotationLeft = angleArrLeft[i];

      layer.add(box[i]);
    }

    //creating duplicates
    const createDuplicate = (obj, side) => {
      const angle =
        side == 'left'
          ? box[0].attrs.ang - 13
          : box[box.length - 1].attrs.ang + 13;
      const grayCircle = new Konva.Circle({ ...obj.children[0].attrs });
      const whiteText = new Konva.Text({ ...obj.children[1].attrs });
      const imageObj = new Konva.Image({ ...obj.children[2].attrs });

      let objText = obj.children[3].children[1];
      let beforeBottomText =
        objText && new Konva.Text({ ...obj.children[3].children[1].attrs });

      const afterBottomText = new Konva.Text({
        ...obj.children[3].children[0].attrs,
      });

      const bottomText = new Konva.Group({
        x: -120,
        y: 130,
        width: 235,
        draggable: false,
        opacity: 0,
      });
      objText && bottomText.add(beforeBottomText);
      bottomText.add(afterBottomText);
      const elem = new Konva.Group({
        x: -200,
        y: 0,
        draggable: false,
        ang: angle,
        zIndex: 1,
      });

      imageObj.on('mousedown', event => {
        // if (event.currentTarget.parent.attrs.main) {
        //   event.cancelBubble = true;
        //   event.currentTarget.opacity(0);
        //   window.img = event.currentTarget;
        //   this.setState({ id: event.currentTarget.attrs.id, open: true });
        // }
      });
      imageObj.on('mouseover', event => {
        // if (event.currentTarget.parent && event.currentTarget.parent.attrs.main) {
        //   this.parentContrRef.current.classList.add('cursor-rotation');
        // }
      });
      imageObj.on('mouseout', event => {
        // if (event.currentTarget.parent && event.currentTarget.parent.attrs.main) {
        //   this.parentContrRef.current.classList.remove('cursor-rotation');
        // }
      });
      elem
        .add(grayCircle)
        .add(whiteText)
        .add(imageObj)
        .add(bottomText);
      layer.add(elem);

      if (side == 'left') {
        elem.aproveRotation = angleArrRight[0] - 13;
        elem.aproveRotationLeft = angleArrLeft[0] - 13;
        box.unshift(elem);
      } else if (side == 'right') {
        elem.aproveRotation = angleArrRight[5];
        elem.aproveRotationLeft = angleArrLeft[5];
        box.push(elem);
      }
    };

    // animation of the carousel
    layer.draw();
    let amplitude = 250;
    let StartMousePos;
    let MoveMousePos;
    let AnimationMousePos;
    let speed = 0.015;
    let stageTouched = false;
    let calc = 0;
    let position = '';

    let MoveMousePos3d;
    let AnimationMousePos3d;
    let calc3d;
    let imageId = 0;
    let stageTouched3d = false;
    let rotateIndex = 0;

    let angularVelocity = 6;

    let GlobalGrowUp = false;

    box[2].children[0].attrs.radius = 270;
    box[2].children[0].attrs.stroke = '#FAFAFA';
    box[2].children[2].opacity(1);
    box[2].children[1].opacity(0);
    box[2].children[3].opacity(1);
    box[2].attrs.main = true;
    box[2].zIndex(10);
    let anim = new Konva.Animation(function(frame) {
      calc = Math.abs(AnimationMousePos - MoveMousePos);

      if (stageTouched && !GlobalGrowUp) {
        if (AnimationMousePos < MoveMousePos) {
          speed += calc / 400;
          angularVelocity += calc / 30;
          position = 'right';
          //speed = 0.5
        } else if (MoveMousePos < AnimationMousePos) {
          speed += calc / 400;
          position = 'left';
          angularVelocity += calc / 30;
        }
      }

      let angularFriction = 0.2;
      let angularVelocityChange =
        (angularVelocity * frame.timeDiff * (1 - angularFriction)) / 1000;
      angularVelocity -= angularVelocityChange;

      let rotate = (frame.timeDiff * angularVelocity) / 1000;
      if (GlobalGrowUp) {
        stageTouched = false;
      }
      for (let i = 0; i < box.length; i++) {
        if (position === 'right') {
          box[i].children[0].attrs.stroke = '#A1A1A1';
          if (box[i].attrs.main) {
            box[i].children[0].attrs.stroke = '#FAFAFA';
            angularVelocity =
              Math.abs(box[i - 1].attrs.ang + 90) <= 15 ? 60 : angularVelocity;
            box[i - 1].attrs.growUp = Math.abs(box[i - 1].attrs.ang + 90) <= 15;

            if (Math.abs(box[i - 1].attrs.ang + 90) <= 15) {
              GlobalGrowUp = true;
            }
            if (box[i - 1].attrs.ang + 90 >= 0) {
              for (let j = 0; j < box.length; j++) {
                box[j].aproveRotation = angleArrRight[j];
                box[j].aproveRotationLeft = angleArrLeft[j];
              }
              angularVelocity = 0;
              box[i].attrs.main = false;
              box[i].zIndex(1);
              box[i - 1].attrs.main = true;
              box[i - 1].zIndex(10);
              rotate = 0;
            }
          }

          rotateIndex = 1;
        } else if (position === 'left') {
          box[i].children[0].attrs.stroke = '#A1A1A1';
          if (box[i].attrs.main) {
            box[i].children[0].attrs.stroke = '#FAFAFA';
            angularVelocity =
              Math.abs(box[i + 1].attrs.ang + 90) <= 15 ? 60 : angularVelocity;
            box[i + 1].attrs.growUp = Math.abs(box[i + 1].attrs.ang + 90) <= 15;

            if (Math.abs(box[i + 1].attrs.ang + 90) <= 15) {
              GlobalGrowUp = true;
            }
            if (box[i + 1].attrs.ang + 90 <= 0) {
              for (let j = 0; j < box.length; j++) {
                box[j].aproveRotation = angleArrRight[j];
                box[j].aproveRotationLeft = angleArrLeft[j];
              }
              angularVelocity = 0;
              box[i].attrs.main = false;
              box[i + 1].attrs.main = true;
              box[i].zIndex(1);
              box[i + 1].zIndex(10);
              rotate = 0;
            }
          }
          rotateIndex = -1;
        }
        if (
          box[i].attrs.ang + rotateIndex * rotate >= box[i].aproveRotation &&
          position === 'right'
        ) {
          box[i].attrs.ang = box[i].aproveRotation;
        } else if (
          box[i].attrs.ang + rotateIndex * rotate <=
            box[i].aproveRotationLeft &&
          position === 'left'
        ) {
          box[i].attrs.ang = box[i].aproveRotationLeft;
        } else {
          box[i].attrs.ang = box[i].attrs.ang + rotateIndex * rotate;
        }
        if (box[i].attrs.growUp && box[i].children[0].attrs.radius <= 260) {
          box[i].children[0].attrs.radius += 10;
          box[i].children[2].opacity(
            +(
              box[i].children[2].opacity() +
              (box[i].children[2].opacity() < 1 ? 0.1 : 0)
            ).toFixed(1)
          );
          box[i].children[3].opacity(
            +(
              box[i].children[3].opacity() +
              (box[i].children[3].opacity() < 1 ? 0.1 : 0)
            ).toFixed(1)
          );
          box[i].children[1].opacity(
            +(
              box[i].children[1].opacity() +
              (box[i].children[1].opacity() >= 0.1 ? -0.1 : 0)
            ).toFixed(1)
          );

          if (position == 'left' && box[i - 1].children[0].attrs.radius > 70) {
            box[i - 1].children[0].attrs.radius -= 10;
            box[i - 1].children[2].opacity(
              +(
                box[i - 1].children[2].opacity() +
                (box[i - 1].children[2].opacity() > 0 ? -0.1 : 0)
              ).toFixed(1)
            );
            box[i - 1].children[3].opacity(
              box[i - 1].children[3].attrs.opacity +
                (box[i - 1].children[3].attrs.opacity > 0.1 ? -0.1 : 0)
            );
            box[i - 1].children[1].opacity(
              box[i - 1].children[1].attrs.opacity +
                (box[i - 1].children[1].attrs.opacity < 1 ? 0.1 : 0)
            );

            box[i - 1].attrs.growUp = false;
          } else if (
            position == 'right' &&
            box[i + 1].children[0].attrs.radius > 70
          ) {
            box[i + 1].children[0].attrs.radius -= 10;
            box[i + 1].children[2].opacity(
              +(
                box[i + 1].children[2].opacity() +
                (box[i + 1].children[2].opacity() > 0 ? -0.1 : 0)
              ).toFixed(1)
            );
            box[i + 1].children[3].opacity(
              box[i + 1].children[3].attrs.opacity +
                (box[i + 1].children[3].attrs.opacity > 0.1 ? -0.1 : 0)
            );
            box[i + 1].children[1].opacity(
              box[i + 1].children[1].attrs.opacity +
                (box[i + 1].children[1].attrs.opacity < 1 ? 0.1 : 0)
            );
            box[i + 1].attrs.growUp = false;
          }
        } else if (
          box[i].attrs.growUp &&
          box[i].children[0].attrs.radius >= 270
        ) {
          GlobalGrowUp = false;
          box[i].attrs.growUp = false;
        }

        let y = 6.7 * Math.sin((box[i].attrs.ang * Math.PI) / 180);
        let x =
          (containerWidth >= 767 ? 6 : 4.4) *
          Math.cos((box[i].attrs.ang * Math.PI) / 180);
        box[i].x(
          x * amplitude + (containerWidth >= 767 ? 950 : 485) //+ stage.width() / 2
        );
        box[i].y(y * (amplitude - 160) + 900);

        if (Math.abs(box[i].attrs.ang) < 55 && box.length === 5) {
          createDuplicate(box[i], 'left');
        } else if (Math.abs(box[i].attrs.ang) < 43 && box.length === 6) {
          box[i].destroy();
          box.splice(-1, 1);
        } else if (Math.abs(box[i].attrs.ang) > 124 && box.length === 5) {
          createDuplicate(box[i], 'right');
        } else if (Math.abs(box[i].attrs.ang) > 136 && box.length === 6) {
          box[i].destroy();
          box.splice(0, 1);
        }
      }

      if (speed < 0) {
        speed = 0;
      }
      AnimationMousePos = MoveMousePos;
    }, layer);

    stage.on('mousemove touchmove', () => {
      let mousePos = stage.getPointerPosition();
      MoveMousePos = mousePos.x;
    });

    stage.on('mousedown touchstart', e => {
      //stage.setPointersPositions(e);
      let mousePos = stage.getPointerPosition();
      //console.log('mousePos1',stage.getPointerPosition())
      StartMousePos = mousePos.x;
      stageTouched = true;
      this.state.open && spinHide();
    });

    anim.start();

    stage.on('mouseup touchend', () => {
      stageTouched = false;
      GlobalGrowUp = false;
    });

    const spinHide = () => {
      let img = window.img;
      img.opacity(1);
      this.setState({ open: false });
      window.img = null;
    };

    const fitStageIntoParentContainer = () => {
      let container = this.parentContrRef.current;

      // now we need to fit stage into parent
      containerWidth = container ? container.offsetWidth : 0;

      // to do this we need to scale the stage
      let scale = containerWidth / (containerWidth >= 767 ? stageWidth : 970);

      stage.width(stageWidth * scale);
      stage.height((containerWidth >= 767 ? stageHeight : 700) * scale);
      stage.scale({ x: scale, y: scale });
      stage.draw();
    };

    fitStageIntoParentContainer();
    // adapt the stage on any window resize
    window.addEventListener('resize', fitStageIntoParentContainer);
  }

  render() {
    const { lang } = this.props;
    const { open, id } = this.state;
    return (
      <div className="loupes-bg">
        <div className="container loupes-title">
          <h1 className="">
            <span
              className="highlight"
              dangerouslySetInnerHTML={{
                __html: text.TitleLoupes1[lang]
                  ? text.TitleLoupes1[lang]
                  : text.TitleLoupes1['en'],
              }}
            />
            <br />
            <span
              dangerouslySetInnerHTML={{
                __html: text.TitleLoupes1end[lang]
                  ? text.TitleLoupes1end[lang]
                  : text.TitleLoupes1end['en'],
              }}
            />
          </h1>
          {/* <p
            dangerouslySetInnerHTML={{
              __html: text.SubTitleLoupes1end[lang]
                ? text.SubTitleLoupes1end[lang]
                : text.SubTitleLoupes1end['en'],
            }}
          /> */}
        </div>

        <div className="loupes_wrap">
          <div id="spin" className={open ? 'show' : ''} ref={this.spinRef}>
            <div
              className={`Sirv sirv-spin ${id === 0 && open ? 'show3d' : ''}`}
              data-src="https://chanappr.sirv.com/Bryant-dental/360/Big%20loupes/Big%20loupes.spin"
            />
            <div
              className={`Sirv sirv-spin ${id === 1 && open ? 'show3d' : ''}`}
              data-src="https://chanappr.sirv.com/Bryant-dental/360/Small%20Loupes/Small%20Loupes.spin"
            />
            <div
              className={`Sirv sirv-spin ${id === 2 && open ? 'show3d' : ''}`}
              data-src="https://chanappr.sirv.com/Bryant-dental/360/Big%20loupes/Big%20loupes.spin"
            />
            <div
              className={`Sirv sirv-spin  ${id === 3 && open ? 'show3d' : ''}`}
              data-src="https://chanappr.sirv.com/Bryant-dental/360/Small%20Loupes/Small%20Loupes.spin"
            />

            <div
              className={`Sirv sirv-spin ${id === 4 && open ? 'show3d' : ''}`}
              data-src="https://chanappr.sirv.com/Bryant-dental/360/Big%20loupes/Big%20loupes.spin"
            />
          </div>
          <div id="stage-parent" ref={this.parentContrRef}>
            <div id="container" ref={this.contrRef} />
          </div>
        </div>
      </div>
    );
  }
}

export default LoupesSlider;
