//Style import
import './App.less';

//React imports
import React from 'react';

//Material UI imports
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

//Custom imports
import { Message } from "./models/Message";

export default class App extends React.Component {
  constructor(props, messages) {
    super(props);
    this.state = {
      message: 'No Messages.',
    }
  }

  handleChange = message => event => {
    this.setState({
      [message]: event.target.value,
    });
  }

  handleKeyPress = message => event => {
    if (event.charCode == 13) {
      event.preventDefault();
      event.stopPropagation();
      this.setState({
        [messages]: event.target.value,
      });
    }
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
              <Paper className="receivedMessages">
                <h2>{this.state.message}</h2>
              </Paper>
            </Paper>
          </Grid>
          <Grid item xs={2}>
            <Paper className="online-box">asdasdasd</Paper>
          </Grid>
          <Grid item xs={2}>
            <Paper className="username-box">asdasdasd</Paper>
          </Grid>
          <Grid item xs={10}>
            <Paper className="message-input-box">
              <div className="message-input">
                <TextField
                  id="message"
                  label="Message"
                  onKeyPress={this.handleKeyPress('message')}
                  fullWidth>

                </TextField>
              </div>              
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}