import React, { useState } from 'react';
import XLSX from 'xlsx';
import Papa from "papaparse";

import {
  Modal,
  Backdrop,
  Fade,
  Button,
  List,
  ListItem,
  Form,
  Field,
} from '@material-ui/core';
import useStyles from './styles';
import FormField from '../Form/Form';


const EXTENSIONS = ['xlsx', 'xls', 'csv']



export default function TransitionsModal() {

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // ------------------------------
  const rows = [];
  const [colDefs, setColDefs] = useState()
  const [data, setData] = useState()

  const getExention = (file) => {
    const parts = file.name.split('.')
    const extension = parts[parts.length - 1]
    return EXTENSIONS.includes(extension) // return boolean
  }

  const convertToJson = (headers, data) => {
    const rows = []
    data.forEach(row => {
      let rowData = {}
      row.forEach((element, index) => {
        rowData[headers[index]] = element
      })
      rows.push(rowData)
    });
    return rows
  }
  const importExcel = (e) => {
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

      const priceInCSVFormt = XLSX.utils.sheet_to_csv(workSheet, { header: 1 });
      const fileData = Papa.parse(priceInCSVFormt).data;


      console.log("data",fileData)


      const headers = fileData[0]
      const heads = headers.map(head => ({ title: head, field: head.field }))
      setColDefs(heads)
      console.log("heads", heads)

      //removing header
      fileData.splice(0, 1)
      setData(convertToJson(headers, fileData))
    }

    if (file) {
      if (getExention(file)) {
        reader.readAsBinaryString(file)
      }
      else {
        alert("Invalid file input, Select Excel, CSV file")
      }
    } else {
      setData([])
      setColDefs([])
    }
  }
  // -----------------------------
  return (
    <div>
      <button className={classes.button} type="button" onClick={handleOpen}>
        Open Modal
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
  
            <FormField />



            <input type="file" onChange={importExcel} />
           {/* <List>
          {[setData].map((text, index) => (
                        <ListItem >
                          {heads}
                        </ListItem>
                    ))} 
            </List> */}

   





            {/* <table data={data}>
              <thead>
                <tr>
                </tr>
              </thead>
     
            </table> */}


            {/* <Button variant="contained" color="primary" onClick={console.log({colDefs})}>confirm</Button> */}
            <Button variant="contained" color="primary">confirm</Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};