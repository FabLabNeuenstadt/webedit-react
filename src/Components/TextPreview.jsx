import { List } from 'immutable';
import { padStart, flatten, range } from 'lodash';
import DotColumn from './DotColumn';
import font from 'font';
import React from 'react';

type Props = {
  livePreview: bool,
  rtl: bool,
  speed: number,
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
  static defaultProps = {
    text: '',
  };
  props: Props;
  state: State = {
    currentStart: 0,
    columns: List(),
  };
  interval: number;
  componentWillMount() {
    this.updateColumns(this.props);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  componentWillReceiveProps(nextProps: Props) {
    this.updateColumns(nextProps);
  }
  updateColumns(props: Props) {
    const { text, livePreview, rtl } = props;
    const charCodes = (text || '').split('').map(s => s.charCodeAt(0).toString());
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
      )),
    });
    clearInterval(this.interval);
    if (livePreview) {
      const speed = 1000 / (1 / (0.002048 * (250 - (16 * this.props.speed))));
      this.interval = setInterval(() => {
        this.setState({
          currentStart: (this.state.currentStart + (rtl ? -1 : 1)) % this.state.columns.size || 0,
        });
      }, speed);
    }
  }
  render() {
    const { columns, currentStart } = this.state;
    const { livePreview } = this.props;
    let visibleCols;
    if (livePreview) {
      visibleCols = columns.slice(currentStart, currentStart + 8);
      let c = 0;
      while (visibleCols.size < 8) {
        const col = columns.get(c);
        if (!col) {
          break;
        }
        visibleCols = visibleCols.push(col);
        c = (c + 1) % columns.size;
      }
    } else {
      visibleCols = columns;
    }
    const width = visibleCols.size * 25 + 5;
    return (
      <div style={style}>
        <svg height="205" width={width}>
          <rect height="205" width={width} x="0" y="0" fill="black"/>
          {
            visibleCols && visibleCols.map((col, i) => (
              <DotColumn key={i} column={col} row={i}/>
            ))
          }
        </svg>
      </div>
    );
  }
}
