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

  const [titles, setTitles] = useState([])
  const [restData, setRestData] = useState([])
  // console.log('title===>>>', restData)
  const [state, setFieldValue] = useState()

  // =======import excel=========
  const getExention = (file) => {
    const parts = file.name.split('.')
    const extension = parts[parts.length - 1]
    return EXTENSIONS.includes(extension) // return boolean
  }
  const importExcel = (e, cb) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    // setFileData(file)

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

      const [titlesArray, ...restDataArray] = fileData
      setTitles((prev) => [...prev, ...titlesArray])
      setRestData((prev) => [...prev, ...restDataArray])
      // cb("file", fileData, false)

    }
    if (file) {
      if (getExention(file)) {
        reader.readAsBinaryString(file)
      } else {
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
          initialValues={{ firstName: "", lastName: "" }}
          onSubmit={(values) => console.log("Person", values)}
          validationSchema={FormValidation.FIELD_ITEM.VALIDATION}
        >
          {(props) => {
            const {
              values,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit
            } = props;
            return (
              <Form className={classes.form} onSubmit={handleSubmit}>
                {/* <label>name</label>
                <Field
                  name="firstName"
                  type="text"
                  placeholder={FORM_HELP_TEXT.placeholder.text}
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                /> 

                <label >surname</label> *
                 <Field
                  name="lastName"
                  type="text"
                  placeholder="Enter your surname"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                /> */}
                <TextField
                  name="firstName"
                  label="name"
                  type="text"
                  placeholder={FORM_HELP_TEXT.placeholder.text}
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  autoFocus
                >
                  <Field />
                </ TextField>
                <TextField
                  name="lastName"
                  type="text"
                  label="Surname"
                  placeholder="Enter your surname"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                >
                  <Field />
                </ TextField>
                <input type="file" onChange={importExcel} />

                {/* <Field type="file" onChange={(e) => {
                  importExcel(e, props.setFieldValue)
                }} /> */}
                <Typography component="h4" >
                  Your Document:
                </Typography>

                <table >
                  {!!restData.length && titles.slice(0, 5).map((title, idx, id) => <thead>
                    <tr>
                      <th key={title}>{title}</th>
                      <th key={idx}>{restData[0][idx]}</th>
                      <th key={id}>
                        <select>
                          <option>Пункт 1</option>
                          <option>Пункт 2</option>
                          <option>Пункт 3</option>
                          <option>Пункт 4</option>
                        </select>
                      </th>
                    </tr>
                  </thead>)}
                  {/*{titles.map((title, idx) => <tr><th>{title}</th>{restData.map(i=><th>{i[idx]}</th>)}</tr>)}*/}
                </table>

                <Button
                  disabled={isSubmitting}
                  type="submit"
                  variant="contained"
                  color="primary"
                > Confirm
                </Button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </Container>
  );
};

export default FormField;