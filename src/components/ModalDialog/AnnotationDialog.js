import React, { PureComponent } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import sortBy from 'lodash/sortBy';

import ContainedButton from '../Buttons/ContainedButton';
import CustomIconButton from '../../components/Buttons/CustomIconButton';
import DropDownSelect from '../../components/DropDownSelect';
import ModalDialog from './index';
import AnnotationsDropDownSelect from "../DropDownSelect/AnnotationsDropDownSelect";

import {
  HANDLE_UNSAVED_ANNOTATION_TEXT,
  REMOVE_ANNOTATION_HEADER,
  REMOVE_ANNOTATION_TEXT,
  UNSAVED_MODAL_HEADER
} from '../../constants/index';

import {
  AnnotationButtonWrapper,
  AnnotationDialogContent,
  AnnotationDialogTitle,
  ModalButtonWrapper,
  StyledAnnotationDialog,
  StyledTextArea
} from './styledComponents';
class AnnotationDialog extends PureComponent {
  state = {
    isModalOpen: false,
    isUnsavedModalOpen: false,
  };

  toggleModalView = () => {
    const { isModalOpen } = this.state;
    this.setState({ isModalOpen: !isModalOpen });
  }

  toggleUnsavedModalView = () => {
    const { isUnsavedModalOpen } = this.state;
    const { onClose, savedChangesInAnnotations } = this.props;
    if (!savedChangesInAnnotations) {
      this.setState({ isUnsavedModalOpen: !isUnsavedModalOpen });
    } else {
      onClose();
    }
  }

  onSave = () => {
    const { saveAnnotation, onClose } = this.props;
    saveAnnotation();
    this.setState({ isUnsavedModalOpen: false });
    onClose();
  }

  onRemove = () => {
    const { removeAnnotation, onClose } = this.props;
    const { isModalOpen } = this.state;
    removeAnnotation();
    this.setState({ isModalOpen: !isModalOpen });
    onClose();
  }

  onDiscard = () => {
    const { isUnsavedModalOpen } = this.state;
    const { onClose, savedChangesInAnnotations, onDiscardAnnotation, selectedValue } = this.props;
    if (!savedChangesInAnnotations) {
      this.setState({ isUnsavedModalOpen: !isUnsavedModalOpen });
      onDiscardAnnotation(selectedValue);
      onClose();
    } else {
      onClose();
    }
  }

  render() {
    const {
      open,
      buttonsNames,
      bodyItems,
      bomModalId,
      onChangeItem,
      selectedValue,
      annotationText,
      onChangeAnnotation,
      isDisabled,
      isSupervisorTable,
      isOperatorViewBoms,
    } = this.props;
    const { isModalOpen, isUnsavedModalOpen } = this.state;
    const items = [
      { text: 'Choose item for annotation', value: '' },
      ...sortBy(bodyItems
        .filter(bom => isSupervisorTable ? bom.isCheckedForStation : !bom.isDeleted)
        .filter(bom => bom.parentId === bomModalId), 'number')
        .map((item, i) => ({
          text: item.number,
          value: item.id,
          annotation: item.annotation || '',
          bomId: item.id,
          id: item.id,
        }))];
    //TODO change number to Id for BOM here
    const openedBOM = bodyItems.find(bom => selectedValue === bom.id);
    const getBomBySelectedId = items.find(item => item.id === selectedValue);
    return (
      <StyledAnnotationDialog open={open}>
        <AnnotationDialogTitle disableTypography>
          <AnnotationButtonWrapper>
            <CustomIconButton
              disableRipple
              onClick={this.toggleUnsavedModalView}
              icon={<CloseIcon color="#9d9d9d" />}
              iconFontSize="26px"
            />
          </AnnotationButtonWrapper>
        </AnnotationDialogTitle>
        <AnnotationDialogContent>
          <AnnotationsDropDownSelect
            value={getBomBySelectedId ? getBomBySelectedId.text : ''}
            selectedBomId={selectedValue}
            width={300}
            onChange={onChangeItem}
            displayEmpty
            variant="outlined"
            items={items}
            listStyle={{
              width: '300px',
              'max-height': '200px',
              'overflow-y': 'auto',
            }}
            disabled={isDisabled || isOperatorViewBoms}
          />
          <StyledTextArea
            disabled={isOperatorViewBoms}
            multiline
            value={annotationText || ''}
            variant="outlined"
            rowsMax={100}
            onChange={(e) => onChangeAnnotation(e, selectedValue)}
            placeholder="Enter Annotation"
          />
        </AnnotationDialogContent>
        {!isOperatorViewBoms && <ModalButtonWrapper isAnnotation={openedBOM && openedBOM.annotation}>
          {openedBOM && openedBOM.annotation
            ? <ContainedButton
              variant="contained"
              color="secondary"
              colorType="white"
              onClick={this.toggleModalView}
              text={buttonsNames.deleteButtonText}
            />
            : null}
          <ContainedButton
            variant="contained"
            color="primary"
            colorType="classic"
            onClick={this.onSave}
            text={buttonsNames.confirmButtonText}
          />
        </ModalButtonWrapper>}
        <ModalDialog
          open={isModalOpen}
          buttonsNames={{
            confirmButtonText: 'REMOVE',
            cancelButtonText: 'CANCEL',
          }}
          onClose={this.toggleModalView}
          headerText={REMOVE_ANNOTATION_HEADER}
          bodyText={REMOVE_ANNOTATION_TEXT}
          onClickCancel={this.toggleModalView}
          onClickConfirm={this.onRemove}
        />
        <ModalDialog
          open={isUnsavedModalOpen && !isOperatorViewBoms}
          buttonsNames={{
            confirmButtonText: 'SAVE',
            cancelButtonText: 'DISCARD',
          }}
          onClose={this.toggleUnsavedModalView}
          headerText={UNSAVED_MODAL_HEADER}
          bodyText={HANDLE_UNSAVED_ANNOTATION_TEXT}
          onClickCancel={this.onDiscard}
          onClickConfirm={this.onSave}
        />
      </StyledAnnotationDialog>
    );
  }
}

export default AnnotationDialog;
