// import React, { useState } from 'react';
// import XLSX from 'xlsx';
// import Papa from 'papaparse';
// import { Formik, Form, Field, FieldArray } from 'formik';
// import {
//     CssBaseline,
//     TextField,
//     Typography,
//     Container,
//     Button,
// } from '@material-ui/core';

// import { FormValidation } from "../constants/index";
// import { FORM_HELP_TEXT } from "../constants/messages";
// import useStyles from './styles';


// const EXTENSIONS = ['xlsx', 'xls', 'csv']

// const FormField2 = () => {
//     const classes = useStyles();

//     const getExention = (file) => {
//         const parts = file.name.split('.')
//         const extension = parts[parts.length - 1]
//         return EXTENSIONS.includes(extension) // return boolean
//     }

//     const importExcel = (e, cb) => {

//         const file = e.target.files[0]
//         const reader = new FileReader()

//         reader.onload = (event) => {
//             //parse data
//             const binaryStr = event.target.result
//             const workBook = XLSX.read(binaryStr, { type: "binary" })
//             //get first sheet
//             const workSheetName = workBook.SheetNames[0]
//             const workSheet = workBook.Sheets[workSheetName]
//             //convert to array
//             // const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 })

//             const fileInCSVFormt = XLSX.utils.sheet_to_csv(workSheet, { header: 1 });
//             const fileData = Papa.parse(fileInCSVFormt).data;

//             const [titlesArray, ...restDataArray] = fileData
//             const data = titlesArray.map((title, idx) => ({ [title]: restDataArray[0][idx] }))
//             cb("data", data)

//         }
//         if (file) {
//             if (getExention(file)) {
//                 reader.readAsBinaryString(file)
//             } else {
//                 alert("Invalid file input, Select Excel, CSV file")
//             }
//         }
//     }

//     return (
//         <Container component="main" maxWidth="xs">
//             <CssBaseline />
//             <div className={classes.paper}>
//                 <Typography component="h1" variant="h5">
//                     Transition modal
//                 </Typography>

//                 <Formik
//                     initialValues={{ 
//                         firstName: "", 
//                         lastName: "",
//                          data: [], 
//                          selected: '' }}
//                     enableReinitialize
//                     onSubmit={(values) => console.log("Logging in", values)}
//                 >
//                     {(props) => {
//                         const {
//                             values,
//                             isSubmitting,
//                             handleChange,
//                             handleBlur,
//                             handleSubmit,
//                             setFieldValue
//                         } = props;
//                         return (
//                             <form onSubmit={handleSubmit}>
//                                 <label htmlFor="email">Email</label>
//                                 <input
//                                     name="firstName"
//                                     type="text"
//                                     placeholder="Enter your email"
//                                     value={values.firstName}
//                                     onChange={handleChange}
//                                     onBlur={handleBlur}
//                                 />

//                                 <label htmlFor="email">Password</label>
//                                 <input
//                                     name="lastName"
//                                     type="text"
//                                     placeholder="Enter your password"
//                                     value={values.lastName}
//                                     onChange={handleChange}
//                                     onBlur={handleBlur}
//                                 />
//                                 {/*<Field name={'file'} value={values.file} type="file" onChange={(e) => {*/}
//                                 {/*    importExcel(e, setFieldValue)*/}
//                                 {/*}}/>*/}
//                                 <input id="file" name="file" type="file" onChange={(event) => {
//                                     // setFieldValue("file", event.currentTarget.files[0]);
//                                     importExcel(event, setFieldValue)
//                                 }} className="form-control" />

//                                 <select
//                                     name="selected"
//                                     value={values.selected}
//                                     onChange={handleChange}
//                                     onBlur={handleBlur}
//                                     style={{ display: 'block' }}
//                                 >
//                                     <option value="" label="Select something" />
//                                     <option value="red" label="red" />
//                                     <option value="blue" label="blue" />
//                                     <option value="green" label="green" />
//                                 </select>

//                                 <FieldArray name="titles">
//                                     {({ insert, remove, push }) => (
//                                         <div>
//                                             {!!values.data.length &&
//                                                 values.data.map((titles, index) => {
//                                                     return (
//                                                         <div key={index}>
//                                                             <div className="col">
//                                                                 <label htmlFor={`data.${index}.${Object.keys(titles)[0]}`}>{Object.keys(titles)[0]}</label>
//                                                                 <Field
//                                                                     name={`data.${index}.${Object.keys(titles)[0]}`}
//                                                                     type="text"
//                                                                 />

//                                                             </div>
//                                                         </div>
//                                                     )
//                                                 })}
//                                         </div>
//                                     )}
//                                 </FieldArray>

//                                 <button type="submit" disabled={isSubmitting}>
//                                     Login
//                                 </button>
//                             </form>
//                         );
//                     }}
//                 </Formik>
//             </div>
//         </Container>
//     );
// };

// export default FormField2;