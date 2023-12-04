import Grow from '@material-ui/core/Grow';
import Typography from '@material-ui/core/Typography';
import ClearIcon from '@material-ui/icons/Clear';
import isEqual from 'lodash/isEqual';
import * as PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { lineJobStationFilesPreUpload, lineJobStationSaveFile } from '../../../../../../actions/drawings';
import {
  handleUnsavedChangesInDrawings,
  updateSavedLineJobDrawings,
  uploadLineJobDrawings,
} from '../../../../../../actions/jobDetails';
import { checkSameFile } from '../../../../../../actions/recentFiles';
import CustomIconButton from '../../../../../../components/Buttons/CustomIconButton';
import IconSvg from '../../../../../../components/Icon';
import ModalDialog from '../../../../../../components/ModalDialog';
import { DropInIcon } from '../../../../../../components/SvgIcons/svgIcons';
import {
  DRAWINGS_MODAL_HEADER,
  DRAWINGS_MODAL_TEXT,
} from '../../../../../../constants';
import NoteIcon from '../../../../../../img/iconNotes.svg';
import { sortByName } from '../../../../../../utils/sorting';
import { TextCutter } from '../../../../ListLayout/styledComponents';
import { AlertBox } from '../AlertComponent';
import {
  AttachedFilesWrapper,
  ContentWrapper,
  DragIndicatorIcon,
  LeftBlock, NoteWrapper,
  StyledDropZone,
  StyledPaper,
  StyledTypography,
  StyledTypographySubtitle,
  WidgetsWrapper,
} from '../styledComponents';
import Loader from "../../../../../../components/Loader/Loader";

const DrawingsWidget = ({
  checkSameFile,
  drawings,
  handleUnsavedChangesInDrawings,
  initDrawings,
  isSameFileDrawings,
  savedChangesInDrawings,
  title,
  modifiedFiles,
  widgetDrawings,
  updateSavedLineJobDrawings,
  uploadedDrawings,
  uploadLineJobDrawings,
  lineJobStationFilesPreUpload,
  jobId,
}) => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    multiple: true,
    onDrop: (acceptedFiles, rejectedFiles) => onDropHandle(acceptedFiles, rejectedFiles),
  });
  console.log({
    isDragActive,
    isDragAccept,
    isDragReject,
  });
  const [files, setFiles] = useState([]);
  const [previewFiles, setPreviewFiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileToDelete, setFileToDelete] = useState([]);
  const [isErrorFileFormatAlert, setIsErrorFileFormatAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  const onDropHandle = async (acceptedFiles, rejectedFiles) => {
    setIsLoading(true);
    const uploadedFiles = files || [];
    const previewFilesNames = previewFiles.map(item => item.name);
    const uploadedFilesWithoutDublicates = acceptedFiles.filter(item => !previewFilesNames.includes(item.name));
    const formData = new FormData();
    for (let i = 0; i < uploadedFilesWithoutDublicates.length; i++) {
      formData.append(
        'NewFiles', uploadedFilesWithoutDublicates[i], uploadedFilesWithoutDublicates[i].name,
      );
    }
    const jsonData = { id: jobId };
    formData.append('JsonData', JSON.stringify(jsonData));
    const body = formData;
    await lineJobStationFilesPreUpload(body).then(response => {
      setIsErrorFileFormatAlert(false);
      const preUploadedFiles = Object.values(response.data);
      const updatedPreUploadedFiles = preUploadedFiles.map(item => {
        const fileId = item.url.substring(
          item.url.lastIndexOf('\\') + 1,
          item.url.lastIndexOf('.'),
        );
        const dstFileName = item.name;
        return {
          ...item, fileId, dstFileName, type: 'drawings',
        };
      });
      setFiles([...uploadedFiles, ...updatedPreUploadedFiles]);
      uploadLineJobDrawings([...uploadedFiles, ...updatedPreUploadedFiles]);
      const previewFile = updatedPreUploadedFiles.map(file => ({
        // url: file.url,
        name: file.name,
      }));
      setPreviewFiles([...previewFiles, ...previewFile]);
    });
    if (rejectedFiles.length > 0) {
      setIsErrorFileFormatAlert(true);
    }

    setIsLoading(false);
  };

  const closeError = () => {
    setIsErrorFileFormatAlert(false);
    checkSameFile(false, 'drawings');
  };

  const onModalOpen = (file) => {
    setIsModalOpen(true);
    setFileToDelete(file.name);
  };

  const cancelAction = () => {
    setIsModalOpen(false);
  };

  const removeItem = () => {
    const updatedFilesList = files && files.filter(file => file.name !== fileToDelete);
    const fileIndexInSaved = drawings.map(item => item.fileName).indexOf(fileToDelete);
    const updatedPreviewFiles = previewFiles.filter(file => file.name !== fileToDelete);

    uploadLineJobDrawings(updatedFilesList);
    if (fileIndexInSaved !== -1) {
      drawings.splice(fileIndexInSaved, 1);
      updateSavedLineJobDrawings(drawings);
    }

    setPreviewFiles(updatedPreviewFiles);
    setIsModalOpen(false);
  };

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    previewFiles.forEach(file => URL.revokeObjectURL(file.preview));
  }, [previewFiles]);

  useEffect(() => {
    const previews = drawings ? drawings
      .map(item => ({
        id: item.id,
        url: item.fileUrl,
        name: item.fileName,
        hasAnnotations: item.hasAnnotations,
      })) : [];
    setPreviewFiles([...previews]);
  }, [drawings]);

  useEffect(() => {
    const modifiedFilesNames = modifiedFiles.map(item => item.name);
    const unmodifiedFiles = widgetDrawings.filter(item => !modifiedFilesNames.includes(item.fileName || item.name));

    const previews = widgetDrawings ? [...unmodifiedFiles, ...modifiedFiles]
      .map(item => ({
        id: item.id,
        url: item.fileUrl,
        name: item.fileName || item.name,
        hasAnnotations: item.hasAnnotations,
      })) : [];
    setPreviewFiles([...previews]);
  }, [widgetDrawings, modifiedFiles]);

  useEffect(() => {
    setFiles(uploadedDrawings);
  }, [uploadedDrawings]);

  useEffect(() => {
    const haveUnsave = isEqual(initDrawings, drawings) && uploadedDrawings.length === 0 && modifiedFiles.length === 0;
    if (savedChangesInDrawings !== haveUnsave) {
      handleUnsavedChangesInDrawings(haveUnsave);
    }
  }, [drawings, initDrawings, savedChangesInDrawings, uploadedDrawings, modifiedFiles, handleUnsavedChangesInDrawings]);

  const onFileOpen = (url) => {
    window.open(`file://${url}`, '_blank');
  };

  return (
    <WidgetsWrapper>
      <Loader open={isLoading} />
      <StyledTypography variant="subtitle1">{title}</StyledTypography>
      <ContentWrapper>
        {(isErrorFileFormatAlert || isSameFileDrawings) && (
          <Grow in={isErrorFileFormatAlert || isSameFileDrawings}>
            <StyledPaper elevation={0}>
              <AlertBox isSameFile={isSameFileDrawings} closeError={closeError} />
            </StyledPaper>
          </Grow>
        )}
        {!!previewFiles.length && (
          <AttachedFilesWrapper>
            <ul>
              {sortByName(previewFiles)
                .map((file, index) => (
                  <li key={`${file?.name}-${index}`}>
                    <LeftBlock>
                      <DragIndicatorIcon />
                      <Typography align="left" variant="body2">
                        <TextCutter>
                          {file?.name ? file?.name.split('.').slice(0, -1).join('.') : ''}
                        </TextCutter>
                      </Typography>
                    </LeftBlock>
                    {file.url
                    && (
                    <a href={file.url} target="_blank">
                      <NoteWrapper>
                        <img alt="noteIcon" src={NoteIcon} />
                      </NoteWrapper>
                    </a>
                    )}
                    <CustomIconButton
                      color="mainCardTitleColor"
                      onClick={() => onModalOpen(file)}
                      disableRipple
                      icon={<ClearIcon />}
                      iconFontSize="20px"
                    />
                  </li>
                ))}
            </ul>
          </AttachedFilesWrapper>
        )}
        <StyledDropZone
          onDrop={onDropHandle}
          {...getRootProps({
            className: 'dropzone', isDragActive, isDragAccept, isDragReject,
          })}
        >
          <input {...getInputProps()} />

          <IconSvg
            icon={<DropInIcon />}
            color="lightGrayColor"
            iconWidth="31px"
            iconHeight="31px"
          />
          <p>
            <span>Choose a file</span>
            {' '}
            or drag it here
          </p>
        </StyledDropZone>
      </ContentWrapper>
      <ModalDialog
        open={isModalOpen}
        buttonsNames={{
          confirmButtonText: 'REMOVE',
          cancelButtonText: 'CANCEL',
        }}
        onClose={cancelAction}
        headerText={DRAWINGS_MODAL_HEADER}
        bodyText={DRAWINGS_MODAL_TEXT}
        onClickCancel={cancelAction}
        onClickConfirm={removeItem}
      />
    </WidgetsWrapper>
  );
};

DrawingsWidget.propTypes = {
  checkSameFile: PropTypes.func,
  drawings: PropTypes.instanceOf(Array),
  handleUnsavedChangesInDrawings: PropTypes.func,
  initDrawings: PropTypes.instanceOf(Array),
  isSameFileDrawings: PropTypes.bool,
  savedChangesInDrawings: PropTypes.bool,
  title: PropTypes.string,
  uploadedDrawings: PropTypes.instanceOf(Array),
  uploadLineJobDrawings: PropTypes.func,
  updateSavedLineJobDrawings: PropTypes.func,
};

const mapStateToProps = ({ jobDetails, recentFiles: { isSameFileDrawings } }) => ({
  drawings: jobDetails.drawings,
  initDrawings: jobDetails.initData.drawings,
  isSameFileDrawings,
  modifiedFiles: jobDetails.modifiedFiles,
  savedChangesInDrawings: jobDetails.savedChangesInDrawings,
  uploadedDrawings: jobDetails.uploadedDrawings,
  widgetDrawings: jobDetails.widgetDrawings,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  checkSameFile,
  handleUnsavedChangesInDrawings,
  uploadLineJobDrawings,
  updateSavedLineJobDrawings,
  lineJobStationFilesPreUpload,
  lineJobStationSaveFile,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DrawingsWidget);
