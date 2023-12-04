import React from 'react';
import ClearIcon from '@material-ui/icons/Clear';
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
import CustomIconButton from "../../../../../components/Buttons/CustomIconButton";

export const AlertBox = React.memo(({ closeError }) => (
  <AlertWrapper>
    <LeftBorder />
    <ContentBlock>
      <ErrorBlock>
        <StyledErrorIcon />
        <CustomErrorText>
          Invalid file format
        </CustomErrorText>
      </ErrorBlock>
      <Description>
        Please select a file in a pdf format.
      </Description>
    </ContentBlock>
    <CloseBlock>
      <CustomIconButton
        color="closeIconErrorAlert"
        onClick={closeError}
        disableRipple
        icon={<ClearIcon />}
        iconFontSize="12px"
      />
    </CloseBlock>
  </AlertWrapper>
));
