import React from 'react';
import Box from '@material-ui/core/Box';
import {geolocated, GeolocatedProps} from 'react-geolocated';
import {makeStyles} from '@material-ui/core/styles';
import {Typography, Container} from '@material-ui/core';
import GoogleMap from '../googleMap/GoogleMap';
import {AuthContext} from '../../context/AuthContext';
import User from '../user/User';
import Admin from '../admin/Admin';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.main,
    height: '100vh',
    overflow: 'auto',
  },
  geolocationContainer: {
    height: 'inherit',
  },
  enableLocation: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'inherit',
  },
  errorEnableLocation: {
    width: '700px',
    [theme.breakpoints.down('sm')]: {
      width: '300px',
    },
  },
  mapContainer: {
    display: 'flex',
    // justifyContent: 'center',
    flexDirection: 'column',
  },
}));

interface Props extends GeolocatedProps {}

const Home = (props: Props) => {
  const classes = useStyles();
  const {auth} = React.useContext(AuthContext);

  if (!auth.authenticated) return <></>;

  return (
    <Box className={classes.root}>
      <Container className={classes.geolocationContainer}>
        {auth.role === 'ADMIN' ? (
          <Admin />
        ) : !props.isGeolocationAvailable ? (
          <Box className={classes.enableLocation}>
            <Typography variant="h2">
              Your browser does not support Geolocation
            </Typography>
          </Box>
        ) : (
          <>
            {!props.isGeolocationEnabled ? (
              <Box className={classes.enableLocation}>
                <Typography
                  variant="h2"
                  className={classes.errorEnableLocation}
                >
                  You need to enable your location so that you can get the
                  assistance needed incase of emergence
                </Typography>
              </Box>
            ) : (
              props.coords && (
                <Box className={classes.mapContainer}>
                  <User
                    latitude={props.coords.latitude}
                    longitude={props.coords.longitude}
                  />
                  <GoogleMap
                    lat={props.coords.latitude}
                    lng={props.coords.longitude}
                  />
                </Box>
              )
            )}
          </>
        )}
      </Container>
    </Box>
  );
};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
  },
  userDecisionTimeout: 5000,
})(Home);
