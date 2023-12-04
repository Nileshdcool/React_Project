import React from 'react';
import ClearIcon from '@material-ui/icons/Clear';
import * as PropTypes from "prop-types";

import {
  AlertWrapper,
  CloseBlock,
  ContentBlock,
  CustomErrorText,
  Description,
  ErrorBlock,
  LeftBorder,
  StyledErrorIcon,
} from './styledComponents';

import CustomIconButton from '../../../../../components/Buttons/CustomIconButton';

export const AlertBox = React.memo(({ closeError, isSameFile }) => (
  <AlertWrapper>
    <LeftBorder />
    <ContentBlock>
      <ErrorBlock>
        <StyledErrorIcon />
        <CustomErrorText>
          {isSameFile
            ? 'File Already Exists'
            : 'Invalid file format'}
        </CustomErrorText>
      </ErrorBlock>
      <Description>
        {isSameFile
          ? 'Files with the same name cannot be added.'
          : 'Please select a file in a pdf format.'}
      </Description>
    </ContentBlock>
    <CloseBlock>
      <CustomIconButton
        color="closeIconErrorAlert"
        disableRipple
        icon={<ClearIcon />}
        iconFontSize="12px"
        onClick={closeError}
      />
    </CloseBlock>
  </AlertWrapper>
));

AlertBox.propTypes = {
  closeError: PropTypes.func,
  isSameFile: PropTypes.bool
};
