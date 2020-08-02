import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {theme} from '../../../Theme';
import GoogleMap from '../../googleMap/GoogleMap';
import moment from 'moment';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  button: {
    border: '2px solid transparent',
    margin: theme.spacing(2),
  },
});

interface Props {
  open: boolean;
  panics: any;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PanicDialog = ({open, setOpen, panics}: Props) => {
  const classes = useStyles();
  const [coords, setCoords] = React.useState({latitude: 0, longitude: 0});
  const [showMaps, setShowMaps] = React.useState(false);

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          style: {
            backgroundColor: theme.palette.primary.light,
            boxShadow: 'none',
            width: '100%',
          },
        }}
      >
        <DialogTitle>User Panic Data</DialogTitle>
        <DialogContent>
          {!showMaps ? (
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Location</TableCell>
                    <TableCell align="right">latitude</TableCell>
                    <TableCell align="right">longitude</TableCell>
                    <TableCell align="right">panic date</TableCell>
                    <TableCell align="right">Map</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {panics.map((panic: any) => (
                    <TableRow>
                      <TableCell component="th" scope="row">
                        User Location
                      </TableCell>
                      <TableCell align="right">{panic.latitude}</TableCell>
                      <TableCell align="right">{panic.longitude}</TableCell>
                      <TableCell align="right">
                        {moment(panic.createdAt).format('DD-MM-YYYY HH:mm A')}
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          size="large"
                          color="primary"
                          className={classes.button}
                          onClick={() => {
                            setCoords({
                              latitude: panic.latitude,
                              longitude: panic.longitude,
                            });
                            setShowMaps(true);
                          }}
                        >
                          Maps
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <GoogleMap lat={coords.latitude} lng={coords.longitude} />
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              showMaps ? setShowMaps(false) : setOpen(false);
            }}
            variant="contained"
            size="large"
            color="primary"
          >
            {showMaps ? 'Back' : 'Close'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PanicDialog;
