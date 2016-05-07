import React from 'react';
import { TextField, Slider, Toggle, Paper } from 'material-ui';
import { updateAnimation } from 'Actions/animations';
import TextPreview from './TextPreview';
import { autobind } from 'core-decorators';
import { t } from 'i18next';
import Radium from 'radium';

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

export default class PixelEditor extends React.Component {
  props: Props;
  render() {
    const { animation } = this.props;
    return (
      <div>
        <TextField style={style.noShrink} id="name" ref="name" value={animation.name} onChange={this.handleChange.bind(this, 'name')}
          floatingLabelText={t('textEditor.name')} placeholder={t('textEditor.name')}/>
        <div style={[style.sliderContainer, style.noShrink]}>
          {t('textEditor.speed')}
          <Slider style={style.slider} value={animation.speed} step={1} min={0} max={15} onChange={this.handleSpeedChange}/>
          {animation.speed}
        </div>
        <div style={[style.sliderContainer, style.noShrink]}>
          {t('textEditor.delay')}
          <Slider style={style.slider} value={animation.delay} step={0.5} min={0} max={7.5} onChange={this.handleDelayChange}/>
          {animation.delay}
        </div>
      </div>
    );
  }
}
