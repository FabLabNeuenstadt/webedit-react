// @flow
import React from 'react';
import type { List } from 'immutable';


type Props = {
  column: List<bool>,
  row: number,
}

const ON = 'red';
const OFF = 'slategrey';

export default class DotColumn extends React.Component {
  props: Props;
  customEvent() {
    console.log('hey');
  }
  render() {
    const { column, row } = this.props;
    return (
      <g>
        {column.map((on, index) => (
          <circle key={index} r="10" cy={index * 25 + 15} cx={row * 25 + 15} fill={on ? ON : OFF} onClick={this.customEvent} />
        ))}
      </g>
    );
  }
}
