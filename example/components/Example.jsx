import React from 'react';
import { ThemeProvider } from 'styled-components';
import { get } from 'lodash';
import ChatBot from '../../lib/index';
import ImageOption from './ImageOption';

const otherFontTheme = {
  background: '#f5f8fb',
  fontFamily: 'Helvetica Neue',
  headerBgColor: 'rgb(102,161,62)',
  headerFontColor: '#fff',
  headerFontSize: '16px',
  botBubbleColor: '#FFF',
  botFontColor: '#333',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a'
};

class ThemedExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: {},
      steps: [
        {
          id: '1',
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
          trigger: 'option_holiday_type',
          hideInput: true
        },
        {
          id: 'option_holiday_type',

          options: [
            {
              value: '1',
              label: 'First Image',
              trigger: 'ask_name',
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
              )
            },
            {
              value: '2',
              label: 'Second Image',
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
              user: true
            }
          ],

          hideInput: true
        },
        {
          id: 'ask_name',
          message: 'can i know your name',
          trigger: 'name'
        },
        {
          id: 'name',
          user: true,
          trigger: 'disp'
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
            { value: 'male', label: 'Male', trigger: 'thanks' },
            { value: 'female', label: 'Female', trigger: 'thanks' }
          ],
          hideInput: true
        },
        {
          id: 'thanks',
          message: 'Thank you for registering with us',

          hideInput: true
        }
      ]
    };
  }

  // onRadioOptionClicked = data => {
  //   console.log('[data]', data)

  // };

  chatBotRef;

  render() {
    const { selectedOption, steps } = this.state;
    return (
      <ThemeProvider theme={otherFontTheme}>
        <React.StrictMode>
          <ChatBot
            // floating
            hideHeader
            ref={ref => (this.chatBotRef = ref)}
            botDelay={100}
            customDelay={100}
            userDelay={100}
            steps={steps}
          />
          <button
            type="button"
            style={{
              padding: '19px 25px',
              borderRadius: '50%',
              marginTop: 5,
              background:
                'linear-gradient(to bottom right, rgb(132,190,83), rgb(102,161,62),rgb(102,161,62))',
              borderWidth: 0,
              color: '#FFF',
              fontSize: 22,
              fontWeight: 'bold'
            }}
            onClick={() => {
              this.chatBotRef.triggerNextStep(selectedOption.option);
            }}
          >
            >
          </button>
        </React.StrictMode>
      </ThemeProvider>
    );
  }
}

export default ThemedExample;
