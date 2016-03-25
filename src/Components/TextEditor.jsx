import { TextField, Slider, Toggle } from 'material-ui';
import { updateAnimation } from 'Actions/animations';
import React from 'react';
import TextPreview from './TextPreview';
import { autobind } from 'core-decorators';
import { t } from 'i18next';
import Radium from 'radium';
import { MAX_TEXT_LENGTH } from '../variables';

type Props = {
  animation: Animation,
  currentText: ?string
}

type State = {
  livePreview: bool,
}

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

/*::`*/
@Radium
/*::`*/
export default class TextEditor extends React.Component {
  state: State = {
    livePreview: true,
  };
  props: Props;
  handleChange(prop: string, e: SyntheticKeyboardEvent) {
    const { animation } = this.props;
    if (e.target.value.length > MAX_TEXT_LENGTH) {
      return;
    }
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
  handleDirectionChange(e: SyntheticEvent, toggled: bool) {
    const { animation } = this.props;
    updateAnimation(Object.assign({}, animation, {
      direction: toggled ? 1 : 0,
    }));
  }
  @autobind
  handlePreviewChange(e: SyntheticEvent, toggled: bool) {
    this.setState({
      livePreview: toggled,
    });
  }
  render() {
    const { animation } = this.props;
    const { livePreview } = this.state;
    return (
      <div style={style.wrapper}>
        <h2 style={style.noShrink}>{t('textEditor.title')}</h2>
          <div style={[style.sliderContainer, style.noShrink]}>
            {t('textEditor.livePreview')}
            <Toggle toggled={livePreview} onToggle={this.handlePreviewChange}/>
          </div>
        <TextPreview livePreview={livePreview} text={animation.text} speed={animation.speed}/>
        <TextField style={style.noShrink} id="name" ref="name" value={animation.name} onChange={this.handleChange.bind(this, 'name')}
          floatingLabelText={t('textEditor.name')} placeholder={t('textEditor.name')}/>
        <br/>
        <TextField style={style.noShrink} id="text" value={animation.text || ''} onChange={this.handleChange.bind(this, 'text')} placeholder={t('textEditor.textPlaceholder')}
          floatingLabelText={t('textEditor.textPlaceholder')}/>
        <div style={[style.sliderContainer, style.noShrink]}>
          {t('textEditor.speed')}
          <Slider style={style.slider} value={animation.speed} step={1} min={0} max={15} onChange={this.handleSpeedChange}/>
          {animation.speed}
        </div>
        <div style={[style.sliderContainer, style.noShrink]}>
          {t('textEditor.delay')}
          <Slider style={style.slider} value={animation.delay} step={1} min={0} max={15} onChange={this.handleDelayChange}/>
          {animation.delay}
        </div>
        <div style={[style.sliderContainer, style.noShrink]}>
          {t('textEditor.rtl')}
          <Toggle toggled={Boolean(animation.direction)} onToggle={this.handleDirectionChange}/>
        </div>
      </div>
    );
  }
}