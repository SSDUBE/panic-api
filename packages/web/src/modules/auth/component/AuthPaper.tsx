import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Box, Typography} from '@material-ui/core';

import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  container: {
    overflow: 'auto',
    height: 'inherit',
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'center',
    },
  },
  paper: {
    backgroundColor: theme.palette.primary.light,
    width: '100%',
    height: '100vh',
    maxWidth: '25rem',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    overflow: 'auto',
  },
  header: {
    marginTop: theme.spacing(18),
    marginBottom: theme.spacing(4),
    textTransform: 'uppercase',
  },
  myTeamWelcome: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  myTeamWrapper: {
    width: '50%',
  },
  aboutMyTeam: {
    lineHeight: '28px',
    marginTop: theme.spacing(5),
  },
}));

interface Props {
  children: JSX.Element;
  header: string;
}

const AuthPaper = ({children, header}: Props) => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Paper elevation={3} className={classes.paper}>
        <Typography variant="h2" className={classes.header}>
          {header}
        </Typography>
        {children}
      </Paper>

      <Box className={classes.myTeamWelcome}>
        <Box className={classes.myTeamWrapper}>
          <Box>
            <Typography variant="h3">Welcome</Typography>
            <Typography variant="h3">To</Typography>
            <Typography variant="h3">Panic API</Typography>
          </Box>
          <Typography variant="h1" className={classes.aboutMyTeam}>
            Aura Development Baseline Test
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AuthPaper;
