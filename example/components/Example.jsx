import React from 'react';
import { ThemeProvider } from 'styled-components';
import ChatBot from '../../lib/index';

const otherFontTheme = {
  background: '#f5f8fb',
  fontFamily: 'Helvetica Neue',
  headerBgColor: '#6e48aa',
  headerFontColor: '#fff',
  headerFontSize: '16px',
  botBubbleColor: '#FFF',
  botFontColor: '#333',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a'
};

let selectedOption;

const steps = [
  {
    id: '1',
    message: 'Hey, I am AITA you family trip assistant ',
    trigger: '2'
  },
  {
    id: '2',
    message: "Let's get you started",
    trigger: '3'
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
        value: '1',
        label: 'First Image',
        trigger: 'ask_name',
        optionBubbleStyle: {
          padding: '0px',
          overflow: 'hidden',
          borderRadius: '10px'
        },
        onOptionAction: data => (selectedOption = data.value),
        optionComponent: (
          <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
            <img alt="" style={{ width: 250, height: 130 }} src="https://i.imgur.com/JYNzLzx.jpg" />
            <div
              style={{
                display: 'flex',
                padding: 5,
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'flex-start'
              }}
            >
              <input
                type="checkbox"
                checked={selectedOption === '1'}
                style={{ marginRight: 5, backgroundColor: '#2A2', fontSize: 18 }}
              />
              Beach Holiday
            </div>
          </div>
        )
      },
      {
        value: '2',
        label: 'Second Image',
        trigger: 'ask_name',
        optionBubbleStyle: { padding: '0px', overflow: 'hidden', borderRadius: '10px' },
        optionComponent: (
          <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
            <img alt="" style={{ width: 250, height: 130 }} src="https://i.imgur.com/iTekUgc.jpg" />
            <div
              style={{
                display: 'flex',
                padding: 5,
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'flex-start'
              }}
            >
              <input
                type="checkbox"
                checked={selectedOption === '2'}
                style={{ marginRight: 5, backgroundColor: '#2A2', fontSize: 18 }}
              />
              Beach Holiday
            </div>
          </div>
        ),
        user: true
      }
    ]
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
    trigger: 'gender'
  },
  {
    id: 'gender',
    message: 'What is your gender',
    trigger: 'option_gender'
  },
  {
    id: 'option_gender',
    options: [
      { value: 'male', label: 'Male', trigger: 'thanks' },
      { value: 'female', label: 'Female', trigger: 'thanks' }
    ]
  },
  {
    id: 'thanks',
    message: 'Thank you for registering with us',
    end: true
  }
];

const ThemedExample = () => (
  <ThemeProvider theme={otherFontTheme}>
    <React.StrictMode>
      <ChatBot botDelay={500} customDelay={500} steps={steps} />
      <button onClick={() => {}}>Next</button>
    </React.StrictMode>
  </ThemeProvider>
);

export default ThemedExample;
