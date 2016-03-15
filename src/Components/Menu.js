/* @flow */
import { connect } from 'react-redux';
import { Paper, IconButton } from 'material-ui';
import Radium from 'radium';
import React from 'react';
import { autobind } from 'core-decorators';
import type { Map } from 'immutable';
import { addNewAnimation } from 'Actions/animations';
import AnimationInMenu from './AnimationInMenu';

type Props = {
  animations: Map<string, Animation>,
}

const style = {
  wrap: {
    alignItems: 'center',
    display: 'flex',
    flex: '0 0 20%',
    flexDirection: 'column',
    paddingTop: 10,
    minWidth: 250,
    paddingLeft: 15,
    paddingRight: 15,
  },
};

/*::`*/
@Radium
@connect(state => ({
  animations: state.animations,
}))
/*::`*/
export default class Menu extends React.Component {
  props: Props;
  @autobind
  addNewAnimation() {
    addNewAnimation('text');
  }
  render() {
    const { animations } = this.props;
    return (
      <Paper style={style.wrap}>
        {
          animations.map((animation, index) => (
            <AnimationInMenu key={index} animation={animation}/>
          )).toArray()
        }
        <IconButton onClick={this.addNewAnimation} iconClassName="fa fa-plus"/>
      </Paper>
    );
  }
}
