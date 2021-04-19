import React from 'react';


import { Formik, Form, Field } from 'formik';
import {
  CssBaseline,
  TextField,
  Typography,
  Container,
} from '@material-ui/core';

import useStyles from './styles';


export default function FormField(data) {
  const classes = useStyles();


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
        Transition modal
        </Typography>
        <Formik  >
          {() => {
            return (
              <div>
                <Form className={classes.form}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id=""
                    label="name"
                    type="text"
                    name="text"
                    autoFocus
                  >
                    <Field />
                  </ TextField>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="text"
                    label="Surname"
                    type="text"
                    id=""
                  >
                    <Field />
                  </ TextField>
                </Form>
              </div>
            );
          }}
        </Formik>
      </div>
    </Container>
  );
};