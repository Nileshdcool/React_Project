import Paper from '@material-ui/core/Paper';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import {
  ButtonWrapper,
  ConfirmationDialogContent,
  ConfirmationDialogTitle,
  StyledDialog,
} from './styledComponents';
import { BUTTONS_TEXT, OPERATOR_SIGNAL_BLOCKS_HEADER_COLOR } from '../../../../../../constants';
import ContainedButton from '../../../../../../components/Buttons/ContainedButton';
import { SignalsWarningIcon } from '../../../../../../components/SvgIcons/svgIcons';

const SignalsModal = ({
  open,
  signalModalData,
  onClickConfirm,
}) => {
  const chooseModalText = (signalModalData) => {
    const {
      lineName,
      signalType,
      stationName,
      urgency,
    } = signalModalData;

    switch (signalType) {
      case 'Materials Needed':
        return {
          __html:
            `<span>${stationName}</span> needs the materials <span>${urgency.toLowerCase()}</span>.
             </br>Signal for the <span>${lineName}</span>`,
        };
      case 'Equipment Issue':
        return {
          __html:
            `<span>${stationName}</span> needs assistance <span>${urgency.toLowerCase()}</span> for an equipment issue.
             </br>Signal for the <span>${lineName}</span>`,
        };
      case 'Task Assistance':
        return {
          __html:
            `<span>${stationName}</span> needs task assistance <span>${urgency.toLowerCase()}</span>.
             </br>Signal for the <span>${lineName}</span>`,
        };
      default: return '';
    }
  };

  return (
    <StyledDialog
      open={open}
      PaperProps={{ id: 'draggable-dialog' }}
      PaperComponent={Paper}
      aria-labelledby="draggable-dialog-title"
      id="draggable-dialog"
    >
      <ConfirmationDialogTitle disableTypography>
        {!!signalModalData && <SignalsWarningIcon
          color={OPERATOR_SIGNAL_BLOCKS_HEADER_COLOR[signalModalData.urgency.toUpperCase()]}
        />}
        <Typography variant="h2">{!!signalModalData && signalModalData.signalType}</Typography>
      </ConfirmationDialogTitle>
      <ConfirmationDialogContent disableTypography>
        {!!signalModalData && <Typography
          variant="subtitle1"
          dangerouslySetInnerHTML={chooseModalText(signalModalData)}
        />}
      </ConfirmationDialogContent>
      <ButtonWrapper>
        <ContainedButton
          variant="contained"
          color="primary"
          colorType="classic"
          onClick={() => onClickConfirm()}
          text={BUTTONS_TEXT.confirm}
        />
      </ButtonWrapper>
    </StyledDialog>
  );
};

export default SignalsModal;
