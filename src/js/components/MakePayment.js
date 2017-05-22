import React from 'react';
import Formsy from 'formsy-react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import { FormsyCheckbox, FormsyDate, FormsyRadio, FormsyRadioGroup,
    FormsySelect, FormsyText, FormsyTime, FormsyToggle, FormsyAutoComplete } from 'formsy-material-ui/lib';
import {cardDetails} from '../actions/action.js';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import PaymentForm from "../components/PaymentForm";

const MakePayment = React.createClass({

  

  styles: {
    paperStyle: {
      color: 'pink',
      width: 300,
      margin: 'auto',
      padding: 20,
    },
    switchStyle: {
      marginBottom: 16,
    },
    submitStyle: {
      marginTop: 32,
    },
  },


 
   getInitialState() {
    return {
      open: false,
    };
  },

  handleOpen(){
    this.setState({open: true});
  },

  handleClose(){
    this.setState({open: false});
  },

  render() {
    let {paperStyle, switchStyle, submitStyle } = this.styles;
     const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />
    ];

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Paper style={paperStyle}>
            
            
           <div>
        <RaisedButton label="Proceed to Payment" onTouchTap={this.handleOpen} />
        <Dialog
          title="Enter your details here"
          actions={actions}
          modal={true}
          open={this.state.open}
          
        >
          <PaymentForm/>
        </Dialog>

         
      </div>
         
        </Paper>
      </MuiThemeProvider>
    );
  },
});

export default MakePayment;