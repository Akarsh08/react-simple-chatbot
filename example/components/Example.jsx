import React from 'react';
import { ThemeProvider } from 'styled-components';
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
  userBubbleColor: 'rgb(226,240,216)',
  userFontColor: '#333'
};

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
          trigger: 'name',
          hideInput: true
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
          metadata: { optionType: 'multiSelect' },
          hideInput: true
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
          // user: true,
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
            { value: 'male', label: 'Male', trigger: 'people' },
            { value: 'female', label: 'Female', trigger: 'people' }
          ],
          hideInput: true
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
              label: '',
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
              optionComponent: (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <p style={{ margin: 5, color: '#555', fontWeight: '200' }}>Adult</p>
                  <div
                    style={{
                      display: 'flex',
                      width: '130px',
                      height: 25,
                      padding: 12,
                      boxShadow: '0 2px 4px 0 rgba(0,0,0,0.15)',
                      backgroundColor: '#FFF',
                      alignItems: 'center',
                      justifyContent: 'space_between',
                      borderRadius: '0px 20px 20px 20px'
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
              ),
              metadata: { checked: false }
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
              optionComponent: (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <p
                    style={{
                      display: 'flex',
                      margin: 5,
                      color: '#555',
                      fontWeight: '200',
                      flexDirection: 'row',
                      alignItems: 'flex-end'
                    }}
                  >
                    Children{' '}
                    <p style={{ margin: '2px 5px', fontSize: 10, color: '#999' }}>
                      {' '}
                      (under 18 years)
                    </p>
                  </p>
                  <div
                    style={{
                      display: 'flex',
                      width: '130px',
                      height: 25,
                      padding: 12,
                      boxShadow: '0 2px 4px 0 rgba(0,0,0,0.15)',
                      backgroundColor: '#FFF',
                      alignItems: 'center',
                      justifyContent: 'space_between',
                      borderRadius: '0px 20px 20px 20px'
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
              ),
              metadata: { checked: false }
            }
          ],
          metadata: {
            optionType: 'counter'
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

  render() {
    const { selectedOption, steps } = this.state;
    return (
      <ThemeProvider theme={otherFontTheme}>
        <React.StrictMode>
          <ChatBot
            // floating
            hideUserAvatar
            hideHeader
            ref={ref => (this.chatBotRef = ref)}
            botDelay={500}
            customDelay={500}
            userDelay={500}
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
            {'>'}
          </button>
        </React.StrictMode>
      </ThemeProvider>
    );
  }
}

export default ThemedExample;
