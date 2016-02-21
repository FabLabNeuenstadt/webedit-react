import React from 'react';
import Radium from 'radium';
import { FlatButton, FontIcon } from 'material-ui';

const style = {
  wrap: {
    alignSelf: 'center',
    display: 'flex',
    justifyContent: 'space-between',
  },
};

/*::`*/
@Radium
/*::`*/
export default class RightMenu extends React.Component {
  render() {
    return (
      <div style={style.wrap}>
        <FlatButton label="New" icon={<FontIcon className=" fa fa-file"/>}/>
        <FlatButton label="Transfer" icon={<FontIcon className=" fa fa-wifi"/>}/>
        <FlatButton label="Save" icon={<FontIcon className=" fa fa-floppy-o"/>}/>
        <FlatButton label="Load" icon={<FontIcon className=" fa fa-folder-open"/>}/>
      </div>
    );
  }
}
