import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core/styles';
import {AuthContext} from '../../../context/AuthContext';
import {AdminQueryResponse} from '../__generated__/AdminQuery.graphql';
import UserCard from './UserCard';

const useStyles = makeStyles((theme) => ({
  root: {},
  bottomNav: {
    width: 500,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    background: theme.palette.primary.light,
  },
}));

interface Props {
  data: AdminQueryResponse;
}

const RenderAdminPage = ({data}: Props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const {SignOut} = React.useContext(AuthContext);

  function handleSignOut() {
    SignOut();
  }

  return (
    <Box className={classes.root}>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.bottomNav}
      >
        <BottomNavigationAction
          onClick={handleSignOut}
          label="Logout"
          icon={<PowerSettingsNewIcon />}
        />
      </BottomNavigation>
      {data.viewer.user!.map((user) => {
        return <UserCard user={user} />;
      })}
    </Box>
  );
};

export default RenderAdminPage;
