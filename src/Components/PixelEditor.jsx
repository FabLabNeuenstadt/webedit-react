import React from 'react';
import { TextField, Slider, FlatButton, LinearProgress } from 'material-ui';
import { updateAnimation } from 'Actions/animations';
import PixelPreview from './PixelPreview';
import { autobind } from 'core-decorators';
import { t } from 'i18next';
import Radium from 'radium';
import AvSkipNext from 'material-ui/svg-icons/av/skip-next';
import AvSkipPrevious from 'material-ui/svg-icons/av/skip-previous';
import ActionDeleteForever from 'material-ui/svg-icons/action/delete-forever';
import { MAX_ANIMATION_FRAMES } from '../variables';
import { List } from 'immutable';
import { padStart, flatten, range } from 'lodash';

const style = {
  noShrink: {
    flexShrink: 0,
  },
  wrapper: {
    display: 'inline-flex',
    flex: '1 1 0',
    flexDirection: 'column',
    overflowX: 'hidden',
    overfowY: 'auto',
    padding: 20,
  },
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 15,
  },
  sliderContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 15,
  },
  slider: {
    marginTop: 0,
    marginBottom: 0,
    flex: '1 1 0',
    marginLeft: 15,
    marginRight: 15,
  },
};


type Props = {
  animation: Animation,
}

const EMPTY_DATA = List(range(8).map(() => 0x00));

/*::`*/
@Radium
/*::`*/
export default class PixelEditor extends React.Component {
  props: Props;

  componentWillMount() {
    const { animation } = this.props;
    updateAnimation(Object.assign({}, animation, {
      animation: {
        data: List(animation.animation.data),
        currentFrame: 0,
        length: animation.animation.length,
        frames: animation.animation.frames,
      },
    }));
  }

  handleChange(prop: string, e: SyntheticKeyboardEvent) {
    const { animation } = this.props;
    updateAnimation(Object.assign({}, animation, {
      [prop]: e.target.value,
    }));
  }
  @autobind
  handleSpeedChange(e: SyntheticEvent, value: number) {
    const { animation } = this.props;
    updateAnimation(Object.assign({}, animation, {
      speed: value,
    }));
  }
  @autobind
  handleDelayChange(e: SyntheticEvent, value: number) {
    const { animation } = this.props;
    updateAnimation(Object.assign({}, animation, {
      delay: value,
    }));
  }

  @autobind
  handleNextFrame() {
    const { animation } = this.props;
    console.log(animation);
    // check whether next frame would violate the MAX_ANIMATION_FRAMES limit
    if (animation.animation.currentFrame + 1 === MAX_ANIMATION_FRAMES - 1) {
      return;
    }
    // check whether the next frame would cross boundary
    if (animation.animation.currentFrame + 1 >= animation.animation.frames) {
      updateAnimation(Object.assign({}, animation, {
        animation: {
          data: animation.animation.data.concat(EMPTY_DATA),
          currentFrame: animation.animation.currentFrame + 1,
          length: animation.animation.length + 1,
          frames: animation.animation.frames + 1,
        },
      }));
    } else {
      // boundary not crossed, just forward the frame
      updateAnimation(Object.assign({}, animation, {
        animation: {
          data: animation.animation.data,
          currentFrame: animation.animation.currentFrame + 1,
          length: animation.animation.length,
          frames: animation.animation.frames,
        },
      }));
    }
  }

  @autobind
  handlePreviousFrame() {
    const { animation } = this.props;
    // check whether we would go minus...
    if (animation.animation.currentFrame - 1 < 0) {
      return;
    }
    updateAnimation(Object.assign({}, animation, {
        animation: {
          data: animation.animation.data,
          currentFrame: animation.animation.currentFrame - 1,
          length: animation.animation.length,
          frames: animation.animation.frames,
        },
      }));
  }

  @autobind
  handleDeleteFrame() {
    const { animation } = this.props;
    // check whether we would remove the last frame
    if (animation.animation.currentFrame === 0) {
      return;
    }
    // create new data:
    // 1. everything up to current Frame:
    let newdata = animation.animation.data.slice(0, 8 * animation.animation.currentFrame);
    // 2. add everything to until the end
    newdata = newdata.concat(animation.animation.data.skip(8 * animation.animation.currentFrame + 8));
    updateAnimation(Object.assign({}, animation, {
        animation: {
          data: newdata,
          currentFrame: animation.animation.currentFrame - 1,
          length: animation.animation.length - 1,
          frames: animation.animation.frames - 1,
        },
      }));
  }

  @autobind
  updateAnimationPoint(y, x) {
    const { animation } = this.props;
    // for safety reasons
    animation.animation.data = List(animation.animation.data);

    console.log(`Someone clicked: x: ${x} y: ${y}!`);

    // this is just a number, make it binary:
    let column = animation.animation.data.get(8 * animation.animation.currentFrame + x);

    /*eslint no-bitwise: ["error", { "allow": ["^=","~"] }] */
    /* this is a little magic, bitwise XOR the column with 2^(7 - y)
       the 7-y because it is the other way round */
    column ^= Math.pow(2, 7 - y);

    animation.animation.data = animation.animation.data.set(8 * animation.animation.currentFrame + x, column);

    updateAnimation(Object.assign({}, animation, {
      animation: {
        data: animation.animation.data,
        currentFrame: animation.animation.currentFrame,
        length: animation.animation.length,
        frames: animation.animation.frames,
      },
    }));
  }

  render() {
    const { animation } = this.props;

    return (
      <div style={style.wrapper}>
        <PixelPreview data={animation.animation.data}
          frame={animation.animation.currentFrame}
          callback={this.updateAnimationPoint.bind(this)}/>
        <div style={style.buttonWrapper}>
          <FlatButton
            label={t('pixelEditor.previousFrame')}
            labelPosition="after"
            primary
            onClick={this.handlePreviousFrame}
            style={style.buttons}
            icon={<AvSkipPrevious />} />
          <FlatButton
            primary
            onClick={this.handleDeleteFrame}
            style={style.buttons}
            icon={<ActionDeleteForever />} />
          <FlatButton
            label={t('pixelEditor.nextFrame')}
            labelPosition="before"
            primary
            onClick={this.handleNextFrame}
            style={style.buttons}
            icon={<AvSkipNext />} />
        </div>
        <TextField style={style.noShrink} id="name" ref="name" value={animation.name} onChange={this.handleChange.bind(this, 'name')}
          floatingLabelText={t('pixelEditor.name')} placeholder={t('pixelEditor.name')}/>
        <div style={[style.sliderContainer, style.noShrink]}>
          {t('pixelEditor.speed')}
          <Slider style={style.slider} value={animation.speed} step={1} min={0} max={15} onChange={this.handleSpeedChange}/>
          {animation.speed}
        </div>
        <div style={[style.sliderContainer, style.noShrink]}>
          {t('pixelEditor.delay')}
          <Slider style={style.slider} value={animation.delay} step={0.5} min={0} max={7.5} onChange={this.handleDelayChange}/>
          {animation.delay}
        </div>
      </div>
    );
  }
}
