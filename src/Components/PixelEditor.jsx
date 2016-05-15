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

const EMPTY_COLUMN = List(range(8).map(() => false));

/*::`*/
@Radium
/*::`*/
export default class PixelEditor extends React.Component {
  props: Props;
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
    if (animation.animation.frame === MAX_ANIMATION_FRAMES) {
      return;
    }
    updateAnimation(Object.assign({}, animation, {
      animation: {
        data: animation.animation.data,
        currentFrame: animation.animation.frame += 1,
        length: animation.animation.length += 8,
      },
    }));
  }


  customEvent(column, row) {
    console.log(column);
    console.log(row);
  }
  render() {
    const { animation } = this.props;
        console.log(animation);
    return (
      <div style={style.wrapper}>
        <div style={style.buttonWrapper}>
          <FlatButton
            label={t('pixelEditor.previousFrame')}
            labelPosition="after"
            primary
            onClick={this.handleNextFrame}
            style={style.buttons}
            icon={<AvSkipPrevious />} />
          <FlatButton
            primary
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
        <LinearProgress mode="determinate" value={animation.animation.length / animation.animation.frame * 100} />
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
