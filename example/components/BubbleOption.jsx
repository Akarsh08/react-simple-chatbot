import React, { Component } from 'react';
import Proptypes from 'prop-types';

class BubbleOption extends Component {
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

  // handlePress = () => {
  //   const { checked } = this.state;

  //   this.setState({ checked: !checked });
  // };

  render() {
    const { checked } = this.state;
    const { label } = this.props;
    console.log('[checked]', checked);
    return (
      <div
        // onClick={() => this.handlePress()}
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column'
        }}
      >
        <div
          style={{
            display: 'flex',
            paddingHorizontal: 5,
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

BubbleOption.propTypes = {
  label: Proptypes.string.isRequired
};

export default BubbleOption;
