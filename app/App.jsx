//Style import
import './App.less';

//React imports
import React from 'react';

//Material UI imports
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

//Custom imports
import { Message } from "./models/Message";

export default class App extends React.Component {
  constructor(props, messages) {
    super(props);
    this.state = {
      message: 'No Messages.',
      messages: [],
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleMessageSend = this.handleMessageSend.bind(this);
  }

  messages = [];
  
  handleChange(event) {
    this.setState({
      message: event.target.value,
    });
  }

  handleEnterPress = (event) => {
    if (event.charCode === 13) {
      const message = this.state.message;
      const date = JSON.stringify(Date());
      const username = 'Pekka';
      let messages = this.messages;

      messages.push({
        sent: date,
        username: username,
        message: message
      });

      this.setState({
        messages: messages,
      });
    }
  }

  handleMessageSend = (event) => {
    const message = this.state.message;
    const date = JSON.stringify(Date());
    const username = 'Pekka';
    let messages = [];

    messages.push({
      sent: date,
      username: username,
      message: message
    });

    this.setState({
      messages: messages,
    });
  }

  render() {
    return (
      <div className="app-main">
        <Grid container>
          <Grid item xs={12}>
            <Paper className="header">asdasdasd</Paper>
          </Grid>
          <Grid item xs={10}>
            <Paper className="message-container">
              <MessagesOutput messages={this.state.messages} />
            </Paper>
          </Grid>
          <Grid item xs={2}>
            <Paper className="online-box">asdasdasd</Paper>
          </Grid>
          <Grid item xs={2}>
            <Paper className="username-box">asdasdasd</Paper>
          </Grid>
          <Grid item xs={8}>
            <Paper className="message-input-box">
              <div className="message-input">
                <TextField
                  id="message"
                  label="Message"
                  autoComplete="off"
                  onChange={this.handleChange}
                  onKeyPress={this.handleEnterPress}
                  fullWidth>
                </TextField>
              </div>              
            </Paper>
          </Grid>
          <Grid item xs={2}>
            <Button type="submit" color="primary" onClick={this.handleMessageSend}>SEND</Button>
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
  }

  render() {
    let messages = this.props.messages;
    if (messages) {
      return(
        <div id="messagelist" className="messagelist">
          <ul>
            {messages.map((message, i) => {
                return <Paper className="message" key={i}>
                          <div className="messageHeader">
                            <p>{message.username} {message.sent}</p>
                          </div>                          
                          <div className="messageText">
                            <p>{message.message}</p>
                          </div>                          
                        </Paper>
              })}
          </ul>
        </div>
      )
    }
  }
}