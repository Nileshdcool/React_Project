import React from 'react';
import CheckIcon from '@material-ui/icons/Check';
import { IsCheckedIconWrapper } from './styledComponents';

export const IsCheckedItemIcon = React.memo(({ isHidden }) => (
  <IsCheckedIconWrapper isHidden={isHidden}>
    <CheckIcon />
  </IsCheckedIconWrapper>
));
