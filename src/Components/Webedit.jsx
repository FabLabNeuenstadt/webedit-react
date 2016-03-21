import { AppBar } from 'material-ui';
import { t } from 'i18next';
import Editor from './Editor';
import Menu from './Menu';
import Radium from 'radium';
import React from 'react';
import RightMenu from './RightMenu';


const style = {
  appRight: {
    marginTop: 0,
    display: 'flex',
  },
  title: {
    color: 'black',
  },
  wrap: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
  },
  content: {
    display: 'flex',
    flex: '1 1 0',
  },
};

/*::`*/
@Radium
/*::`*/
export default class Webedit extends React.Component {
  render() {
    return (
      <div style={style.wrap}>
        <AppBar titleStyle={style.title} iconStyleRight={style.appRight} showMenuIconButton={false} iconElementRight={<RightMenu/>} title={t('headerTitle')}/>
        <div style={style.content}>
          <Menu/>
          <Editor/>
        </div>
      </div>
    );
  }
}
