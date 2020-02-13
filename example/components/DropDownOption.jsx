import React, { Component } from 'react';
import Proptypes from 'prop-types';

class DropDownOption extends Component {
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
          <p style={{ margin: 5, color: '#555', fontWeight: '200' }}>{label}</p>
          <div
            style={{
              display: 'flex',
              width: '130px',
              height: 25,
              padding: 12,
              alignItems: 'center',
              justifyContent: 'space_between'
            }}
          >
            <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>{'<'}</div>
            <div
              style={{
                display: 'flex',
                flex: 1,
                justifyContent: 'center',
                fontSize: 18
              }}
            >
              1
            </div>
            <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>{'>'}</div>
          </div>
        </div>
      </div>
    );
  }
}

DropDownOption.propTypes = {
  label: Proptypes.string.isRequired
};

export default DropDownOption;
