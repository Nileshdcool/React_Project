import React from 'react';
import Button from '@material-ui/core/Button';

import { BUTTONS_TEXT } from '../../constants';
import { BOMsActionRow } from './styledComponents';

export const BOMsActionsRow = React.memo(({ isExpanded, onButtonClick }) => (
  <BOMsActionRow>
    <Button
      color="primary"
      onClick={onButtonClick}
    >
      {isExpanded ? BUTTONS_TEXT.collapse : BUTTONS_TEXT.expand}
    </Button>
  </BOMsActionRow>
));
