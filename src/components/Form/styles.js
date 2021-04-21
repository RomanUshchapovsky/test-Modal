import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    Form: {
      maxWidth: '500px',
      width: '100%',
      margin: '0 auto',
    },
  }));

  export default useStyles;