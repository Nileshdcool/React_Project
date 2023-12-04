import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import CheckIcon from '@material-ui/icons/Check';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';
import sortBy from 'lodash/sortBy';
import { SignalsWarningIcon } from '../SvgIcons/svgIcons';
import { StyledListItem } from '../../containers/layouts/JobDetails/SupervisorView/components/styledComponents';
import {
  MultiSelectListsWrapper,
  TextWrapper,
} from '../../containers/layouts/JobDetails/SupervisorView/components/TasksWidget/TasksMultiSelectGroup/styledComponents';
import { MULTI_SELECT_GROUP_TYPES, libraryEmptyPlaceholder } from '../../constants';
import {
  IconWrapper,
  ItemText,
  ListWrapper,
  StyledCollapse,
  StyledMenuItem,
} from './styledComponents';

export const MultipleSelect = ({
  items, placeholder, onChange, notifications, notificationType, markNotifications, isDataLoading
}) => {
  const [isOpenCollapse, setIsOpenCollapse] = React.useState(false);

  const handleClickAway = () => {
    setIsOpenCollapse(false);
  };

  const handleOpenCollapse = async () => {
    setIsOpenCollapse(!isOpenCollapse);
    const readIds = notifications
      .filter(notification => notification.revisedElementType.name === notificationType)
      .map(item => item.id);
    if (readIds.length) {
      await markNotifications({ items: readIds });
    }

  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <MultiSelectListsWrapper>
        <StyledListItem
          button
          onClick={!isDataLoading ? handleOpenCollapse : null}
          isOpen={isOpenCollapse}
          isDataLoading={isDataLoading}
        >
          <ListItemText primary={placeholder} />
          {notifications.filter(item => item.revisedElementType.name === notificationType).length
            ? <SignalsWarningIcon color="ORANGE" />
            : null}
          {isOpenCollapse ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </StyledListItem>
        <StyledCollapse in={isOpenCollapse} timeout="auto" unmountOnExit>
          <ListWrapper>
            {sortBy(items, 'fileName').map((item) => (
              item.isChecked
                ? (
                  <StyledMenuItem
                    isChecked
                    key={item.fileName}
                    value={item.value}
                  >
                    <IconWrapper><CheckIcon /></IconWrapper>
                    <ItemText>{item.fileName}</ItemText>
                    {notifications.filter(msg => msg.revisedElementId === item.id).length
                      ? <SignalsWarningIcon width="24" height="24" color="ORANGE" />
                      : null}
                  </StyledMenuItem>
                )
                : (
                  <StyledMenuItem
                    onClick={() => onChange(items, item.id)}
                    isChecked={false}
                    key={item.fileName}
                    value={item.value}
                  >
                    <IconWrapper />
                    <ItemText>{item.fileName}</ItemText>
                    {notifications.filter(msg => msg.revisedElementId === item.id).length
                      ? <SignalsWarningIcon width="24" height="24" color="ORANGE" />
                      : null}
                  </StyledMenuItem>
                )
            ))}
          </ListWrapper>
          {items && items.length === 0 && (
            <TextWrapper>
              {
                placeholder === MULTI_SELECT_GROUP_TYPES.DOC
                  ? libraryEmptyPlaceholder.docs : libraryEmptyPlaceholder.drwg
              }
            </TextWrapper>
          )}
        </StyledCollapse>
      </MultiSelectListsWrapper>
    </ClickAwayListener>
  );
};
