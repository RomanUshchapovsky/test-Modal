import React, { useState } from 'react';
import XLSX from 'xlsx';
import Papa from 'papaparse';
import { Formik, Form, Field } from 'formik';
import {
  CssBaseline,
  TextField,
  Typography,
  Container,
  Button,
} from '@material-ui/core';


import { FormValidation } from "../constants/index";
import { FORM_HELP_TEXT } from "../constants/messages";
import useStyles from './styles';


const EXTENSIONS = ['xlsx', 'xls', 'csv']

const FormField = () => {
  const classes = useStyles();
  const [data, setFileData] = useState()
  // const [state, setFieldValue] = useState()

  // =======import excel=========
  const getExention = (file) => {
    const parts = file.name.split('.')
    const extension = parts[parts.length - 1]
    return EXTENSIONS.includes(extension) // return boolean
  }
  const importExcel = (e, cb) => {

    const file = e.target.files[0]
    const reader = new FileReader()
    setFileData(file)

    reader.onload = (event) => {
      //parse data
      const binaryStr = event.target.result
      const workBook = XLSX.read(binaryStr, { type: "binary" })
      //get first sheet
      const workSheetName = workBook.SheetNames[0]
      const workSheet = workBook.Sheets[workSheetName]
      //convert to array
      // const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 })

      const fileInCSVFormt = XLSX.utils.sheet_to_csv(workSheet, { header: 1 });
      const fileData = Papa.parse(fileInCSVFormt).data;

      console.log("data", fileData)

      // cb("file", fileData, false)

    }
    if (file) {
      if (getExention(file)) {
        reader.readAsBinaryString(file)
      }
      else {
        alert("Invalid file input, Select Excel, CSV file")
      }
    }
  }
  // ===============================================================
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Transition modal
        </Typography>

        <Formik
          initialState={{
            file: null,
            firstName: "name",
            lastName: "name"
          }}
          validationSchema={FormValidation.FIELD_ITEM.VALIDATION}
        >
          {(props) => {
            return (
              <Form className={classes.form}>

                <Field name="firstName">
                  {({
                    field, // { name, value, onChange, onBlur }
                    form: { values, }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    meta,
                  }) => (
                    <div>Name
                      <input type="text"
                        placeholder={FORM_HELP_TEXT.placeholder.text}
                        {...field} />
                    </div>
                  )}
                </Field>
                <Field name="lastName">
                  {({
                    field, // { name, value, onChange, onBlur }
                    form: { values, }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    meta,
                  }) => (
                    <div>Surname
                      <input type="text"
                        placeholder="Surname"
                        {...field} />
                    </div>
                  )}
                </Field>
                {/* <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id=""
                  label="name"
                  type="text"
                  name="text"
                  placeholder={FORM_HELP_TEXT.placeholder.text}
                  autoFocus
                >
                  <Field />
                </ TextField> */}
                {/* <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="text"
                  label="Surname"
                  type="text"
                  id=""
                  placeholder={FORM_HELP_TEXT.placeholder.text}
                >
                  <Field />
                </ TextField> */}
                {/* <input type="file" onChange={importExcel} /> */}

                <Field type="file" onChange={(e) => {
                  importExcel(e, props.setFieldValue)
                }} />
                <div>
                  <Field />
                  <Field />

                  <Field as="select"
                    name="data"
                  // onChange={props}
                  >
                    <option value="">Red</option>
                    <option value="">Green</option>
                    <option value="">Blue</option>
                    <option value="">Some</option>
                  </Field>
                </div>

                <Button type="submit" variant="contained" color="primary">confirm</Button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </Container>
  );
};

export default FormField;