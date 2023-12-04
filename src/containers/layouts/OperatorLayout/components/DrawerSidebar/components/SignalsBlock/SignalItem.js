import React from 'react';

import {
  ListHeaderTitle,
} from './styledComponents';

export const SignalItem = React.memo(({ title }) => (
  <SignalItemWrapper>
    <SignalItemHeader>
      <ListHeaderTitle variant="h5">{title}</ListHeaderTitle>
    </SignalItemHeader>
  </SignalItemWrapper>
));
