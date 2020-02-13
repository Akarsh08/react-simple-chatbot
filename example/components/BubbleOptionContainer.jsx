import React, { Component } from 'react';
import Proptypes from 'prop-types';

import { FOOTER_HEIGHT } from './Example';

class BubbleOptionContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.inputFocused
    };
  }

  componentDidUpdate() {
    if (this.state.open !== this.props.inputFocused && !!this.props.inputFocused) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ open: this.props.inputFocused });
    }
  }

  toggleModal = () => {
    const { open } = this.state;
    this.setState({ open: !open });
  };

  render() {
    const { open } = this.state;
    if (open) {
      return (
        <div
          style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            position: 'absolute',
            bottom: FOOTER_HEIGHT,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 999
          }}
        >
          <div
            style={{
              width: '100%',
              backgroundColor: '#fff',
              display: 'flex',
              justifyContent: 'center',
              padding: 10
            }}
          >
            {this.props.children}
          </div>
        </div>
      );
    }
    return <div />;
  }
}

BubbleOptionContainer.propTypes = {
  children: Proptypes.element,
  inputFocused: Proptypes.func.isRequired
};

BubbleOptionContainer.defaultProps = {
  children: null
};

export default BubbleOptionContainer;
