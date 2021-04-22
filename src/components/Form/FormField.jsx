import React from 'react';
import XLSX from 'xlsx';
import Papa from 'papaparse';
import { Formik, Form, Field, FieldArray } from 'formik';
import {
  CssBaseline,
  TextField,
  Typography,
  Container,
  Button,
} from '@material-ui/core';

import useStyles from './styles';
import styles from './FormField.module.css'

const EXTENSIONS = ['xlsx', 'xls', 'csv']

const FormField = () => {
  const classes = useStyles();

  // =======import excel=========
  const getExention = (file) => {
    const parts = file.name.split('.')
    const extension = parts[parts.length - 1]
    return EXTENSIONS.includes(extension) // return boolean
  }
  const importExcel = (e, cb) => {
    const file = e.target.files[0]
    const reader = new FileReader()

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

      const [titlesArray, ...restDataArray] = fileData
      const data = titlesArray.map((title, idx) => ({ [title]: restDataArray[0][idx] }))
      cb("data", data)

    }
    if (file) {
      if (getExention(file)) {
        reader.readAsBinaryString(file)
      } else {
        alert("Invalid file input, Select Excel, CSV file")
      }
    }
  }
  // =======================================================
  // const resultData = () => {

  // }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Transition modal
        </Typography>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            data: [],
            selected: '',
          }}
          enableReinitialize
          onSubmit={(values) => console.log("Person", values)}
        >
          {(props) => {
            const {
              values,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue
            } = props;
            // console.log('values', values)
            return (
              <Form className={classes.form} onSubmit={handleSubmit}>
                <TextField
                  name="firstName"
                  label="name"
                  type="text"
                  placeholder="Enter your name"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  autoFocus
                >
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
                </ TextField>
                {/* === Choose file ===== */}
                <label className={styles.lableInput} htmlFor="file">Choose file</label>
                <p  htmlFor="file">{values.file}</p>
                <Field
                  className={styles.fileInput}
                  id="file"
                  name="file"
                  type="file"
                  hidden
                  onChange={(event) => {
                    importExcel(event, setFieldValue)
                  }}
                />
                {/* ======Table with data from excel */}
                <div className={styles.tableBlock}>
                  <Typography component="h4" variant="h5">
                    Your Document:
                  </Typography>

                  <FieldArray name="file">
                    {({ insert, remove, push })  => (
                      <div>
                        {!!values.data.length &&
                          values.data.slice(0, 5).map((titles, index) => {
                            // console.log('----', titles, values.data);
                            return (
                              <div key={index}>
                                <div className={styles.arrayBlock}>
                                  <div className={styles.labelBlock}>
                                    <label
                                      className={styles.labelItem}
                                      // htmlFor={`data.${index}.${Object.keys(titles)[0]}`}
                                    >
                                      <b>{Object.keys(titles)[0]}</b>
                                      {/* <b>{`data.${index}.${Object.keys(titles)[0]}`}</b> */}
                                    </label>
                                  </div>
                                  <div>
                                    <Field
                                      className={styles.dataField}
                                      name={`data.${index}.${Object.keys(titles)[0]}`}
                                      type="text"
                                    />
                                  </div>
                                  <div>
                                    <select
                                      className={styles.selectButton}
                                      name="selected"
                                      value={values.selected}
                                      onChange={handleChange}
                                      // onChange={setFieldValue}
                                      onBlur={handleBlur}
                                      onClick={() => values.data.push({ name:''})}
                                    >
                                      <option value="" label="data type" />
                                      <option value="integer" label="integer" />
                                      <option value="string" label="string" />
                                      <option value="data" label="data" />
                                      <option value="float" label="float" />
                                    </select>
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                      </div>
                    )}
                  </FieldArray>
                </div>
                <div className={styles.tableButton}>
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    variant="contained"
                    color="primary"
                  > Confirm
                  </Button>

                  <Button                  
                    type="reset"
                    variant="contained"
                    color="secondary"
                  > Reset
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </Container>
  );
};

export default FormField;