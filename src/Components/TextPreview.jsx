import React from 'react';

type Props = {
  text: string,
}

export default class TextPreview extends React.Component {
  props: Props;
  render() {
    const { text } = this.props;
    return (
      <div>
        {text}
      </div>
    );
  }
}
