import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
import {theme} from '../../../Theme';
import PanicDialog from './PanicDialog';
import {AdminQueryResponse} from '../__generated__/AdminQuery.graphql';

const useStyles = makeStyles({
  root: {
    // minWidth: 275,
    background: theme.palette.primary.light,
    marginTop: theme.spacing(2),
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  table: {
    minWidth: 650,
  },
  button: {
    border: '2px solid transparent',
    margin: theme.spacing(2),
  },
});

interface Props {
  data: AdminQueryResponse;
}

const UserCard = ({data}: Props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [panics, setPanics] = React.useState([]);

  return (
    <Card className={classes.root}>
      <CardContent>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell align="right">fullname</TableCell>
                <TableCell align="right">contact number</TableCell>
                <TableCell align="right">username</TableCell>
                <TableCell align="right">active</TableCell>
                <TableCell align="right">created at</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.viewer &&
                data.viewer.user &&
                data.viewer.user.length > 0 &&
                data.viewer.user.map((user) => (
                  <TableRow>
                    <TableCell component="th" scope="row">
                      User data
                    </TableCell>
                    <TableCell align="right">{user!.fullname}</TableCell>
                    <TableCell align="right">{user!.contactNumber}</TableCell>
                    <TableCell align="right">{user!.username}</TableCell>
                    <TableCell align="right">{user!.active}</TableCell>
                    <TableCell align="right">
                      {
                        // @ts-ignore
                        moment(user!.createdAt).format('DD-MM-YYYY HH:mm A')
                      }
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        className={classes.button}
                        onClick={() => {
                          // @ts-ignore
                          setPanics(user!.userPanics);
                          setOpen(true);
                        }}
                      >
                        Panic Info
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
      <PanicDialog open={open} setOpen={setOpen} panics={panics} />
    </Card>
  );
};

export default UserCard;
