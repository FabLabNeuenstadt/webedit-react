import { List } from 'immutable';
import { padStart, flatten, range } from 'lodash';
import DotColumn from './DotColumn';
import font from 'font';
import React from 'react';

type Props = {
  text: string,
}

type State = {
  currentStart: number,
  columns: List<List<bool>>,
}

const style = {
  flexShrink: 0,
  overflow: 'auto',
};

const EMPTY_COLUMN = List(range(8).map(() => false));

export default class TextPreview extends React.Component {
  props: Props;
  state: State = {
    currentStart: 3,
    columns: List(),
  };
  componentWillMount() {
    this.updateColumns(this.props.text);
  }
  componentWillReceive(nextProps: Props) {
    this.updateColumns(nextProps.text);
  }
  updateColumns(text: string) {
    const charCodes = text.split('').map(s => s.charCodeAt(0).toString());
    this.setState({
      columns: List(flatten(
        charCodes
        .map(c => font[c].hexcolumns
          .map((hexColumn: number) => padStart(hexColumn.toString(2), 8, '0'))
        )
        .map(column => column
          .map(c => List(
            c.split('')
            .map(x => x !== '0')
          )).concat([EMPTY_COLUMN])
        )
      )).pop(),
    });
  }
  render() {
    const { columns } = this.state;
    const width = columns.size * 25;
    return (
      <div style={style}>
      <svg height="205" width={width}>
      <rect height="205" width={width} x="0" y="0" fill="transparent"/>
      {
        columns.map((col, i) => (
          <DotColumn key={i} column={col} row={i}/>
        ))
      }
      </svg>
      </div>
    );
  }
}
