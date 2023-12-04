import { StyledTypography, WidgetsWrapper } from '../styledComponents';

import BOMsComponent from './components/BOMsComponent';
import React from 'react';

const BOM = ({
  title,
  boms,
  checkedBoms,
  updateBoms,
  liveUpdateBoms,
  savedChangesInAnnotations,
  handleUnsavedChangesInBOM,
  handleUnsavedChangesInAnnotations,
}) => (
  <WidgetsWrapper>
    <StyledTypography variant="subtitle1">{title}</StyledTypography>
    <BOMsComponent
      boms={boms}
      checkedBoms={checkedBoms}
      updateBoms={updateBoms}
      handleUnsavedChangesInBOM={handleUnsavedChangesInBOM}
      liveUpdateBoms={liveUpdateBoms}
      savedChangesInAnnotations={savedChangesInAnnotations}
      handleUnsavedChangesInAnnotations={handleUnsavedChangesInAnnotations}
      isItemWithAnnotation={false}
    />
  </WidgetsWrapper>
);

export default BOM;
