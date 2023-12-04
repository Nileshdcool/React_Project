import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

import { getOperatorRevisionNotifications, markNotificationsAsOperator } from '../../actions/issueRevision';
import { getOperatorSidebarData } from '../../actions/operator';
import { STATION_NOTIFICATIONS_TYPE } from '../../constants';
import { SignalsWarningIcon } from '../SvgIcons/svgIcons';
import {
  IconWrapper,
  ListHeader,
  ListHeaderTitle,
  ListWrapper,
} from './styledComponents';

const ListComponent = ({
  title,
  children,
  notifications,
  notificationsType,
  tasks,
  markNotificationsAsOperator,
  getOperatorSidebarData,
  getOperatorRevisionNotifications,
  sideBarData,
}) => {
  const markAsRead = async () => {
    const readIds = notifications
      .filter(notification => notification.revisedElementType.name === STATION_NOTIFICATIONS_TYPE[notificationsType])
      .map(item => item.id);
    await markNotificationsAsOperator({ items: readIds });
    getOperatorSidebarData(sideBarData.stationId)
      .then(response => {
        const { id } = response.data;
        getOperatorRevisionNotifications(id);
      });
  };

  return (
    <ListWrapper>
      {title
        ? (
          <ListHeader>
            <ListHeaderTitle variant="h5">{title}</ListHeaderTitle>
            <IconWrapper onClick={() => markAsRead()}>
              {
                notifications &&
                tasks.length &&
                notifications.filter(item =>
                  item.revisedElementType.name === STATION_NOTIFICATIONS_TYPE[notificationsType]).length
                ? <SignalsWarningIcon width="24" height="24" color="ORANGE" />
                : null}
            </IconWrapper>
          </ListHeader>
        )
        : null}
      {children}
    </ListWrapper>
  );
};

const mapDispatchToProps = dispatch => bindActionCreators({
  markNotificationsAsOperator,
  getOperatorSidebarData,
  getOperatorRevisionNotifications,
}, dispatch);

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
)(ListComponent);
