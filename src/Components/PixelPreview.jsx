import { List } from 'immutable';
import { padStart, flatten, range } from 'lodash';
import DotColumn from './DotColumn';
import React from 'react';

type Props = {
  data: number[],
}

type State = {
  currentStart: number,
  columns: List<List<bool>>,
}

const style = {
  flexShrink: 0,
  overflow: 'auto',
};


export default class PixelPreview extends React.Component {

  props: Props;

  state: State = {
    columns: List(),
  };

  componentWillMount() {
    this.updateColumns(this.props);
  }

  componentWillReceiveProps(nextProps: Props) {
    this.updateColumns(nextProps);
  }

  updateColumns(props: Props) {
    const { data, frame, callback } = props;

    let frameData = data.slice(8 * frame, 8 * frame + 8);

    frameData = frameData.map((hexColumn: number) => padStart(hexColumn.toString(2), 8, '0'));
    frameData = frameData.map(column => List(
      column.split('')
      .map(x => x !== '0')
    ));

    this.setState({
      columns: frameData,
    });

  }

  render() {
    const { columns } = this.state;
    const cols = List(columns);
    const width = cols.size * 25 + 5;

    return (
      <div style={style}>
        <svg height="205" width={width}>
          <rect height="205" width={width} x="0" y="0" fill="black"/>
          {
            cols && cols.map((col, i) => (
              <DotColumn key={i} column={col} row={i} callback={this.props.callback}/>
            ))
          }
        </svg>
      </div>
    );
  }
}
