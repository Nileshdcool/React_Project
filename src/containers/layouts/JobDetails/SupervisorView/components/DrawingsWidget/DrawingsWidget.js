import Typography from '@material-ui/core/Typography';
import ClearIcon from '@material-ui/icons/Clear';
import sortBy from 'lodash/sortBy';
import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { uploadLineJobDrawings } from '../../../../../../actions/jobDetails';
import CustomIconButton from '../../../../../../components/Buttons/CustomIconButton';
import NoteIcon from '../../../../../../img/iconNotes.svg';
import {
  AttachedFilesWrapper,
  ContentWrapper,
  DragIndicatorIcon,
  HandDragWrapper,
  LeftBlock,
  NoteWrapper,
  StyledTypography,
  SupervisorWidgetsWrapper,
  TextCutter,
} from '../styledComponents';

const DrawingsWidget = ({
  drawings,
  title,
  handleAddedEntities,
  updateLineJobStationDrawings,
  removeDrawing,
  modifiedFiles,
}) => {
  const [previewFiles, setPreviewFiles] = useState([]);
  const [isAnnotateModalOpen, setIsAnnotateModalOpen] = useState(false);
  const [modalSize, setModalSize] = useState({
    width: window.innerWidth * 0.9,
    height: window.innerHeight * 0.9,
  });
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [fileToOpen, setFileToOpen] = useState({});

  const onAnnotationModalOpen = (file) => {
    setFileToOpen(file);
    setModalSize({
      width: window.innerWidth * 0.9,
      height: window.innerHeight * 0.9,
    });
    setModalPosition({ x: 0, y: 0 });
    setIsAnnotateModalOpen(true);
  };

  const onAnnotationModalClose = () => {
    setIsAnnotateModalOpen(false);
  };

  const onResize = (event, { element, size, handle }) => {
    setModalSize({ width: size.width, height: size.height });
  };

  const onDragStop = (e, position) => {
    const { x, y } = position;
    setModalPosition({ x, y });
  };

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      previewFiles.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [previewFiles],
  );

  useEffect(() => {
    const previews = drawings
      ? drawings.map((item) => ({
          ...item,
          hasAnnotations: item.drawing
            ? item.drawing.hasAnnotations
            : item.hasAnnotations,
          fileUrl: `${item.fileUrl || item.drawing.fileUrl}`,
          fileName: item.name || item.fileName || item.drawing.fileName,
        }))
      : [];
    setPreviewFiles([...previews]);
  }, [drawings]);

  useEffect(() => {
    const modifiedFilesNames = modifiedFiles.map((item) => item.name);
    const unmodifiedFiles = drawings.filter(
      (item) =>
        !modifiedFilesNames.includes(
          item.name || item.fileName || item.drawing.fileName,
        ) && item.sortIndex,
    );
    const sortedModifiedFiles = modifiedFiles.filter(
      (item) =>
        modifiedFilesNames.includes(
          item.name || item.fileName || item.drawing.fileName,
        ) && !item.addedPosition,
    );
    const newFiles = drawings.filter(
      (item) =>
        !modifiedFilesNames.includes(
          item.name || item.fileName || item.drawing.fileName,
        ) && !item.sortIndex,
    );
    const newModifiedFiles = modifiedFiles.filter(
      (item) =>
        modifiedFilesNames.includes(
          item.name || item.fileName || item.drawing.fileName,
        ) && item.addedPosition,
    );
    const previews = drawings.length
      ? [
          ...sortBy([...unmodifiedFiles, ...sortedModifiedFiles], 'sortIndex'),
          ...sortBy([...newFiles, ...newModifiedFiles], 'addedPosition'),
        ].map((item, i) => ({
          ...item,
          sortIndex: i + 1,
          hasAnnotations: item.drawing
            ? item.drawing.hasAnnotations
            : item.hasAnnotations,
          fileName: item.name || item.fileName || item.drawing.fileName,
          fileUrl:
            item.fileUrl || (item.drawing && item.drawing.fileUrl)
              ? `${item.fileUrl || item.drawing.fileUrl}`
              : URL.createObjectURL(item.pdf),
        }))
      : [];

    setPreviewFiles([...previews]);
  }, [modifiedFiles, drawings]);

  const onDragEnd = (result) => {
    console.log('DRAWINGS TASKS WIDGET___', result);
    if (!result.destination) {
      return;
    }
    const { destination, source } = result;

    const draggedDrawings = [...drawings];
    const draggableElement = drawings[source.index];
    draggedDrawings.splice(source.index, 1);
    draggedDrawings.splice(destination.index, 0, draggableElement);
    const updatedNewArray = draggedDrawings.map((item, i) => ({
      ...item,
      sortIndex: i + 1,
    }));
    setPreviewFiles(updatedNewArray);
    updateLineJobStationDrawings(updatedNewArray);
    handleAddedEntities();
  };

  return (
    <SupervisorWidgetsWrapper>
      <StyledTypography variant='subtitle1'>{title}</StyledTypography>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='drawings_widget'>
          {(provided) => (
            <ContentWrapper
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <AttachedFilesWrapper>
                <ul>
                  {previewFiles.map((file, index) => (
                    <Draggable
                      draggableId={`${
                        file.name || file.fileName || file.drawing.fileName
                      }-${index}`}
                      index={index}
                    >
                      {(provided) => (
                        <li
                          id={`${
                            file.name || file.fileName || file.drawing.fileName
                          }-${index}`}
                          key={`${
                            file.name || file.fileName || file.drawing.fileName
                          }-${index}`}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                        >
                          <LeftBlock>
                            <HandDragWrapper {...provided.dragHandleProps}>
                              <DragIndicatorIcon />
                            </HandDragWrapper>

                            <Typography align='left' variant='body2'>
                              <TextCutter>
                                {file.name ||
                                  file.fileName ||
                                  file.drawing.fileName}
                              </TextCutter>
                            </Typography>
                          </LeftBlock>
                          <a
                            href={
                              file?.fileUrl ||
                              file?.drawing?.fileUrl ||
                              file.url
                            }
                            target='_blank'
                          >
                            <NoteWrapper>
                              <img alt='noteIcon' src={NoteIcon} />
                            </NoteWrapper>
                          </a>
                          <CustomIconButton
                            color='mainCardTitleColor'
                            onClick={() => removeDrawing(file)}
                            disableRipple
                            icon={<ClearIcon />}
                            iconFontSize='20px'
                          />
                          {provided.placeholder}
                        </li>
                      )}
                    </Draggable>
                  ))}
                </ul>
              </AttachedFilesWrapper>

              {provided.placeholder}
            </ContentWrapper>
          )}
        </Droppable>
      </DragDropContext>
    </SupervisorWidgetsWrapper>
  );
};

const mapStateToProps = (state) => ({
  modifiedFiles: state.jobDetails.modifiedFiles,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      uploadLineJobDrawings,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(DrawingsWidget);
