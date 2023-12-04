import React from "react";
import { connect } from "react-redux";
import * as PropTypes from "prop-types";
import FormGroup from "@material-ui/core/FormGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import {
  CheckboxGroup,
  RecentFilesButtonGroup,
  RecentFilesModalSubtitle,
  RecentFilesModalText,
  RecentFilesRedioGroup,
  StyledDialog
} from "./styledComponents";
import ContainedButton from "../Buttons/ContainedButton";

const RecentFilesModal = ({
  addedFile,
  buttonsNames,
  changeTaskTypeRadio,
  fileType,
  open,
  onClose,
  onClickConfirm,
  onClickCancel,
  informationDialog
}) => (
  <StyledDialog
    onClose={onClose}
    open={open}
  >
    <RecentFilesModalText>ADD FILE</RecentFilesModalText>
    <RecentFilesModalSubtitle variant="h4">
      {addedFile.fileName}
    </RecentFilesModalSubtitle>
    <CheckboxGroup>
      <RecentFilesModalSubtitle variant="h4">
        Please select the block you want to add this file to:
      </RecentFilesModalSubtitle>
      <RecentFilesRedioGroup
        aria-label="tasksType"
        defaultValue="top"
        onChange={changeTaskTypeRadio}
        row
        value={fileType.type}
      >
        <FormControlLabel
          control={<Radio size="small" />}
          label="DRAWINGS"
          labelPlacement="start"
          value="drawings"
        />
        <FormControlLabel
          control={<Radio size="small" />}
          label="DOCUMENTS"
          labelPlacement="start"
          value="documents"
        />
      </RecentFilesRedioGroup>
    </CheckboxGroup>
    <RecentFilesButtonGroup>
      {!informationDialog && (
        <ContainedButton
          color="secondary"
          colorType="white"
          onClick={onClickCancel}
          text={buttonsNames.cancelButtonText}
          variant="contained"
        />
      )}
      <ContainedButton
        color="primary"
        colorType="red"
        onClick={onClickConfirm}
        text={buttonsNames.confirmButtonText}
        variant="contained"
      />
    </RecentFilesButtonGroup>
  </StyledDialog>
);


RecentFilesModal.propTypes = {
  addedFile: PropTypes.shape({
    name: PropTypes.string,
  }),
  buttonsNames: PropTypes.shape({
    confirmButtonText: PropTypes.string,
    cancelButtonText: PropTypes.string,
  }),
  changeTaskTypeRadio: PropTypes.func,
  fileType: {
    type: PropTypes.string,
  },
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onClickConfirm: PropTypes.func,
  onClickCancel: PropTypes.func,
  informationDialog: PropTypes.bool,
};

export default React.memo(RecentFilesModal);
