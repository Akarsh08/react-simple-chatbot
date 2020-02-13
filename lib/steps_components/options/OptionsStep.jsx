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

  onSingleSelectOptionAction = (step, option) => {
    const { updateRenderedSteps } = this.props;
    const { onOptionAction } = option;
    const optionsToUpdate = [];
    step.options.map(item => {
      if (item.value === option.value) {
        optionsToUpdate.push({
          ...item,
          optionComponent: {
            ...item.optionComponent,
            props: { ...item.optionComponent.props, checked: true }
          },
          metadata: { checked: true }
        });
      } else {
        optionsToUpdate.push({
          ...item,
          optionComponent: {
            ...item.optionComponent,
            props: { ...item.optionComponent.props, checked: false }
          },
          metadata: { checked: false }
        });
      }

      return null;
    });
    updateRenderedSteps({
      ...step,
      options: optionsToUpdate
    });
    onOptionAction({ option, step });
  };

  onMultiSelectOptionAction = (step, option) => {
    const { updateRenderedSteps } = this.props;
    const { onOptionAction } = option;
    const optionsToUpdate = step.options;
    step.options.map((item, index) => {
      if (item.value === option.value) {
        optionsToUpdate.splice(index, 1, {
          ...item,
          optionComponent: {
            ...item.optionComponent,
            props: { ...item.optionComponent.props, checked: !item.metadata.checked }
          },
          metadata: { checked: !item.metadata.checked },
          label: item.metadata.checked
            ? `${option.label}`.replace(option.value, '').replace(/^(\s*,*)*|(\s*,*)*$/g, '')
            : `${option.label}, ${option.value}`.replace(/^(\s*,*)*|(\s*,*)*$/g, '')
        });
      } else {
        optionsToUpdate.splice(index, 1, {
          ...item,
          label: option.metadata.checked
            ? `${option.label}`.replace(option.value, '').replace(/^(\s*,*)*|(\s*,*)*$/g, '')
            : `${option.label}, ${option.value}`.replace(/^(\s*,*)*|(\s*,*)*$/g, '')
        });
      }
      return null;
    });
    updateRenderedSteps({
      ...step,
      options: optionsToUpdate
    });
    onOptionAction({ option, step });
  };

  customOptionActionByType = (step, option) => {
    const { onOptionAction } = option;
    this.props.handleCustomOptionSelection(option);
    console.log('[option]', option);
    switch (step.metadata.optionType) {
      case 'multiSelect':
        this.onMultiSelectOptionAction(step, option);
        break;
      case 'singleSelect':
        this.onSingleSelectOptionAction(step, option);
        break;
      default:
        onOptionAction({ option, step });
    }
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
            onOptionAction
              ? this.customOptionActionByType(step, option)
              : this.onOptionClick({ value })
          }
        >
          {optionComponent || label}
        </OptionElement>
      </Option>
    );
  };

  render() {
    const { step, inputFocused } = this.props;
    const { options } = step;
    const { optionContainer } = step.metadata;

    if (optionContainer) {
      const { ContainerComponent, props } = optionContainer;
      return (
        <ContainerComponent {...props} inputFocused={inputFocused}>
          {Object.keys(options)
            .map(key => options[key])
            .map(this.renderOption)}
        </ContainerComponent>
      );
    }

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
  triggerNextStep: PropTypes.func.isRequired,
  updateRenderedSteps: PropTypes.func.isRequired,
  handleCustomOptionSelection: PropTypes.func.isRequired,
  inputFocused: PropTypes.bool.isRequired
};

export default OptionsStep;
