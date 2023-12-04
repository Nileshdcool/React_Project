import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import { LoadingDialogContent, LoadingDialogText } from './styledComponents';

const Loader = ({ open }) => (
  <Dialog open={open}>
    <LoadingDialogContent>
      <CircularProgress size={22} thickness={6} />
      <LoadingDialogText>updating...</LoadingDialogText>
    </LoadingDialogContent>
  </Dialog>
);

Loader.propTypes = {
  open: PropTypes.bool,
  message: PropTypes.string,
};

export default React.memo(Loader);
