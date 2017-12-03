//Style import
import './App.less';

//React imports
import React from 'react';

//Material UI imports
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Input from 'material-ui/Input';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

//Custom imports
import { Message } from "./models/Message";

export default class App extends React.Component {
  constructor(props, messages) {
    super(props);
    this.state = {
      message: '',
      messages: [{message: 'No Messages'}],
      username: 'Pekka',
      date: Date(),
      usersOnline: [this.username, 'Destroyer666', 'Hetero', 'LissuPissis', 'ErkkiPekka', 'asdasd69', 'RektalSorm99', 'HerraH', 'Ms.Tervakeuhko'],
    }    

    this.handleChange = this.handleChange.bind(this);
    this.handleMessageSendOnButton = this.handleMessageSendOnButton.bind(this);
    this.handleMessageSendOnEnterPress = this.handleMessageSendOnEnterPress.bind(this);
  }

  messages = [];
  
  handleChange(event) {    
      this.setState({
        message: event.target.value,
      });    
  }

  handleMessageSendOnEnterPress = (event) => {
    if (event.charCode === 13) {
      const message = this.state.message;
      const date = this.state.date;
      const username = this.state.username;
      let messages = this.messages;

      messages.push({
        sent: date,
        username: username,
        message: message
      });

      this.setState({
        messages: messages,
        message: '',
      });
    }
  }

  handleMessageSendOnButton = (event) => {
    const message = this.state.message;
    const date = this.state.date;
    const username = this.state.username;
    let messages = this.messages;
    
    messages.push({
      sent: date,
      username: username,
      message: message
    });

    this.setState({
      messages: messages,
      message: '',
    });
  }

  render() {
    return (
      <div className="app-main">
        <Grid container>
          <Grid item xs={12}>
            <Paper className="header">
              <h1>ChattyChat 9000</h1>
            </Paper>
          </Grid>
          <Grid item xs={10}>
            <Paper className="message-container">
              <MessagesOutput messages={this.state.messages} />
            </Paper>
          </Grid>
          <Grid item xs={2}>
            <Paper className="online-box">
                <Typography type="headline" component="h3" className="username-box">
                  Currently Online
                </Typography>
                <UsersOnline usersOnline={this.state.usersOnline} />                
            </Paper>
          </Grid>
          <Grid item xs={2}>
            <Paper>
              <Typography type="headline" component="h3" className="username-box">
                {this.state.username}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={8}>
            <Paper className="message-input-box">
              <div className="message-input">
                <Input
                  id="message-input"
                  label="Message"
                  autoComplete="off"
                  value={this.state.message}
                  onChange={this.handleChange}
                  onKeyPress={this.handleMessageSendOnEnterPress}
                  fullWidth>
                </Input>
              </div>              
            </Paper>
          </Grid>
          <Grid item xs={2}>
            <Button raised type="submit" color="accent" onClick={this.handleMessageSendOnButton}>SEND</Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export class MessagesOutput extends React.Component {
  constructor() {
    super();

    this.updateScroll = this.updateScroll.bind(this);
  }

  updateScroll(){
    let element = document.getElementById("messagelist");
    element.scrollTop = element.scrollHeight;
  }
  
  componentDidMount() {
    setInterval(this.updateScroll, 500);
    this.getElement;
  }

  render() {
    let messages = this.props.messages;
    if (messages) {
      return(
        <div id="messagelist" className="messagelist">
          <ul>
            {messages.map((message, i) => {
                return <Paper className="message" id="id-message" key={i}>
                  <div>
                    <div className="message-header">
                      <h5>{message.username} {message.sent}</h5>
                    </div>                          
                    <div className="message-text">
                      <p>{message.message}</p>
                    </div>                          
                  </div>                          
                </Paper>
              })}
          </ul>
        </div>
      )
    }
  }
}

export class UsersOnline extends React.Component {
  constructor() {
    super();
  }
  
  render() {
    let usersOnline = this.props.usersOnline;
    if (usersOnline) {
      return(
        <div>
          <ul>
            {usersOnline.map((user, i) => {
              return <h5 key={i}>{user}</h5>
            })}
          </ul>
        </div>
      )
    }
  }
}