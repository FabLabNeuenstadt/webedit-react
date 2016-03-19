import React from 'react';

type Props = {
  animation: Animation,
}

export default class PixelEditor extends React.Component {
  props: Props;
  render() {
    const { animation } = this.props;
    return (
      <div>
        {animation.name}
      </div>
    );
  }
}
