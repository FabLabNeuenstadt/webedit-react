import { TextField, Slider, Toggle } from 'material-ui';
import { updateAnimation } from 'Actions/animations';
import React from 'react';
import TextPreview from './TextPreview';
import { autobind } from 'core-decorators';
import { t } from 'i18next';
import Radium from 'radium';

type Props = {
  animation: Animation,
  currentText: ?string
}

const style = {
  wrapper: {
    display: 'flex',
    flex: '1 1 0',
    flexDirection: 'column',
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
  text: {
    marginTop: -35,
  },
};

/*::`*/
@Radium
/*::`*/
export default class TextEditor extends React.Component {
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
  handleDirectionChange(e: SyntheticEvent, toggled: bool) {
    const { animation } = this.props;
    updateAnimation(Object.assign({}, animation, {
      direction: toggled ? 1 : 0,
    }));
  }
  componentDidMount() {
    this.selectName();
  }
  componentDidUpdate() {
    this.selectName();
  }
  selectName() {
    const { animation } = this.props;
    if (animation.name === t('animation.new') && this.refs.name) {
      this.refs.name.focus();
      this.refs.name.input.select();
    }
  }
  render() {
    const { animation } = this.props;
    return (
      <div style={style.wrapper}>
        <h2>{t('textEditor.title')}</h2>
        <TextPreview text={animation.text || ''}/>
        <TextField id="name" ref="name" value={animation.name} onChange={this.handleChange.bind(this, 'name')}
          floatingLabelText={t('textEditor.name')} placeholder={t('textEditor.name')}/>
        <br/>
        <TextField style={style.text} id="text" value={animation.text || ''} onChange={this.handleChange.bind(this, 'text')} placeholder={t('textEditor.textPlaceholder')}
          floatingLabelText={t('textEditor.textPlaceholder')}/>
        <div style={style.sliderContainer}>
          {t('textEditor.speed')}
          <Slider style={style.slider} value={animation.speed} step={1} min={0} max={15} onChange={this.handleSpeedChange}/>
          {animation.speed}
        </div>
        <div style={style.sliderContainer}>
          {t('textEditor.delay')}
          <Slider style={style.slider} value={animation.delay} step={1} min={0} max={15} onChange={this.handleDelayChange}/>
          {animation.delay}
        </div>
        <div style={style.sliderContainer}>
          {t('textEditor.rtl')}
          <Toggle toggled={Boolean(animation.direction)} onToggle={this.handleDirectionChange}/>
        </div>
      </div>
    );
  }
}
