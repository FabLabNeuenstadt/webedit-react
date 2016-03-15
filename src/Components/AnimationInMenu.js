import React from 'react';
import { autobind } from 'core-decorators';
import { selectAnimation, removeAnimation } from 'Actions/animations';
import Radium from 'radium';
import { FontIcon } from 'material-ui';


type Props = {
  animation: Animation,
  selected: bool,
}

const style = {
  wrapper: {
    alignItems: 'center',
    borderColor: 'grey',
    borderStyle: 'solid',
    borderWidth: 1,
    display: 'flex',
    height: 50,
    justifyContent: 'center',
    marginTop: 5,
    width: '100%',
  },
  selected: {
    borderColor: 'blue',
  },
  name: {
    flex: '1 1 0',
  },
};

/*::`*/
@Radium
/*::`*/
export default class AnimationInMenu extends React.Component {
  props: Props;
  @autobind
  selectAnimation() {
    const { animation } = this.props;
    selectAnimation(animation);
  }
  @autobind
  removeAnimation(e: SyntheticMouseEvent) {
    const { animation } = this.props;
    removeAnimation(animation.id);
    e.stopPropagation();
  }
  render() {
    const { animation, selected } = this.props;
    return (
      <div style={[style.wrapper, selected && style.selected]} onClick={this.selectAnimation}>
        <span style={style.name}>{animation.name}</span>
        <FontIcon className="fa fa-trash" onClick={this.removeAnimation}/>
      </div>
    );
  }
}
