import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

import clsx from 'clsx';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import {AuthContext} from '../../context/AuthContext';
import {TextField} from 'formik-material-ui';
import {Formik, Form, Field} from 'formik';
import {useHistory} from 'react-router-dom';
import {Box, Typography} from '@material-ui/core';
import AuthPaper from './component/AuthPaper';
import BounceLoader from 'react-spinners/BounceLoader';
import {theme} from '../../Theme';

const Schema = Yup.object().shape({
  username: Yup.string()
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))|(admin)$/,
      'Your email does not appear to be valid'
    )
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const useStyles = makeStyles((theme) => ({
  formInput: {
    display: 'flex',
    flexDirection: 'column',
    width: 'inherit',
    maxWidth: '30rem',
  },
  button: {
    border: '2px solid transparent',
  },
  registerContent: {
    display: 'flex',
    flexDirection: 'row',
  },
  register: {
    marginLeft: theme.spacing(1),
    color: theme.palette.secondary.main,
    cursor: 'pointer',
  },
  footerContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  textField: {
    // width: '35ch',
  },
  margin: {
    margin: theme.spacing(1),
  },
  error: {
    color: 'red',
  },
}));

const SignIn = () => {
  const history = useHistory();
  const classes = useStyles();

  const {SignIn} = React.useContext(AuthContext);

  return (
    <AuthPaper header="Signin to your account">
      <Formik
        initialValues={{username: '', password: ''}}
        validationSchema={Schema}
        onSubmit={async (values, {setStatus}) => {
          const response = await SignIn(values.username, values.password);
          // @ts-ignore
          if (response.error) {
            // @ts-ignore
            setStatus(response.error);
          } else if (response) {
            history.push('/');
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          status,
        }) => (
          <Form className={classes.formInput}>
            <Field
              component={TextField}
              autoComplete="off"
              label="Email"
              name="username"
              variant="outlined"
              onChange={handleChange}
              className={clsx(classes.margin, classes.textField)}
              helperText={errors.username}
              InputLabelProps={{
                style: {color: '#fff'},
              }}
            />
            <Field
              component={TextField}
              autoComplete="off"
              label="Password"
              name="password"
              type="password"
              variant="outlined"
              onChange={handleChange}
              className={clsx(classes.margin, classes.textField)}
              helperText={errors.username}
              InputLabelProps={{
                style: {color: '#fff'},
              }}
            />
            <Button
              variant="contained"
              size="large"
              color="primary"
              className={clsx(classes.margin, classes.button)}
              onClick={() => handleSubmit()}
            >
              {!isSubmitting ? (
                'SignIn'
              ) : (
                <BounceLoader
                  size={25}
                  color={theme.palette.secondary.main}
                  loading={true}
                />
              )}
            </Button>

            <Typography
              variant="h1"
              className={clsx(classes.error, classes.margin)}
            >
              {status}
            </Typography>
            <Box className={classes.footerContent}>
              <Box className={classes.registerContent}>
                <Typography variant="h1">Dont have an account?</Typography>
                <Typography
                  variant="h1"
                  className={classes.register}
                  onClick={() => history.push('signup')}
                >
                  SignUp
                </Typography>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </AuthPaper>
  );
};

export default SignIn;
