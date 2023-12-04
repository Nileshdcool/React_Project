import Typography from '@material-ui/core/Typography';
import React from 'react';

import { SignalsWarningIcon } from '../../../../components/SvgIcons/svgIcons';
import { STATION_NOTIFICATIONS_TYPE } from '../../../../constants';
import {
  StyledCloseIcon,
  StyledNotesTitle,
} from '../../JobDetails/PlannerView/components/NotesWidget/styledComponents';
import { WarningIconWrapper } from '../styledComponents';
import {
  MaterialsPopupItemsWrapper,
  MaterialsPopupListItem,
  MaterialsPopupWrapper,
  MaterialsPopupWrapperHeader,
} from './styledComponents';


export const MaterialsPopup = ({
  widgetId, items, title, isNotesModal, icon, onClick, notifications,
}) => {
  const getWidgetItem = (item, widgetId) => {

    console.log('====== >>> WIDGET ID <<< +++++++', widgetId);
    switch (widgetId) {
      case 'itps':
        return (
          <MaterialsPopupListItem
            key={item.name || item}
            id={item.name || item}
            onClick={() => onClick(item, widgetId)}
          >
            {item?.name || item?.drawing?.fileName || item}
          </MaterialsPopupListItem>
        );
        break;
      case 'drawings':
        return (
          <a href={item.drawing.fileUrl} target="_blank">
            <MaterialsPopupListItem
              key={item.name || item}
              id={item.name || item}
            >
              {item?.name || item?.drawing?.fileName || item}
            </MaterialsPopupListItem>
          </a>
        );
        break;
      case 'boms':
        return (
          <MaterialsPopupListItem
            key={item.name || item}
            id={item.name || item}
            onClick={() => onClick(item, widgetId)}
          >
            {item.bom.title}
          </MaterialsPopupListItem>
        );
        break;
      case 'documents':
        return (
          <a href={item.fileUrl} target="_blank">
            <MaterialsPopupListItem
              key={item.name || item}
              id={item.name || item}
            >
              {item?.name || item?.drawing?.fileName || item}
            </MaterialsPopupListItem>
          </a>
        );
        break;
      default:
        return (
          <Typography key={item} variant="body2">
            {item}
          </Typography>
        );
    }
  };
  return (
    <MaterialsPopupWrapper>
      <MaterialsPopupWrapperHeader>
        {icon}
        <StyledNotesTitle>{title}</StyledNotesTitle>
        <WarningIconWrapper>
          {notifications
          && notifications.filter(item => item.actionType.name !== 'Delete'
            && item.revisedElementType.name === STATION_NOTIFICATIONS_TYPE[widgetId]).length
            ? <SignalsWarningIcon width="24" height="24" color="ORANGE" />
            : null}
        </WarningIconWrapper>
        {/* <StyledCloseIcon onClick={onClosePopup} /> */}
      </MaterialsPopupWrapperHeader>
      {!!items.length && (
      <MaterialsPopupItemsWrapper>
        {items.map((item) => (
          getWidgetItem(item, widgetId)
        ))}
      </MaterialsPopupItemsWrapper>
      )}
    </MaterialsPopupWrapper>
  );
};
