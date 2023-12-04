import {
  CloseImg,
  ErrorBlockArea,
  ErrorBlockText,
  ErrorBlockTitle,
  ErrorContentWrapper,
  ErrorImg,
  ErrorTextWrapper
} from './styledComponents';

import React from 'react';

export const ErrorBlock = ({ closeError }) => React.memo((
  <ErrorBlockArea>
    <CloseImg onClick={() => closeError('isError')} />
    <ErrorContentWrapper>
      <ErrorImg />
      <ErrorTextWrapper>
        <ErrorBlockTitle>Invalid File Format</ErrorBlockTitle>
        <ErrorBlockText>Please select a file in a pdf format.</ErrorBlockText>
      </ErrorTextWrapper>
    </ErrorContentWrapper>
  </ErrorBlockArea>
));
