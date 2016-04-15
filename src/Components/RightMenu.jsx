/* @flow */
import { autobind } from 'core-decorators';
import { FlatButton, FontIcon } from 'material-ui';
import { reset } from 'Actions/animations';
import { t } from 'i18next';
import { transfer } from 'Services/flash';
import Radium from 'radium';
import React from 'react';

const style = {
  wrap: {
    alignSelf: 'center',
    display: 'flex',
    justifyContent: 'space-between',
  },
};

type State = {
  isOpen: bool,
}

/*::`*/
@Radium
/*::`*/
export default class RightMenu extends React.Component {
  state: State = {
    isOpen: false,
  };
  static contextTypes = {
    store: React.PropTypes.object.isRequired,
  };
  @autobind
  transfer() {
    this.setState({
      isOpen: true,
    });
  }
  @autobind
  confirmTransfer() {
    transfer(this.context.store.getState().animations);
    this.setState({
      isOpen: false,
    });
  }
  @autobind
  cancelTransfer() {
    this.setState({
      isOpen: false,
    });
  }
  new() {
    reset();
  }
  render() {
    return (
      <div style={style.wrap}>
        <FlatButton label={t('menu.new')} icon={<FontIcon className=" fa fa-file"/>} onClick={this.new}/>
        <FlatButton onClick={this.transfer} label={t('menu.transfer')} icon={<FontIcon className=" fa fa-wifi"/>}/>
        {/*<FlatButton label="Save" icon={<FontIcon className=" fa fa-floppy-o"/>}/>
        <FlatButton label="Load" icon={<FontIcon className=" fa fa-folder-open"/>}/>*/}
      </div>
    );
  }
}
