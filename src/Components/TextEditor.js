import React from 'react';
import { TextField } from 'material-ui';
import { autobind } from 'core-decorators';
import { updateAnimation } from 'Actions/animations';

type Props = {
  animation: Animation,
  currentText: ?string
}

export default class TextEditor extends React.Component {
  props: Props;
  @autobind
  handleTextChange(e: SyntheticKeyboardEvent) {
    const { animation } = this.props;
    updateAnimation(Object.assign({}, animation, {
      text: e.target.value,
    }));
  }
  render() {
    const { animation } = this.props;
    return (
      <div>
        <h2>Text Editor</h2>
        {animation.name}<br/>
      <TextField value={animation.text} onChange={this.handleTextChange} placeholder="Text to display"/>
      </div>
    );
  }
}
