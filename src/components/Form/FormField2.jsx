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
// import styles from './FormField.module.css'


// const EXTENSIONS = ['xlsx', 'xls', 'csv']

// const FormField = () => {
//     const classes = useStyles();
//     const [data, setFileData] = useState()
//     const [titles, setTitles] = useState([])
//     const [restData, setRestData] = useState([])
//     // console.log(restData)
//     const getExention = (file) => {
//         const parts = file.name.split('.')
//         const extension = parts[parts.length - 1]
//         return EXTENSIONS.includes(extension) // return boolean
//     }
//     const importExcel = (e, cb) => {

//         const file = e.target.files[0]
//         const reader = new FileReader()
//         setFileData(file)

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
//             setTitles((prev) => [...prev, ...titlesArray])
//             setRestData((prev) => [...prev, ...restDataArray])

//             cb("file", fileData)
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
//                         file: [], 
//                         selected: '', 
//                         titles: !!titles.length && !!restData.length && titles.slice(0, 5).map((title, idx) => ({ [title]: restData[0][idx] })) }}
//                     enableReinitialize
//                     onSubmit={(values) => console.log("Person", values)}
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
//                             <Form className={classes.form} onSubmit={handleSubmit}>
//                                 <TextField
//                                     name="firstName"
//                                     label="name"
//                                     type="text"
//                                     placeholder="Enter your name"
//                                     value={values.firstName}
//                                     onChange={handleChange}
//                                     onBlur={handleBlur}
//                                     variant="outlined"
//                                     margin="normal"
//                                     required
//                                     fullWidth
//                                     autoFocus
//                                 >
//                                 </ TextField>
//                                 <TextField
//                                     name="lastName"
//                                     type="text"
//                                     label="Surname"
//                                     placeholder="Enter your surname"
//                                     value={values.lastName}
//                                     onChange={handleChange}
//                                     onBlur={handleBlur}
//                                     variant="outlined"
//                                     margin="normal"
//                                     required
//                                     fullWidth
//                                 >
//                                 </ TextField>
//                                 {/* === Choose file ===== */}
//                                 <input
//                                     id="file"
//                                     name="file"
//                                     type="file"
//                                     onChange={(event) => {
//                                         importExcel(event, setFieldValue)
//                                     }} className="form-control"
//                                 />
//                                 {/* ======Table this data from excel */}
//                                 <div className={styles.tableBlock}>
//                                     <Typography component="h4" variant="h5">
//                                         Your Document:
//                                     </Typography>

//                                     <FieldArray name="file">
//                                         {({ insert, remove, push }) => (
//                                             <div>
//                                                 {!!values.titles.length &&
//                                                     values.titles.slice(0, 5).map((titles, index) => {
//                                                         return (
//                                                             <div key={index}>
//                                                                 <div className="col">
//                                                                     <label htmlFor={`titles.${index}.${Object.keys(titles)[0]}`}>{Object.keys(titles)[0]}</label>
//                                                                     <Field
//                                                                         name={`titles.${index}.${Object.keys(titles)[0]}`}
//                                                                         type="text"
//                                                                     />
//                                                                     <select
//                                                                         className={styles.selectButton}
//                                                                         name="selected"
//                                                                         value={values.selected}
//                                                                         onChange={handleChange}
//                                                                         onBlur={handleBlur}
//                                                                     >
//                                                                         <option value="" label="data type" />
//                                                                         <option value="integer" label="integer" />
//                                                                         <option value="string" label="string" />
//                                                                         <option value="data" label="data" />
//                                                                         <option value="float" label="float" />
//                                                                     </select>
//                                                                 </div>

//                                                             </div>
//                                                         )
//                                                     })}
//                                             </div>
//                                         )}
//                                     </FieldArray>
//                                 </div>
//                                 <div className={styles.tableButton}>
//                                     <Button
//                                         disabled={isSubmitting}
//                                         type="submit"
//                                         variant="contained"
//                                         color="primary"
//                                     > Confirm
//                                     </Button>
//                                 </div>
//                             </Form>
//                         );
//                     }}
//                 </Formik>
//             </div>
//         </Container>
//     );
// };

// export default FormField;