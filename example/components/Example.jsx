import React from 'react';
import { ThemeProvider } from 'styled-components';
import { noop } from 'lodash';

import ModalOptionContainer from './ModalOptionContainer';
import BubbleOptionContainer from './BubbleOptionContainer';
import DropDownOptionListContainer from './DropDownListOptionContainer';
import ChatBot from '../../lib/index';
import ImageOption from './ImageOption';
import BubbleOption from './BubbleOption';
import DropDownOption from './DropDownOption';

import './styles.css';

const otherFontTheme = {
  background: '#f5f8fb',
  fontFamily: 'Helvetica Neue',
  headerBgColor: 'rgb(102,161,62)',
  headerFontColor: '#fff',
  headerFontSize: '16px',
  botBubbleColor: '#FFF',
  botFontColor: '#333',
  userBubbleColor: 'rgb(226,240,216)',
  userFontColor: '#333'
};

export const FOOTER_HEIGHT = 60;

class ThemedExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: {},
      steps: [
        {
          id: '1',
          delay: 1500,
          message: 'Hey, I am AITA you family trip assistant ',
          trigger: '2',
          hideInput: true
        },
        {
          id: '2',
          message: "Let's get you started",
          trigger: '3',
          hideInput: true
        },
        {
          id: '3',
          message: 'What kind of holiday would you like to go for?',
          trigger: 'option_holiday_type'
        },
        {
          id: 'option_holiday_type',
          options: [
            {
              value: 'Sandy Holiday',
              label: '',
              trigger: data => {
                return this.state.selectedOption.option.value === 'Sandy Holiday'
                  ? 'gender'
                  : 'ask_name ';
              },
              optionBubbleStyle: {
                padding: '0px',
                overflow: 'hidden',
                borderRadius: '10px'
              },
              onOptionAction: data => {
                // this.onRadioOptionClicked(data);
                this.setState({ selectedOption: data });
              },
              optionComponent: (
                <ImageOption
                  imageSource="https://i.imgur.com/JYNzLzx.jpg"
                  checked={false}
                  label="Sandy Holiday"
                />
              ),
              metadata: { checked: false }
            },
            {
              value: 'Beach Holiday',
              label: '',
              trigger: 'ask_name',
              optionBubbleStyle: { padding: '0px', overflow: 'hidden', borderRadius: '10px' },
              onOptionAction: data => {
                // this.onRadioOptionClicked(data);
                this.setState({ selectedOption: data });
              },
              optionComponent: (
                <ImageOption
                  imageSource="https://i.imgur.com/iTekUgc.jpg"
                  checked={false}
                  label="Beach Holiday"
                />
              ),
              metadata: { checked: false }
            }
          ],
          metadata: {
            optionSelectSubmit: true,
            optionType: 'multiSelect',

            initiallyEnableInput: true, // Option In modal
            optionContainer: {
              // Option In modal
              ContainerComponent: ModalOptionContainer,
              props: {
                handleSubmit: () => {
                  if (this.chatBotRef) {
                    this.chatBotRef.handleSubmitButton();
                  }
                }
              }
            }
          }
        },
        {
          id: 'ask_name',
          message: 'can i know your name',
          trigger: 'name'
        },
        {
          id: 'name',
          message: "That's great!",
          hideInput: true,
          // delay: 1500,
          trigger: '1',
          user: true,
          metadata: {
            emulateUser: true
          }
        },
        {
          id: 'disp',
          message: 'Hi, {previousValue}',
          trigger: 'gender',
          hideInput: true
        },
        {
          id: 'gender',
          message: 'What is your gender',
          trigger: 'option_gender',
          hideInput: true
        },
        {
          id: 'option_gender',
          options: [
            {
              value: 'male',
              label: 'Male',
              trigger: 'people',
              onOptionAction: noop,
              optionComponent: (
                <BubbleOption
                  imageSource="https://i.imgur.com/JYNzLzx.jpg"
                  checked={false}
                  label="Male"
                />
              )
            },
            {
              value: 'female',
              label: 'Female',
              trigger: 'people',
              onOptionAction: noop,
              optionComponent: (
                <BubbleOption
                  imageSource="https://i.imgur.com/JYNzLzx.jpg"
                  checked={false}
                  label="Female"
                />
              )
            }
          ],
          // hideInput: true,
          metadata: {
            optionSelectSubmit: true, // get get control on submit
            optionType: 'singleSelect',
            initiallyEnableInput: true, // Option In modal
            optionContainer: {
              // Option In modal
              ContainerComponent: BubbleOptionContainer,
              props: {
                handleSubmit: () => {
                  if (this.chatBotRef) {
                    this.chatBotRef.handleSubmitButton();
                  }
                }
              }
            }
          }
        },
        {
          id: 'people',
          message: 'whom are you travelling with ?',
          trigger: 'ask_people'
        },
        {
          id: 'ask_people',
          options: [
            {
              value: 'Adult',
              label: 'yyy',
              trigger: 'disp_people',
              optionBubbleStyle: {
                padding: '0px',
                margin: '0px 5px',
                backgroundColor: 'transparent',
                boxShadow: '0 0'
              },
              onOptionAction: data => {
                // this.onRadioOptionClicked(data);
                this.setState({ selectedOption: data });
              },
              optionComponent: <DropDownOption label="Adults" />,
              metadata: {
                checked: false
              }
            },
            {
              value: 'Children',
              label: '',
              trigger: 'disp_people',
              optionBubbleStyle: {
                padding: '0px',
                paddingTop: 0,
                backgroundColor: 'transparent',
                boxShadow: '0 0'
              },
              onOptionAction: data => {
                // this.onRadioOptionClicked(data);
                this.setState({ selectedOption: data });
              },
              optionComponent: <DropDownOption label="Children" />,
              metadata: { checked: false }
            }
          ],
          metadata: {
            optionType: 'counter',
            hideInputOnFocus: true,

            optionSelectSubmit: true,
            initiallyEnableInput: true, // Option In modal
            optionContainer: {
              // Option In modal
              ContainerComponent: DropDownOptionListContainer,
              props: {
                handleSubmit: () => {
                  if (this.chatBotRef) {
                    this.chatBotRef.handleSubmitButton();
                  }
                }
              }
            }
          }
        },
        {
          id: 'disp_people',
          message: 'you are travelling with people',
          trigger: 'thanks'
        },
        {
          id: 'thanks',
          message: 'Thank you for registering with us',
          end: true,
          hideInput: true
        }
      ]
    };
  }

  // onRadioOptionClicked = data => {
  //   console.log('[data]', data)

  // };

  chatBotRef;

  renderCustomSubmitIcon = () => {
    return (
      <div
        style={{
          height: 50,
          width: 50,
          backgroundColor: '#228B22',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          borderRadius: 25,
          color: '#fff',
          fontSize: 18
        }}
      >
        >
      </div>
    );
  };

  render() {
    const { steps } = this.state;
    return (
      <ThemeProvider theme={otherFontTheme}>
        <React.StrictMode>
          <ChatBot
            hideHeader
            ref={ref => (this.chatBotRef = ref)}
            botDelay={500}
            customDelay={500}
            userDelay={500}
            steps={steps}
            width="350px"
            contentStyle={{ backgroundColor: '#F5F5F5', height: '450px' }}
            customSubmitIcon={this.renderCustomSubmitIcon()}
            footerStyle={{ backgroundColor: 'transparent' }}
            inputStyle={{ height: FOOTER_HEIGHT, width: '80%' }}
            submitButtonStyle={{
              padding: 0
            }}
            controlStyle={{
              position: 'absolute',
              right: 5,
              top: 5
            }}
          />
        </React.StrictMode>
      </ThemeProvider>
    );
  }
}

export default ThemedExample;
