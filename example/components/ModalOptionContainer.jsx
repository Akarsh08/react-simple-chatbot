import React, { Component } from 'react';
import Proptypes from 'prop-types';

class ModalOptionContainer extends Component {
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
    const { handleSubmit } = this.props;
    const { open } = this.state;
    if (open) {
      return (
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            position: 'absolute',
            top: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 999
          }}
        >
          <div
            style={{
              width: '90%',
              backgroundColor: '#fff',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              padding: 10
            }}
          >
            {this.props.children}
            <button
              type="button"
              style={{
                borderRadius: '50%',
                marginTop: 5,
                background:
                  'linear-gradient(to bottom right, rgb(132,190,83), rgb(102,161,62),rgb(102,161,62))',
                borderWidth: 0,
                color: '#FFF',
                fontSize: 22,
                fontWeight: 'bold',
                width: 50,
                height: 50,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'flex-end',
                margin: '10px 10px 10px'
              }}
              onClick={() => {
                handleSubmit();
              }}
            >
              {'>'}
            </button>
          </div>
        </div>
      );
    }
    return <div />;
  }
}

ModalOptionContainer.propTypes = {
  children: Proptypes.element,
  handleSubmit: Proptypes.func.isRequired,
  inputFocused: Proptypes.func.isRequired
};

ModalOptionContainer.defaultProps = {
  children: null
};

export default ModalOptionContainer;
