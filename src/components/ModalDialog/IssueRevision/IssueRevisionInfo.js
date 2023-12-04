import {
  ButtonWrapper,
  ConfirmationDialogContent,
  ConfirmationDialogTitle,
  ConfirmationTitleTextBlock,
  SubtitleConfirmation,
} from './styledComponents';

import { BUTTONS_TEXT } from '../../../constants';
import ContainedButton from '../../../components/Buttons/ContainedButton';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import { SignalsWarningIcon } from '../../../components/SvgIcons/svgIcons';
import { StyledDialog } from '../styledComponents';
import Typography from '@material-ui/core/Typography';

const IssueRevisionInfo = ({
  open,
  modalNotification,
  workOrder,
  onClickConfirm,
  isStationActionsNotification,
  isDisableSubtitle,
}) => {
  return (
    <StyledDialog
      open={open}
      PaperProps={{ id: 'draggable-dialog' }}
      PaperComponent={Paper}
      aria-labelledby='draggable-dialog-title'
      id='draggable-dialog'
    >
      <ConfirmationDialogTitle disableTypography>
        <ConfirmationTitleTextBlock>
          <SignalsWarningIcon color='ORANGE' />
          <Typography variant='h2'>REVISION</Typography>
        </ConfirmationTitleTextBlock>
      </ConfirmationDialogTitle>
      {!isDisableSubtitle && (
        <SubtitleConfirmation variant='h4'>
          A revision has been received for WO# {workOrder}
        </SubtitleConfirmation>
      )}
      <ConfirmationDialogContent disableTypography>
        <SubtitleConfirmation isMessage variant='h4'>
          {modalNotification &&
          (!modalNotification.length || isStationActionsNotification)
            ? `${modalNotification.message}`
            : modalNotification
                .filter((item) => !item.viewed)
                .map((item) => <p>{item.message}</p>)}
        </SubtitleConfirmation>
      </ConfirmationDialogContent>
      <SubtitleConfirmation variant='h4'>
        Please tap the Continue button below to acknowledge.
      </SubtitleConfirmation>
      <ButtonWrapper>
        <ContainedButton
          variant='contained'
          color='primary'
          colorType='classic'
          onClick={onClickConfirm}
          text={BUTTONS_TEXT.continue}
        />
      </ButtonWrapper>
    </StyledDialog>
  );
};

export default React.memo(IssueRevisionInfo); // ___
