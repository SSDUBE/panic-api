import React from 'react';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core/styles';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ControlPoint from '@material-ui/icons/ControlPoint';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import {AuthContext} from '../../context/AuthContext';
import {useMutation} from 'relay-hooks';
import graphql from 'babel-plugin-relay/macro';
import Backdrop from '@material-ui/core/Backdrop';
import BounceLoader from 'react-spinners/BounceLoader';
import {theme} from '../../Theme';

const useStyles = makeStyles((theme) => ({
  root: {},
  bottomNav: {
    width: 500,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    background: theme.palette.primary.light,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

interface Props {
  latitude: number;
  longitude: number;
}

const User = ({latitude, longitude}: Props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const {SignOut} = React.useContext(AuthContext);

  const [mutate, {loading}] = useMutation(
    graphql`
      mutation UserQuery($input: UserPanicsInput!) {
        userPanics(input: $input) {
          clientMutationId
        }
      }
    `,
    {
      onCompleted: () => {
        alert(
          'The admin has been notified of your emergency we have your location and someone has been sent to assist you'
        );
      },
    }
  );

  function handleSignOut() {
    SignOut();
  }

  async function handlePanic() {
    await mutate({
      variables: {
        input: {latitude, longitude},
      },
    });
  }

  return (
    <Box className={classes.root}>
      <Backdrop className={classes.backdrop} open={loading}>
        <BounceLoader
          size={150}
          color={theme.palette.secondary.main}
          loading={loading}
        />
      </Backdrop>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.bottomNav}
      >
        <BottomNavigationAction
          onClick={() => handlePanic()}
          label="Panic"
          icon={<ControlPoint />}
        />
        <BottomNavigationAction
          onClick={handleSignOut}
          label="Logout"
          icon={<PowerSettingsNewIcon />}
        />
      </BottomNavigation>
    </Box>
  );
};

export default User;
