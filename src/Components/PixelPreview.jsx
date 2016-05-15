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
    const { columns, callback } = props;

    this.setState({
      columns: List(columns),
    });

  }

  render() {
    const { columns } = this.state;
    const width = columns.size * 25 + 5;

    return (
      <div style={style}>
        <svg height="205" width={width}>
          <rect height="205" width={width} x="0" y="0" fill="black"/>
          {
            columns && columns.map((col, i) => (
              <DotColumn key={i} column={col} row={i} callback={this.props.callback}/>
            ))
          }
        </svg>
      </div>
    );
  }
}
