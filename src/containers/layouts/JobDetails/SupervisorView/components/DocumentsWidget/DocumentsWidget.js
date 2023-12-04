import Typography from '@material-ui/core/Typography';
import ClearIcon from '@material-ui/icons/Clear';
import * as PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

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

const DocumentsWidget = ({
  documents,
  title,
  removeDocument,
  updateLineJobStationDocuments,
  handleAddedEntities,
}) => {
  const [widgetDocuments, changeWidgetDocs] = useState([]);
  useEffect(() => {
    if (documents) {
      changeWidgetDocs(
        documents.map((item) => ({
          ...item,
          fileUrl: `${item.fileUrl}`,
        })),
      );
    }
  }, [documents]);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const { destination, source } = result;

    const draggedDocuments = [...documents];
    const draggableElement = documents[source.index];
    draggedDocuments.splice(source.index, 1);
    draggedDocuments.splice(destination.index, 0, draggableElement);
    const updatedNewArray = draggedDocuments.map((item, i) => ({
      ...item,
      sortIndex: i + 1,
    }));
    changeWidgetDocs(updatedNewArray);
    updateLineJobStationDocuments(updatedNewArray);
    handleAddedEntities();
  };

  const onFileOpen = (url) => {
    window.open(`file://${url}`, '_blank');
  };

  return (
    <SupervisorWidgetsWrapper>
      <StyledTypography variant='subtitle1'>{title}</StyledTypography>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='document_widget'>
          {(provided) => (
            <ContentWrapper
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <AttachedFilesWrapper>
                <ul>
                  {widgetDocuments &&
                    widgetDocuments.map((file, index) => (
                      <Draggable
                        draggableId={`${file.fileName}-${index}`}
                        index={index}
                      >
                        {(provided) => (
                          <li
                            key={`${file.fileName}-${index}`}
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                          >
                            <LeftBlock>
                              <HandDragWrapper {...provided.dragHandleProps}>
                                <DragIndicatorIcon />
                              </HandDragWrapper>
                              <Typography variant='body2'>
                                <TextCutter>{file.fileName}</TextCutter>
                              </Typography>
                            </LeftBlock>
                            <a
                              href={
                                console.log('file DOCS', { file }) ||
                                file?.fileUrl ||
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
                              onClick={() => removeDocument(file)}
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
            </ContentWrapper>
          )}
        </Droppable>
      </DragDropContext>
    </SupervisorWidgetsWrapper>
  );
};

DocumentsWidget.propTypes = {
  title: PropTypes.string,
  documents: PropTypes.instanceOf(Array),
  removeDocument: PropTypes.func,
};

export default DocumentsWidget;
