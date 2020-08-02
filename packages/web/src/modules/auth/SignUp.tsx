import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

import clsx from 'clsx';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import {AuthContext} from '../../context/AuthContext';
import {TextField} from 'formik-material-ui';
import {Formik, Form, Field} from 'formik';
import {useHistory} from 'react-router-dom';
import {Typography} from '@material-ui/core';
import {Box} from '@material-ui/core';
import AuthPaper from './component/AuthPaper';

import BounceLoader from 'react-spinners/BounceLoader';
import {theme} from '../../Theme';

const Schema = Yup.object().shape({
  fullName: Yup.string()
    .required('Name is a required field')
    .matches(
      /^[a-zA-Z]/,
      'Name and Surname cannot have a single space as an entry.'
    ),
  contactNumber: Yup.string()
    .required('Contact number is a required field')
    .matches(
      /^0(6|7|8){1}[0-9]{1}[0-9]{7}$/,
      'Please enter a valid mobile number that has 10 numbers eg: 082 123 4567'
    ),
  username: Yup.string()
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Your email does not appear to be valid'
    )
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Your password length must be greater than 6')
    .required('Password is required'),
  repeatPassword: Yup.string()
    .required('Password confirmation is required')
    .oneOf([Yup.ref('password')], 'Passwords do not match'),
});

const useStyles = makeStyles((theme) => ({
  formInput: {
    display: 'flex',
    flexDirection: 'column',
    width: 'inherit',
    maxWidth: '30rem',
  },
  textField: {
    // width: '35ch',
  },
  button: {
    border: '2px solid transparent',
  },
  margin: {
    margin: theme.spacing(1),
  },
  registerContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  signup: {
    marginLeft: theme.spacing(1),
    color: theme.palette.secondary.main,
    cursor: 'pointer',
  },
  error: {
    color: 'red',
  },
  success: {
    color: '#00bd3e',
  },
}));

const SignUp = () => {
  const classes = useStyles();

  const {SignUp} = React.useContext(AuthContext);
  const [isError, setIsError] = React.useState(false);
  const history = useHistory();

  return (
    <AuthPaper header="Create an account">
      <Formik
        initialValues={{
          username: '',
          password: '',
          fullName: '',
          contactNumber: '',
        }}
        validationSchema={Schema}
        onSubmit={async (values, {setStatus}) => {
          try {
            const response = await SignUp({
              username: values.username,
              password: values.password,
              fullName: values.fullName,
              contactNumber: values.contactNumber,
            });

            // @ts-ignore
            if (response.error) {
              // @ts-ignore
              setStatus(response.error);
              setIsError(true);
            } else {
              // @ts-ignore
              setStatus(response.success);
              setIsError(false);
            }
          } catch (e) {
            setStatus('Error: ' + e.error);
            setIsError(true);
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
              label="Full Name"
              name="fullName"
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
              label="Contact Number"
              name="contactNumber"
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
            <Field
              component={TextField}
              autoComplete="off"
              label="Repeat-password"
              name="repeatPassword"
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
              disabled={isSubmitting}
            >
              {!isSubmitting ? (
                'SignUp'
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
              className={clsx(
                isError ? classes.error : classes.success,
                classes.margin
              )}
            >
              {status}
            </Typography>
            <Box className={classes.registerContent}>
              <Typography variant="h1">Already have an account?</Typography>
              <Typography
                variant="h1"
                className={classes.signup}
                onClick={() => history.push('signin')}
              >
                SignIn
              </Typography>
            </Box>
          </Form>
        )}
      </Formik>
    </AuthPaper>
  );
};

export default SignUp;
