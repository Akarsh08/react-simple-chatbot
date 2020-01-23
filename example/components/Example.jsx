import React from 'react';
import { ThemeProvider } from 'styled-components';
import ChatBot from '../../lib/index';

const otherFontTheme = {
  background: '#f5f8fb',
  fontFamily: 'Helvetica Neue',
  headerBgColor: '#6e48aa',
  headerFontColor: '#fff',
  headerFontSize: '16px',
  botBubbleColor: '#EEE',
  botFontColor: '#333',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a'
};

const steps = [
  {
    id: '1',
    message: 'Hello World',
    trigger: '2'
  },
  {
    id: '2',
    options:[
      {
        value:'1', label: 'First Image', trigger: 'ask_name',
        optionComponent: (
          <div><img style={{width: 150, height: 75}} src='https://i.imgur.com/iTekUgc.jpg' /></div>
        ),
        user: true,
      },
      {
        value:'2', label: 'Second Image', trigger: 'ask_name',
        optionComponent: (
          <div><img style={{width: 150, height: 75}} src='https://i.imgur.com/JYNzLzx.jpg' /></div>
        )
      }
    ]
  },
  {
    id:'ask_name',
    message: 'can i know your name',
    trigger: 'name'
  },
  {
    id:'name',
    user: true,
    trigger: 'disp'
  },
  {
    id: 'disp',
    message: 'Hi, {previousValue}'
  },
  {
    id:'3',
    message: 'Bye',
    end: true
  },
];

const ThemedExample = () => (
  <ThemeProvider theme={otherFontTheme}>
    <React.StrictMode>
      <ChatBot steps={steps} />
    </React.StrictMode>
  </ThemeProvider>
);

export default ThemedExample;
