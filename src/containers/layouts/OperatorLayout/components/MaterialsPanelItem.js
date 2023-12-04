import Typography from '@material-ui/core/Typography';
import React from 'react';

import { SignalsWarningIcon } from '../../../../components/SvgIcons/svgIcons';
import { STATION_NOTIFICATIONS_TYPE } from '../../../../constants';
import { PanelItemWrapper, WarningIconWrapper } from '../styledComponents';

export const PanelItem = ({
  icon,
  name,
  onClick,
  id,
  notifications,
  notificationsType,
  disabled,
  ...props
}) => (
  <PanelItemWrapper
    onClick={onClick}
    id={id}
    disabled={disabled}
    {...props}
  >
    {icon}
    <Typography variant="body2">
      {name}
    </Typography>
    <WarningIconWrapper>
      {!disabled && notifications &&
        notifications.filter(item => item.actionType.name !== 'Delete' &&
          item.revisedElementType.name === STATION_NOTIFICATIONS_TYPE[notificationsType]).length
        ? <SignalsWarningIcon width="24" height="24" color="ORANGE" />
        : null}
    </WarningIconWrapper>
  </PanelItemWrapper>
);
