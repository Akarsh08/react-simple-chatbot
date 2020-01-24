import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Option from './Option';
import OptionElement from './OptionElement';
import Options from './Options';
import OptionsStepContainer from './OptionsStepContainer';

class OptionsStep extends Component {
  onOptionClick = ({ value }) => {
    const { triggerNextStep } = this.props;

    triggerNextStep({ value });
  };

  renderOption = option => {
    const { bubbleOptionStyle, step } = this.props;
    const { user } = step;
    const { value, label, optionComponent, optionBubbleStyle, onOptionAction } = option;
    return (
      <Option key={value} className="rsc-os-option">
        <OptionElement
          className="rsc-os-option-element"
          style={{ ...bubbleOptionStyle, ...optionBubbleStyle }}
          user={user}
          onClick={() =>
            onOptionAction ? onOptionAction({ value }) : this.onOptionClick({ value })
          }
        >
          {optionComponent || label}
        </OptionElement>
      </Option>
    );
  };

  render() {
    const { step } = this.props;
    const { options } = step;

    return (
      <OptionsStepContainer className="rsc-os">
        <Options className="rsc-os-options">
          {Object.keys(options)
            .map(key => options[key])
            .map(this.renderOption)}
        </Options>
      </OptionsStepContainer>
    );
  }
}

OptionsStep.propTypes = {
  bubbleOptionStyle: PropTypes.objectOf(PropTypes.any).isRequired,
  step: PropTypes.objectOf(PropTypes.any).isRequired,
  triggerNextStep: PropTypes.func.isRequired
};

export default OptionsStep;
