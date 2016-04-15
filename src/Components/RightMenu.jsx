/* @flow */
import { autobind } from 'core-decorators';
import { Dialog, RaisedButton, FlatButton, FontIcon } from 'material-ui';
import { reset } from 'Actions/animations';
import { t } from 'i18next';
import { transfer } from 'Services/flash';
import Radium from 'radium';
import React from 'react';
import transferSvg from './transfer.svg';
import { range } from 'lodash';

const style = {
  wrap: {
    alignSelf: 'center',
    display: 'flex',
    justifyContent: 'space-between',
  },
  instructions: {
    display: 'flex',
    justifyContent: 'center',
    flex: '0 0 1',
  },
  instructionList: {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'center',
    flex: '0 0 1',
    flexDirection: 'column',
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
    const actions = [
      <FlatButton
        label={t('dialog.cancel')}
        secondary
        onTouchTap={this.cancelTransfer}/>,
      <FlatButton
        label={t('dialog.transfer')}
        primary
        keyboardFocused
        onTouchTap={this.confirmTransfer}/>,
    ];

    const flashInstructions = range(4).map(i => `${i + 1}. ${t(`dialog.instructions${i}`)}`);

    return (
      <div style={style.wrap}>
        <FlatButton label={t('menu.new')} icon={<FontIcon className=" fa fa-file"/>} onClick={this.new}/>
        <FlatButton onClick={this.transfer} label={t('menu.transfer')} icon={<FontIcon className=" fa fa-wifi"/>}/>
        {/*<FlatButton label="Save" icon={<FontIcon className=" fa fa-floppy-o"/>}/>
      <FlatButton label="Load" icon={<FontIcon className=" fa fa-folder-open"/>}/>*/}
      <Dialog
        title={t('dialog.title')}
        actions={actions}
        modal
        open={this.state.isOpen}>
        <div style={style.instructions}>
          <img src={transferSvg}/>
        </div>
        <ul style={style.instructionList}>{
            flashInstructions.map(instruction => (
              <li key={instruction}>{instruction}</li>
            ))
          }
        </ul>
      </Dialog>
    </div>
  );
}
}
