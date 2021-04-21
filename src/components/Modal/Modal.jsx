import React from 'react';
import {
  Modal,
  Backdrop,
  Button,
  Fade,
} from '@material-ui/core';

import useStyles from './styles';
import FormField from '../Form/FormField';


const ModalWindow = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button
        variant="contained"
        color="primary" className={classes.button}
        onClick={handleOpen}
      >
        Open Modal
      </Button>
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
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default ModalWindow;