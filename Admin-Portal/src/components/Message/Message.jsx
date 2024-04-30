// import React, { Component } from 'react';
// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
// import Snackbar from '@material-ui/core/Snackbar';
// import MuiAlert from '@material-ui/lab/Alert';
// import './Message.css';

// class Message extends Component {
//   state = {
//     text: {
//       recipient: '',
//       textmessage: ''
//     },
//     notification: {
//       open: false,
//       message: '',
//       severity: 'success'
//     }
//   };

//   sendText = () => {
//     const { text } = this.state;
//     //pass text message GET variables via query string
//     fetch(`http://127.0.0.1:4000/send-text?recipient=${text.recipient}&textmessage=${text.textmessage}`)
//       .then(response => {
//         if (response.ok) {
//           this.setState({
//             notification: {
//               open: true,
//               message: 'Message sent successfully',
//               severity: 'success'
//             }
//           });
//         } else {
//           this.setState({
//             notification: {
//               open: true,
//               message: 'Failed to send message',
//               severity: 'error'
//             }
//           });
//         }
//       })
//       .catch(err => console.error(err));
//   };

//   handleNotificationClose = () => {
//     this.setState({
//       notification: {
//         ...this.state.notification,
//         open: false
//       }
//     });
//   };

//   render() {
//     const { text, notification } = this.state;
//     return (
//       <div className="App">
 
//         <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
//           <Card>
//             <CardContent>
//               <h2>Phone Number Validation</h2>
//               <div style={{ marginBottom: '20px' }}>
//                 <TextField
//                   label="Your Phone Number"
//                   variant="outlined"
//                   value={text.recipient}
//                   onChange={e => this.setState({ text: { ...text, recipient: e.target.value } })}
//                   fullWidth
//                 />
//               </div>
//               <div style={{ marginBottom: '20px' }}>
//                 <TextField
//                   label="Enter the code"
//                   variant="outlined"
//                   multiline
//                   rows={3}
//                   value={text.textmessage}
//                   onChange={e => this.setState({ text: { ...text, textmessage: e.target.value } })}
//                   fullWidth
//                 />
//               </div>
//               <div>
//                 <Button   style={{ width: '250px' }} variant="contained" color="primary" onClick={this.sendText}>
//                   Send OTP
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//         <Snackbar open={notification.open} autoHideDuration={6000} onClose={this.handleNotificationClose}>
//           <MuiAlert
//             elevation={6}
//             variant="filled"
//             onClose={this.handleNotificationClose}
//             severity={notification.severity}
//           >
//             {notification.message}
//           </MuiAlert>
//         </Snackbar>
//       </div>
//     );
//   }
// }

// export default Message;
