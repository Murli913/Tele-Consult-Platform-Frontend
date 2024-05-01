import React, { useRef, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import './email.css';
import emailjs from '@emailjs/browser';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ContactUs = () => {
  const form = useRef();
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const [successMessage, setSuccessMessage] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_v1gm6rs', 'template_viu5l96', form.current, {
        publicKey: 'uYtd_6Wk0tLOhJPR8',
      })
      .then(
        () => {
          setSuccessMessage('Email sent successfully');
          toast.success("Sent successfully"); // Set success message
          setNotification({
            open: true,
            message: 'Email sent successfully',
            severity: 'success',
          });
        },
        (error) => {
          toast.error("Error occurred while sending");
          setNotification({
            open: true,
            message: 'Failed to send email',
            severity: 'error',
          });
          console.log('FAILED...', error.text);
        },
      );
  };

  const handleNotificationClose = () => {
    setNotification({
      ...notification,
      open: false,
    });
  };

  return (
    <div className="contact-container">
      <Card className="custom-card">
        <CardContent className="card-content">
          <h2>Email Validation</h2>
          <form ref={form} onSubmit={sendEmail}>
          
            <div className="text-field">
              <TextField
                label="Email"
                name="user_email"
                type="email"
                variant="outlined"
                fullWidth
              />
            </div>
            <div className="text-field">
              <TextField
                label="Enter the code"
                name="message"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                halfHeight
              />
            </div>
            <div>
              <Button className='btn' variant="contained" color="primary" type="submit">
                Send OTP
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleNotificationClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleNotificationClose}
          severity={notification.severity}
        >
          {notification.message}
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={successMessage !== ''}
        autoHideDuration={6000}
        onClose={() => setSuccessMessage('')} // Reset success message
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => setSuccessMessage('')} // Reset success message
          severity="success"
        >
          {successMessage}
        </MuiAlert>
      </Snackbar>
      <ToastContainer/>
    </div>
  );
};
