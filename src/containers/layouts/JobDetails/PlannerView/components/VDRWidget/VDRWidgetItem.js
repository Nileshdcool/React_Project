import React from 'react';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

import { LeftBlock } from '../styledComponents';

const VDRWidgetItem = ({ sequence, subject, url }) => (
  <li>
    <LeftBlock>
      <Tooltip title={`${sequence} - ${subject}`} placement="top">
        <a href={url} target="_blank" rel="noopener noreferrer">
          <Typography variant="body2">
            {`${sequence} - ${subject}`}
          </Typography>
        </a>
      </Tooltip>
    </LeftBlock>
  </li>
);

export default React.memo(VDRWidgetItem);
