import Grow from '@material-ui/core/Grow';
import Typography from '@material-ui/core/Typography';
import ClearIcon from '@material-ui/icons/Clear';
import isEqual from 'lodash/isEqual';
import * as PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { lineJobStationFilesPreUpload } from '../../../../../../actions/drawings';
import {
  handleUnsavedChangesInDocuments,
  updateSavedLineJobDocuments,
  uploadLineJobDocuments,
} from '../../../../../../actions/jobDetails';
import { checkSameFile } from '../../../../../../actions/recentFiles';
import CustomIconButton from '../../../../../../components/Buttons/CustomIconButton';
import IconSvg from '../../../../../../components/Icon';
import ModalDialog from '../../../../../../components/ModalDialog';
import { DropInIcon } from '../../../../../../components/SvgIcons/svgIcons';
import { sortByName } from '../../../../../../utils/sorting';
import { AlertBox } from '../AlertComponent';
import NoteIcon from '../../../../../../../src/img/iconNotes.svg';
import {
  AttachedFilesWrapper,
  ContentWrapper,
  DragIndicatorIcon,
  LeftBlock,
  NoteWrapper,
  StyledDropZone,
  StyledPaper,
  StyledTypography,
  StyledTypographySubtitle,
  WidgetsWrapper
} from "../styledComponents";
import Loader from "../../../../../../components/Loader/Loader";

const deleteDocumentModalText = {
  headerText: 'DOCUMENT REMOVAL',
  bodyText: 'You have chosen to remove a document from this job.  If you wish to continue please click REMOVE, otherwise click CANCEL.',
};

const DocumentsWidget = ({
  checkSameFile,
  documents,
  handleUnsavedChangesInDocuments,
  isSameFileDocuments,
  initDocuments,
  savedChangesInDocuments,
  title,
  uploadedDocuments,
  uploadLineJobDocuments,
  updateSavedLineJobDocuments,
  lineJobStationFilesPreUpload,
  jobId
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
  const [isAnnotateModalOpen, setIsAnnotateModalOpen] = useState(false);
  const [modalSize, setModalSize] = useState({
    width: window.innerWidth * 0.9,
    height: window.innerHeight * 0.9,
  });
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [fileToOpen, setFileToOpen] = useState({});
  const [isLoading, setIsLoading] = useState(false)

  const onDropHandle = async (acceptedFiles, rejectedFiles) => {
    setIsLoading(true);
    const previewFilesNames = previewFiles.map(item => item.name);
    const uploadedFilesWithoutDublicates = acceptedFiles.filter(item => !previewFilesNames.includes(item.name));

    const uploadedFiles = files || [];

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
        return { ...item, fileId, dstFileName, type: 'documents' };
      });

      setFiles([...uploadedFiles, ...updatedPreUploadedFiles]);
      uploadLineJobDocuments([...uploadedFiles, ...updatedPreUploadedFiles]);
      const previewFile = updatedPreUploadedFiles.map(file => ({
        // url: file.url,
        name: file.name,
      }));
      setPreviewFiles([...previewFiles, ...previewFile]);
    });

    // uploadLineJobDocuments([...uploadedFiles, ...uploadedFilesWithoutDublicates]);
    //
    // setFiles([...uploadedFiles, ...uploadedFilesWithoutDublicates]);
    //
    // const previewFile = uploadedFilesWithoutDublicates.map(file => ({
    //   id: file.id,
    //   url: URL.createObjectURL(file),
    //   name: file.name,
    // }));
    // setPreviewFiles([...previewFiles, ...previewFile]);

    if (rejectedFiles.length > 0) {
      setIsErrorFileFormatAlert(true);
    }

    setIsLoading(false);
  };

  const closeError = () => {
    setIsErrorFileFormatAlert(false);
    checkSameFile(false, 'documents');
  };

  const onModalOpen = (file) => {
    setIsModalOpen(true);
    setFileToDelete(file.name);
  };

  const cancelAction = () => {
    setIsModalOpen(false);
  };

  const onAnnotationModalOpen = file => {
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

  const removeItem = () => {
    const updatedFilesList = files && files.filter(file => file.name !== fileToDelete);
    const fileIndexInSaved = documents.map(item => item.fileName).indexOf(fileToDelete);
    const updatedPreviewFiles = previewFiles.filter(file => file.name !== fileToDelete);
    uploadLineJobDocuments(updatedFilesList);
    if (fileIndexInSaved !== -1) {
      documents.splice(fileIndexInSaved, 1);
      updateSavedLineJobDocuments(documents);
    }

    setPreviewFiles(updatedPreviewFiles);
    setIsModalOpen(false);
  };

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    previewFiles.forEach(file => URL.revokeObjectURL(file.preview));
  }, [previewFiles]);

  useEffect(() => {
    const previews = documents ? documents.map(item => ({
      id: item.id,
      url: item.fileUrl,
      name: item.fileName,
    })) : [];
    setPreviewFiles([...previews]);
  }, [documents]);

  useEffect(() => {
    setFiles(uploadedDocuments);
  }, [uploadedDocuments]);

  useEffect(() => {
    const haveUnsave = isEqual(documents, initDocuments) && uploadedDocuments.length === 0;
    if (haveUnsave !== savedChangesInDocuments) {
      handleUnsavedChangesInDocuments(haveUnsave);
    }
  }, [documents, handleUnsavedChangesInDocuments, initDocuments, savedChangesInDocuments, uploadedDocuments]);

  const onFileOpen = (url) => {
    window.open(`file://${url}`, '_blank');
  }

  return (
    <WidgetsWrapper>
      <Loader open={isLoading} />
      <StyledTypography variant="subtitle1">{title}</StyledTypography>
      <ContentWrapper>
        {(isErrorFileFormatAlert || isSameFileDocuments) && (
          <Grow in={isErrorFileFormatAlert || isSameFileDocuments}>
            <StyledPaper elevation={0}>
              <AlertBox isSameFile={isSameFileDocuments} closeError={closeError} />
            </StyledPaper>
          </Grow>
        )}
        {!!previewFiles.length && (
          <AttachedFilesWrapper>
            <ul>
              {sortByName(previewFiles).map((file, index) => (
                  <li key={`${file?.name}-${index}`}>
                    <LeftBlock>
                      <DragIndicatorIcon />
                      <Typography variant="body2">
                        {file?.name ? file.name.split('.').slice(0, -1).join('.') : ''}
                      </Typography>
                    </LeftBlock>
                     {file.url &&
                     <a href={file.url} target="_blank">
                     <NoteWrapper>
                      <img alt="noteIcon" src={NoteIcon} />
                     </NoteWrapper>
                     </a>
                       }
                    <CustomIconButton
                      color="mainCardTitleColor"
                      onClick={() => onModalOpen(file)}
                      disableRipple
                      icon={<ClearIcon />}
                      iconFontSize="20px"
                    />
                  </li>
                ))
              }
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
        headerText={deleteDocumentModalText.headerText}
        bodyText={deleteDocumentModalText.bodyText}
        onClickCancel={cancelAction}
        onClickConfirm={removeItem}
      />
    </WidgetsWrapper>
  );
};

DocumentsWidget.propTypes = {
  checkSameFile: PropTypes.func,
  handleUnsavedChangesInDocuments: PropTypes.func,
  documents: PropTypes.instanceOf(Array),
  initDocuments: PropTypes.instanceOf(Array),
  isSameFileDocuments: PropTypes.bool,
  savedChangesInDocuments: PropTypes.bool,
  title: PropTypes.string,
  uploadedDocuments: PropTypes.instanceOf(Array),
  uploadLineJobDocuments: PropTypes.func,
  updateSavedLineJobDocuments: PropTypes.func,
};

const mapStateToProps = ({ jobDetails, recentFiles: { isSameFileDocuments } }) => ({
  documents: jobDetails.documents,
  isSameFileDocuments,
  initDocuments: jobDetails.initData.documents,
  savedChangesInDocuments: jobDetails.savedChangesInDocuments,
  uploadedDocuments: jobDetails.uploadedDocuments,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  checkSameFile,
  handleUnsavedChangesInDocuments,
  uploadLineJobDocuments,
  updateSavedLineJobDocuments,
  lineJobStationFilesPreUpload,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DocumentsWidget);
