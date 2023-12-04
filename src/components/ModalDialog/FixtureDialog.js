import {
  FixtureButtonWrapper,
  FixtureContent,
  FixtureDialogContent,
  FixtureDialogTitle,
  FixtureTitle,
  StyledFixtureDialog,
} from './styledComponents';

import CloseIcon from '@material-ui/icons/Close';
import CustomIconButton from '../Buttons/CustomIconButton';
import React from 'react';

const FixtureDialog = ({ isOpened, onClose, text }) => (
  <StyledFixtureDialog open={isOpened}>
    <FixtureDialogTitle disableTypography>
      <FixtureButtonWrapper>
        <CustomIconButton
          disableRipple
          onClick={onClose}
          icon={<CloseIcon color="#9d9d9d" />}
          iconFontSize="26px"
        />
      </FixtureButtonWrapper>
    </FixtureDialogTitle>
    <FixtureDialogContent>
      <FixtureTitle>FIXTURE:</FixtureTitle>
      <FixtureContent>{text}</FixtureContent>
    </FixtureDialogContent>
  </StyledFixtureDialog>
);

export default React.memo(FixtureDialog);
