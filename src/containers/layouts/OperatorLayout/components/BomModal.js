import React from 'react';
import BOMTableDialog from '../../../../components/ModalDialog/BOMTableDialog';
import { OPERATOR_BOM_MODAL_SIZE } from '../../../../constants';

export const BomModal = ({
  openBOMModal,
  closeBomModal,
  toggleAnnotationModal,
  openAnnotationModalData,
  allBoms,
  bomModalData,
}) => (
  <BOMTableDialog
    open={openBOMModal}
    openAnnotationModal={!!openAnnotationModalData}
    onClose={closeBomModal}
    bomModalId={!!bomModalData && bomModalData.bomModalId}
    headerText={!!bomModalData && bomModalData.bomModalTitle}
    bodyItems={allBoms}
    selectedValue={!!openAnnotationModalData && openAnnotationModalData.selectedValue}
    annotationText={!!openAnnotationModalData && openAnnotationModalData.annotationText}
    toggleAnnotationModal={toggleAnnotationModal}
    bomModalSize={OPERATOR_BOM_MODAL_SIZE}
    isOperatorViewBoms
  />
);
