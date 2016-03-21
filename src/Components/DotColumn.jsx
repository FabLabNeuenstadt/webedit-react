// @flow
import React from 'react';
import type { List } from 'immutable';


type Props = {
  column: List<bool>,
  row: number,
}

const ON = 'red';
const OFF = 'grey';

export default class DotColumn extends React.Component {
  props: Props;
  render() {
    const { column, row } = this.props;
    return (
      <g>
        {column.map((on, index) => (
          <circle key={index} r="10" cy={index * 25 + 15} cx={row * 25 + 15} fill={on ? ON : OFF}/>
        ))}
      </g>
    );
  }
}
