import { Paper, IconButton } from 'material-ui';
import React from 'react';
import Radium from 'radium';
import type { List } from 'immutable';
import { connect } from 'react-redux';

type Props = {
  items: List,
}

const style = {
  wrap: {
    display: 'flex',
    flex: '0 0 20%',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: 250,
  },
};

/*::`*/
@Radium
@connect(state => ({
  animations: state.animations,
}))
/*::`*/
export default class Menu extends React.Component<void, Props, void> {
  render() {
    const { animations } = this.props;
    return (
      <Paper style={style.wrap}>
        {
          animations.map(animation => (
            animation.name
          ))
        }
        <IconButton iconClassName="fa fa-plus"/>
      </Paper>
    );
  }
}
