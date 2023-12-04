import React from 'react';
import * as PropTypes from 'prop-types';
import DialogContentText from '@material-ui/core/DialogContentText';
import Draggable from 'react-draggable';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import {
  ButtonWrapper,
  ConfirmationDialogContent,
  ConfirmationDialogTitle,
  StyledDialog,
  StyledTextArea,
  AdditionalDataPanel, StyledRadioGroup, StyledTypographyDescription, SecondDataRow,
} from '../styledComponents';
import ContainedButton from '../../../../../../../components/Buttons/ContainedButton';
import InputWithLabel from '../InputWithLabel/InputWithLabel';
import EndAdornmentButtons from '../EndAdornmentButtons/EndAdornmentButtons';

const checkIsCreateButtonDisable = (taskAdditionalData) => !taskAdditionalData.text || taskAdditionalData.text === ''
    || !taskAdditionalData.estimated || taskAdditionalData.estimated === '';

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

const CreateTaskModalDialog = ({
  open,
  onClose,
  headerText,
  buttonsNames,
  onClickConfirm,
  onClickCancel,
  isDraggable,
  onChangeTaskDescription,
  onDurationChange,
  onAverageChange,
  changeTaskTypeRadio,
  onFixtureChange,
  isEditTaskModalOpen,
  taskAdditionalData,
  onIncrement,
  onDecrement,
}) => (
  <StyledDialog
    open={open}
    onClose={onClose}
    PaperProps={{ id: 'draggable-dialog' }}
    PaperComponent={isDraggable ? PaperComponent : Paper}
    aria-labelledby="draggable-dialog-title"
    id="draggable-dialog"
  >
    <ConfirmationDialogTitle>
      {headerText}
    </ConfirmationDialogTitle>
    <ConfirmationDialogContent>
      <DialogContentText>
        <StyledTypographyDescription variant="body2">TASK DESCRIPTION</StyledTypographyDescription>
        <StyledTextArea
          multiline
          autoFocus
          variant="outlined"
          rowsMax={200}
          onChange={onChangeTaskDescription}
          placeholder="Enter description..."
          value={taskAdditionalData.text}
        />
        <AdditionalDataPanel>
          <InputWithLabel
            label="DURATION"
            id="task-duration"
            htmlFor="task-duration"
            isMandatory
            onChange={onDurationChange}
            placeholder=""
            endAdornment={(
              <InputAdornment>
                <EndAdornmentButtons
                  onIncrement={() => onIncrement('estimated')}
                  onDecrement={() => onDecrement('estimated')}
                />
              </InputAdornment>
            )}
            value={taskAdditionalData.estimated || ''}
          />
          <StyledRadioGroup
            row
            aria-label="tasksType"
            onChange={changeTaskTypeRadio}
            defaultValue="top"
            value={taskAdditionalData.taskType}
          >
            <FormControlLabel
              value="operation"
              control={<Radio size="small" />}
              label="OPERATION"
              labelPlacement="start"
            />
            <FormControlLabel
              value="inspection"
              control={<Radio size="small" />}
              label="INSPECTION"
              labelPlacement="start"
            />
          </StyledRadioGroup>
          <SecondDataRow>
            <InputWithLabel
              label="HISTORICAL AVERAGE"
              id="task-average"
              className="task-average-input"
              htmlFor="task-average"
              onChange={onAverageChange}
              placeholder=""
              value={taskAdditionalData.historical || ''}
              endAdornment={(
                <InputAdornment>
                  <EndAdornmentButtons
                    onIncrement={() => onIncrement('historical')}
                    onDecrement={() => onDecrement('historical')}
                  />
                </InputAdornment>
              )}
            />
            <InputWithLabel
              label="FIXTURE"
              id="task-fixture"
              htmlFor="task-fixture"
              onChange={onFixtureChange}
              placeholder=""
              value={taskAdditionalData.fixture}
            />
          </SecondDataRow>
        </AdditionalDataPanel>

      </DialogContentText>
    </ConfirmationDialogContent>
    <ButtonWrapper>
      <ContainedButton
        variant="contained"
        color={isEditTaskModalOpen ? 'secondary' : 'primary'}
        colorType={isEditTaskModalOpen ? 'white' : 'classic'}
        onClick={onClickCancel}
        text={buttonsNames.cancelButtonText}
      />
      <ContainedButton
        variant="contained"
        color="primary"
        colorType="classic"
        disabled={checkIsCreateButtonDisable(taskAdditionalData)}
        onClick={e => onClickConfirm(e)}
        text={buttonsNames.confirmButtonText}
      />
    </ButtonWrapper>
  </StyledDialog>
);

CreateTaskModalDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  isDraggable: PropTypes.bool,
  headerText: PropTypes.string,
  onClickConfirm: PropTypes.func,
  onClickCancel: PropTypes.func,
  onChangeTaskDescription: PropTypes.func,
  onDurationChange: PropTypes.func,
  onAverageChange: PropTypes.func,
  changeTaskTypeRadio: PropTypes.func,
  buttonsNames: PropTypes.instanceOf(Object).isRequired,
  taskAdditionalData: PropTypes.instanceOf(Object),
};

export default CreateTaskModalDialog;
