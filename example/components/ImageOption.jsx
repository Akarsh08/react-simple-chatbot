import React, { Component } from 'react';
import Proptypes from 'prop-types';

class ImageOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.checked !== state.checked) {
      return { checked: props.checked };
    }
    return null;
  }

  handlePress = () => {
    const { checked } = this.state;
    console.log('logging here: ');

    this.setState({ checked: !checked });
  };

  render() {
    const { checked } = this.state;
    const { imageSource, label } = this.props;
    return (
      <div
        onClick={() => this.handlePress()}
        style={{ display: 'flex', flex: 1, flexDirection: 'column' }}
      >
        <img alt="" style={{ width: 250, height: 130 }} src={imageSource} />
        <div
          style={{
            display: 'flex',
            padding: 5,
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center'
          }}
        >
          <input type="radio" checked={checked} style={{ marginRight: 10, fontSize: 18 }} />
          {label}
        </div>
      </div>
    );
  }
}

ImageOption.propTypes = {
  imageSource: Proptypes.string.isRequired,
  label: Proptypes.string.isRequired
};

export default ImageOption;
