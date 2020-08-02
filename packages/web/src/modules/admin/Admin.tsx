import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import RelayRenderer from '../RelayRender';
import RenderAdminPage from './component/RenderAdminPage';
import {AdminQuery} from './__generated__/AdminQuery.graphql';
import Backdrop from '@material-ui/core/Backdrop';
import BounceLoader from 'react-spinners/BounceLoader';
import {theme} from '../../Theme';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const Admin = () => {
  const classes = useStyles();

  return (
    <RelayRenderer<AdminQuery>
      query={query}
      loading={
        <Backdrop className={classes.backdrop} open={true}>
          <BounceLoader
            size={150}
            color={theme.palette.secondary.main}
            loading={true}
          />
        </Backdrop>
      }
      variables={{}}
      queryOpts={{fetchPolicy: 'network-only'}}
    >
      {(data) => <RenderAdminPage data={data} />}
    </RelayRenderer>
  );
};

const query = graphql`
  query AdminQuery {
    viewer {
      user {
        fullname
        contactNumber
        username
        active
        createdAt
        userPanics {
          latitude
          longitude
          createdAt
        }
      }
    }
  }
`;

export default Admin;
