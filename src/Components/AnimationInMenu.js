import React from 'react';
import { autobind } from 'core-decorators';
import { selectAnimation } from 'Actions/animations';

type Props = {
  animation: Animation,
}

const style = {
  wrapper: {
    border: '1px solid grey',
    display: 'flex',
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default class AnimationInMenu extends React.Component {
  props: Props;
  @autobind
  selectAnimation() {
    const { animation } = this.props;
    selectAnimation(animation);
  }
  render() {
    const { animation } = this.props;
    return (
      <div style={style.wrapper} onClick={this.selectAnimation}>
        {animation.name}
      </div>
    );
  }
}
