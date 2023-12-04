import React from 'react';
import {LoadingSpinnerWrapper, StyledCircularOuter} from './styledComponents';

export const LoadingSpinner = () => {
  const progressWidth = 50;

  return (
    <LoadingSpinnerWrapper>
      <StyledCircularOuter size={progressWidth} thickness={5} variant="indeterminate" disableShrink/>
    </LoadingSpinnerWrapper>
  );
};
