import React from 'react';
import { TextField } from 'material-ui';
import { updateAnimation } from 'Actions/animations';

type Props = {
  animation: Animation,
  currentText: ?string
}

export default class TextEditor extends React.Component {
  props: Props;
  handleChange(prop: string, e: SyntheticKeyboardEvent) {
    const { animation } = this.props;
    updateAnimation(Object.assign({}, animation, {
      [prop]: e.target.value,
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
    if (animation.name === 'New Animation' && this.refs.name) {
      this.refs.name.focus();
      this.refs.name.input.select();
    }
  }
  render() {
    const { animation } = this.props;
    return (
      <div>
        <h2>Text Editor</h2>
        <TextField ref="name" value={animation.name} onChange={this.handleChange.bind(this, 'name')}
          floatingLabelText="Animation name" placeholder="Animation name"/>
        <br/>
        <TextField value={animation.text || ''} onChange={this.handleChange.bind(this, 'text')} placeholder="Text to display"/>
      </div>
    );
  }
}
