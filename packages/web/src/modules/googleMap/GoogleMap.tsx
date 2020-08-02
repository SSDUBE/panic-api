import React from 'react';
import {compose, withProps} from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';
import {makeStyles} from '@material-ui/core/styles';
import {Box} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  loadingElement: {
    height: '100%',
  },
  containerElement: {
    height: '400px',
    width: '100%',
  },
  mapElement: {
    height: '100%',
  },
}));

const apiKey = process.env.REACT_APP_MAPS_API_KEY;

interface Props {
  lat: number;
  lng: number;
}

const GoogleMapComponent = ({lat, lng}: Props) => {
  const classes = useStyles();
  const settings = {
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <Box className={classes.loadingElement} />,
    containerElement: <Box className={classes.containerElement} />,
    mapElement: <Box className={classes.mapElement} />,
  };

  const Map = compose(
    withProps(settings),
    withScriptjs,
    withGoogleMap
  )(() => (
    <GoogleMap defaultZoom={8} defaultCenter={{lat, lng}}>
      <Marker position={{lat, lng}} />
    </GoogleMap>
  ));

  return (
    <Box className={classes.root}>
      <Map />
    </Box>
  );
};

export default GoogleMapComponent;
