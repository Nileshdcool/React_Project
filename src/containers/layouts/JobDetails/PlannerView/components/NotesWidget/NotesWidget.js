import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import Fade from '@material-ui/core/Fade';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  AddIconWrapper,
  AddNotesPopUpFooter,
  AddNotesPopUpWrapper,
  AddNotesPopUpWrapperHeader,
  NotesContentWrapper,
  NotesFooter,
  NotesHeader,
  StyledAddIcon,
  StyledCloseIcon,
  StyledNotesTitle,
  StyledTextArea,
} from './styledComponents';
import {
  BUTTONS_TEXT,
  DELETE_NOTES_MODAL_HEADER,
  DELETE_NOTES_MODAL_TEXT,
  UNSAVED_NOTES_MODAL_HEADER,
  UNSAVED_NOTES_MODAL_TEXT,
} from '../../../../../../constants';
import { StyledTypography, WidgetsWrapper } from '../styledComponents';

import ContainedButton from '../../../../../../components/Buttons/ContainedButton';
import ModalDialog from '../../../../../../components/ModalDialog';
import { clearLineJobNotes, updateLineJobNotes } from '../../../../../../actions/jobDetails';
import { createStructuredSelector } from "reselect";
import { unsavedNotesSelector } from "../../../../../../selectors/jobDetailsWidgets";

const NotesWidget = ({
  title,
  updateLineJobNotes,
  clearLineJobNotes,
  savedNotes,
  handleUnsavedChangesInNotes,
  unsavedNotes
}) => {
  const [notes, setNotes] = useState('');
  const [inputedNotes, setInputedNotes] = useState('');
  const [isAddNotesPopUpOpen, setIsAddNotesPopUpOpen] = useState(false);
  const [isEditNotesPopUpOpen, setIsEditNotesPopUpOpen] = useState(false);
  const [isUnsavedNotesDialogOpen, setIsUnsavedNotesDialogOpen] = useState(false);
  const [isOpenDeleteNotesDialog, setIsOpenDeleteNotesDialog] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, [savedNotes]);

  useEffect(() => {
    if (!unsavedNotes.length && unsavedNotes !== notes && !savedNotes) {
      setNotes('')
    }
  }, [unsavedNotes]);

  const saveNotes = () => {
    if (isUnsavedNotesDialogOpen) {
      setIsUnsavedNotesDialogOpen(false);
    }
    if (savedNotes === inputedNotes) {
      handleUnsavedChangesInNotes(true);
    }
    setIsAddNotesPopUpOpen(false);
    setIsEditNotesPopUpOpen(false);
    setNotes(inputedNotes);
    updateLineJobNotes(inputedNotes);
    setInputedNotes('');
  };
  const addNotes = (action) => {
    setInputedNotes(notes);
    setModalPosition({ x: 0, y: 0 });
    if (action === 'edit') {
      setIsEditNotesPopUpOpen(true);
    } else {
      setIsAddNotesPopUpOpen(true);
    }
  };

  const onChangeNotes = (e) => {
    if (savedNotes !== e.target.value) {
      handleUnsavedChangesInNotes(false);
    }

    updateLineJobNotes(inputedNotes);
    setInputedNotes(e.target.value);
  };

  const closeAddEditNotesPopUp = async () => {
    if (notes === inputedNotes) {
      setIsAddNotesPopUpOpen(false);
      setIsEditNotesPopUpOpen(false);
      handleUnsavedChangesInNotes(true);
    } else {
      setIsUnsavedNotesDialogOpen(true);
    }
  };

  const deleteNotes = () => {
    setNotes('');
    setInputedNotes('');
    clearLineJobNotes();
    setIsAddNotesPopUpOpen(false);
    setIsEditNotesPopUpOpen(false);
    setIsOpenDeleteNotesDialog(false);
    if (savedNotes === '') {
      handleUnsavedChangesInNotes(true);
    } else {
      handleUnsavedChangesInNotes(false);
    }
  };

  const closeUnsavedModal = () => {
    setInputedNotes('');
    handleUnsavedChangesInNotes(true);
    setIsAddNotesPopUpOpen(false);
    setIsEditNotesPopUpOpen(false);
    setIsUnsavedNotesDialogOpen(false);
  };

  const onDragStop = (e, position) => {
    const { x, y } = position;
    setModalPosition({ x, y });
  };
  return (
    <WidgetsWrapper>
      <NotesHeader>
        <StyledTypography variant="subtitle1">{title}</StyledTypography>
        {
          notes.length === 0 && (
          <AddIconWrapper onClick={addNotes}>
            <StyledAddIcon />
          </AddIconWrapper>
        )}
      </NotesHeader>
      <NotesContentWrapper>
        {notes}
      </NotesContentWrapper>
      <NotesFooter>
        {notes.length > 0 && (
          <ContainedButton
            variant="contained"
            color="primary"
            colorType="classic"
            text={BUTTONS_TEXT.edit}
            onClick={() => addNotes('edit')}
          />
        )}
      </NotesFooter>

      <Draggable
        position={modalPosition}
        onStop={onDragStop}
        handle=".handle"
      >
        <Fade in={isAddNotesPopUpOpen || isEditNotesPopUpOpen}>
          <AddNotesPopUpWrapper>
            <AddNotesPopUpWrapperHeader className="handle">
              <StyledNotesTitle>Add notes</StyledNotesTitle>
              <StyledCloseIcon onClick={closeAddEditNotesPopUp} />
            </AddNotesPopUpWrapperHeader>
            <StyledTextArea
              multiline
              autoFocus
              value={inputedNotes}
              variant="outlined"
              rowsMax={200}
              onChange={onChangeNotes}
              placeholder="Enter notes..."
            />
            <AddNotesPopUpFooter>
              <ContainedButton
                variant="contained"
                color="secondary"
                colorType="white"
                ishidden={isAddNotesPopUpOpen || !isEditNotesPopUpOpen}
                text={BUTTONS_TEXT.delete}
                onClick={() => setIsOpenDeleteNotesDialog(true)}
              />
              <ContainedButton
                variant="contained"
                color="primary"
                colorType="classic"
                text={BUTTONS_TEXT.add}
                onClick={saveNotes}
              />
            </AddNotesPopUpFooter>
          </AddNotesPopUpWrapper>
        </Fade>
      </Draggable>
      <ModalDialog
        open={isOpenDeleteNotesDialog}
        buttonsNames={{
          confirmButtonText: 'REMOVE',
          cancelButtonText: 'CANCEL',
        }}
        onClose={() => setIsOpenDeleteNotesDialog(false)}
        headerText={DELETE_NOTES_MODAL_HEADER}
        bodyText={DELETE_NOTES_MODAL_TEXT}
        onClickCancel={() => setIsOpenDeleteNotesDialog(false)}
        onClickConfirm={deleteNotes}
      />
      <ModalDialog
        open={isUnsavedNotesDialogOpen}
        buttonsNames={{
          confirmButtonText: 'SAVE',
          cancelButtonText: 'DISCARD',
        }}
        headerText={UNSAVED_NOTES_MODAL_HEADER}
        bodyText={UNSAVED_NOTES_MODAL_TEXT}
        onClickCancel={closeUnsavedModal}
        onClickConfirm={saveNotes}
      />
    </WidgetsWrapper>
  );
};


const mapStateToProps = createStructuredSelector({
  unsavedNotes: unsavedNotesSelector(),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  updateLineJobNotes,
  clearLineJobNotes,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotesWidget);
