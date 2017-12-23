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
import { Message } from './models/Message';
import rest from './utils/rest';
import FaAngleDown from 'react-icons/lib/fa/angle-down';

export default class App extends React.Component {
  constructor(props, messages) {
    super(props);
    this.state = {
      message: '',
      messages: [{message: 'No Messages'}],
      username: 'Pekka',
      date: Date.now(),
      messagesLoaded: false,
      usersOnline: [this.username, 'Destroyer666', 'Hetero', 'LissuPissis', 'ErkkiPekka', 'asdasd69', 'RektalSorm99', 'HerraH', 'Ms.Tervakeuhko'],
    }    

    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleMessageSendOnButton = this.handleMessageSendOnButton.bind(this);
    this.handleMessageSendOnEnterPress = this.handleMessageSendOnEnterPress.bind(this);
    this.postMessage = this.postMessage.bind(this);
  }

  messages = [];
  
  handleMessageChange(event) {       
      this.setState({
        message: event.target.value,
      });    
  }

  handleUsernameChange(event) {    
    this.setState({
      username: event.target.value,
    });    
  }

  postMessage(message) {
    if (message) {
      fetch('http://localhost:3000/api/messages', {
        method: 'POST',
        body: JSON.stringify({
          username: message.username,
          sent: message.sent,
          message: message.message
        }),
        headers: {"Content-Type": "application/json"}
      }).then(function(res){
        return res.json();
      }).then(function(data){
        console.log(data);
      });
    }
  }

  handleMessageSendOnEnterPress = (event) => {
    if (event.charCode === 13) {
      this.messages = this.state.messages;
      const message = this.state.message;
      const date = Date.now();
      const username = this.state.username;
      let messages = this.messages;

      let messageToPost;
      messageToPost = {
        message: message,
        sent: date,
        username: username
      };
      console.log(messageToPost);

      messages.push({
        sent: date,
        username: username,
        message: message
      });

      this.postMessage(messageToPost);

      this.setState({
        messages: messages,
        message: '',
      });
    }
  }

  handleMessageSendOnButton = (event) => {
    this.messages = this.state.messages;
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

  componentDidMount() {    
    fetch('http://localhost:3000/api/messages')
    .then(response => {      
      return response.json();
    })
    .then(data => {      
      let messages = [];     
      data.map((message) => {
        messages.push({
          username: message.username,
          sent: message.sent,
          message: message.message
        });
        this.setState({ messages: messages });        
      });              
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
                <div className="username-box">
                  <Input
                    id="username-input"
                    label="Username"
                    autoComplete="off"
                    value={this.state.username}
                    onChange={this.handleUsernameChange}
                    fullWidth>
                  </Input>
                </div>
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
                  onChange={this.handleMessageChange}
                  onKeyPress={this.handleMessageSendOnEnterPress}
                  autoFocus
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
                      <ModifyMessage />
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

export class ModifyMessage extends React.Component {
  constructor() {
    super();
    this.state = {
      isHidden: false,
    }

    this.toggleButtons = this.toggleButtons.bind(this);
  }

  toggleButtons = () => {
    const isHidden = this.state.isHidden;
    const element = document.getElementById('modifyMessageButtonsList');  
    switch (isHidden) {
      case false:
        this.setState({isHidden: true});
        element.classList.toggle('hide-el', isHidden);
        console.log('täällä: ', isHidden, element);
        break;
      case true:
        this.setState({isHidden: false});
        element.classList.toggle('hide-el', isHidden);
        console.log('täällä: ', isHidden, element);
        break;
    }      
  }

  render() {
    return(
      /** remove class: hide-el from most outer div to show buttons toggle on messages */
      <div className="modify-message hide-el">
        <div className="modify-message-arrow" onClick={this.toggleButtons}>
          <FaAngleDown />
        </div>
        <div id="modifyMessageButtonsList" className="modify-message-buttons hide-el">
          <button>Muokkaa</button>
          <button>Poista</button>            
        </div>
      </div>      
    )
  }
}