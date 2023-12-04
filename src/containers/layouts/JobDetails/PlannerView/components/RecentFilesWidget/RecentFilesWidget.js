import * as PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  updateSavedLineJobDocuments,
  updateSavedLineJobDrawings,
} from '../../../../../../actions/jobDetails';
import {
  checkNewVersion,
  checkSameFile,
  getFileData, moveRecentFile,
  openRecentFilesLoader,
  setIsNeedToAddAnnotation,
  updateRecentFilesDocument,
  updateRecentFilesDrawing,
} from '../../../../../../actions/recentFiles';
import RecentFilesModal from '../../../../../../components/ModalDialog/RecentFilesModal';
import FileImg from '../../../../../../img/file-alt.svg';
import { StyledTypography } from '../styledComponents';
import {
  AddIconWrapper,
  ListBody,
  ListItem,
  ListItemCell,
  RecentFilesFolderPathBlock,
  SideBarWrapper,
  StyledAddIcon,
} from './styledComponents';

const RecentFilesWidget = ({
  recentFilesFolderPath,
  recentFilesList,
  updateRecentFilesDrawing,
  updateRecentFilesDocument,
  getFileData,
  lineJobDetails,
  updateSavedLineJobDocuments,
  updateSavedLineJobDrawings,
  drawings,
  documents,
  recentDocuments,
  recentDrawings,
  checkSameFile,
  checkNewVersion,
  openRecentFilesLoader,
  recentFile,
  moveRecentFile,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addedFile, setAddedFile] = useState({});
  const [fileType, setFileType] = useState({ type: 'drawings' });

  const drawingsFileNames = drawings.map(item => item.fileName.split('.')[0]);
  const addedFileName = addedFile && addedFile.fileName && addedFile.fileName.slice(0, addedFile.fileName.lastIndexOf('r'));
  const filteredNames = drawingsFileNames.filter(item => item.includes(addedFileName)).sort();
  const previousVersionName = filteredNames[filteredNames.length - 1];
  const changeTaskTypeRadio = (e) => {
    setFileType({ ...fileType, type: e.target.value });
  };

  const setModalToInit = () => {
    setFileType({ type: 'drawings' });
  };

  const onOpenModal = async file => {
    setModalToInit();
    setIsModalOpen(!isModalOpen);
    openRecentFilesLoader(true);
    setAddedFile(file);

    await getFileData(lineJobDetails.id, file.fileUrl);
    setTimeout(() =>
      openRecentFilesLoader(false),
    3000);
  };

  const onAddFileClick = file => {
    setIsModalOpen(!isModalOpen);
    const updatedFile = {
      fileName: file.fileName,
      path: file.fileUrl,
      type: fileType.type,
      dstFileName: file.fileName
    };
    if (fileType.type === 'documents') {
      const isSameName = !!documents.filter(item => item.fileName === updatedFile.fileName).length;
      if (!isSameName) {
        updateSavedLineJobDocuments([...documents.filter(item => item.fileName !== updatedFile.fileName), updatedFile]);
        updateRecentFilesDocument([updatedFile, ...recentDocuments]);
      } else {
        updateSavedLineJobDocuments(documents);
        updateRecentFilesDocument(recentDocuments);
      }
      checkSameFile(isSameName, 'documents');
    } else {
      const isSameName = !!drawings.filter(item => item.fileName === updatedFile.fileName).length;
      if (!isSameName) {
        updateSavedLineJobDrawings([...drawings.filter(item => item.fileName !== updatedFile.fileName), updatedFile]);
        updateRecentFilesDrawing([updatedFile, ...recentDrawings]);
      } else {
        updateSavedLineJobDrawings(drawings);
        updateRecentFilesDrawing(recentDrawings);
      }
      checkSameFile(isSameName, 'drawings');
    }
  };

  return (
    <SideBarWrapper>
      <StyledTypography variant="subtitle1">RECENT FILE CHANGES</StyledTypography>
      {recentFilesFolderPath && (
        <RecentFilesFolderPathBlock>
          Files that have recently been changed on
          <br />
          {recentFilesFolderPath}
        </RecentFilesFolderPathBlock>
      )}
      <ListBody>
        {recentFilesList.map((item, i) => (
          <ListItem key={`id-${i}`}>
            <img alt="FileImg" src={FileImg} />
            <ListItemCell>{item.fileName}</ListItemCell>
            <AddIconWrapper>
              <StyledAddIcon onClick={() => onOpenModal(item)} />
            </AddIconWrapper>
          </ListItem>
        ))}
      </ListBody>
      <RecentFilesModal
        addedFile={addedFile}
        buttonsNames={{
          confirmButtonText: 'ADD',
          cancelButtonText: 'CANCEL',
        }}
        changeTaskTypeRadio={changeTaskTypeRadio}
        fileType={fileType}
        importedFile={drawings.find(item => item.fileName === `${previousVersionName}.pdf`)}
        onClickCancel={() => setIsModalOpen(false)}
        onClickConfirm={() => onAddFileClick(addedFile)}
        open={isModalOpen}
      />
    </SideBarWrapper>
  );
};

const mapStateToProps = ({
  recentFiles: {
    recentFilesFolderPath,
    isRecentFilesLoaderOpen,
    recentFile,
  },
}) => ({
  recentFilesFolderPath,
  isRecentFilesLoaderOpen,
  recentFile,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  updateRecentFilesDrawing,
  updateRecentFilesDocument,
  getFileData,
  updateSavedLineJobDocuments,
  updateSavedLineJobDrawings,
  checkSameFile,
  checkNewVersion,
  openRecentFilesLoader,
  setIsNeedToAddAnnotation,
  moveRecentFile,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RecentFilesWidget);
