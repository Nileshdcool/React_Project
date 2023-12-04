import Collapse from '@material-ui/core/Collapse/Collapse';
import List from '@material-ui/core/List';
import React from 'react';
import {
  AddBOM,
  BaseListItem,
  BOMItemWrapperWithIcon,
  CloseCollapseIcon,
  ItemText,
  OpenCollapseIcon,
  RemoveItem,
  SecondaryCollapseListItem,
} from './styledComponents';
import { IsCheckedItemIcon } from '../../../../../../../../../components/IsCheckedItemIcon/IsCheckedItemIcon';

export const isBomDeleted = (bomId, allBOMs) => {
  const foundedBOM = allBOMs.find(bom => bomId === bom.id);
  const isChecked = foundedBOM && foundedBOM.isCheckedForStation;
  return !!isChecked;
};

export const areEqual = (array) => {
  const len = array.length;
  for (let i = 1; i < len; i++) {
    if (array[i] === null || array[i] !== array[i - 1]) return false;
  }
  return true;
};

export const isTopLevelElementHasChild = (bomId, parsedBOMs) => {
  const foundedTopLevelBomInParsed = parsedBOMs.find(bom => bom.id === bomId);
  const isBOMHasChild = foundedTopLevelBomInParsed.children.length > 0;
  return isBOMHasChild;
};

export const makeRecursiveBOMComponent = (
  componentData,
  collapseElementsState,
  toggleCloseCollapse,
  toggleOpenCollapse,
  handleBOMAction,
  toggleBOMModal,
  checkedBoms,
  parsedBOMs,
  i,
  isItemWithAnnotation,
  enableAddBoms,
) => {
  i += 20;

  const foundedElementInParsed = parsedBOMs.filter(item => item.id === componentData.id);
  const isHasChild = foundedElementInParsed.length > 0
    && foundedElementInParsed[0].children
    && foundedElementInParsed[0].children.length > 0;
  const bom = foundedElementInParsed.length > 0 && foundedElementInParsed[0].children;

  if (!isHasChild && foundedElementInParsed.length > 0) {
    return (
      bom.map(item => (
        <Collapse in={collapseElementsState[item.parentId]} timeout="auto" unmountOnExit key={item.id}>
          <List component="div" disablePadding>
            <BaseListItem>
              <BOMItemWrapperWithIcon>
                <IsCheckedItemIcon isHidden={false} />
                <ItemText
                  widthDecrement={i}
                  isChecked={!isBomDeleted(item.id, checkedBoms)}
                  primary={`${item.number} - ${item?.part?.number} - ${item.title}`}
                  onClick={() => (enableAddBoms && !isBomDeleted(item.id, checkedBoms))
                    && handleBOMAction(item.id, !isBomDeleted(item.id, checkedBoms))}
                />
              </BOMItemWrapperWithIcon>
              {isItemWithAnnotation && (!isBomDeleted(item.id, checkedBoms)
                ? <RemoveItem onClick={() => handleBOMAction(item.id, true)} />
                : <AddBOM onClick={() => handleBOMAction(item.id, false)} />)}
            </BaseListItem>
          </List>
        </Collapse>
      ))
    );
  }

  if (isHasChild && foundedElementInParsed.length > 0) {
    return (
      bom.map(item => {
        const foundedElementInParsed = parsedBOMs.find(bom => bom.id === item.id);
        const isItemWithChild = foundedElementInParsed && foundedElementInParsed.children.length > 0;
        return (
          isItemWithChild
            ? (
              <>
                <Collapse in={collapseElementsState[item.parentId]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <SecondaryCollapseListItem margin={i}>
                      <IsCheckedItemIcon isHidden={!isBomDeleted(item.id, checkedBoms)} />
                      {collapseElementsState[item.id]
                        ? <CloseCollapseIcon onClick={() => toggleCloseCollapse(item.id, parsedBOMs)} />
                        : <OpenCollapseIcon onClick={() => toggleOpenCollapse(item.id)} />}
                      <ItemText
                        widthDecrement={i}
                        isChecked={!isBomDeleted(item.id, checkedBoms)}
                        primary={`${item.number} - ${item?.part?.number} - ${item.title}`}
                        onClick={() => (enableAddBoms && !isBomDeleted(item.id, checkedBoms))
                          && handleBOMAction(item.id, !isBomDeleted(item.id, checkedBoms))}
                      />
                      {isItemWithAnnotation && (!isBomDeleted(item.id, checkedBoms)
                        ? <RemoveItem onClick={() => handleBOMAction(item.id, true)} />
                        : <AddBOM onClick={() => handleBOMAction(item.id, false)} />)}
                    </SecondaryCollapseListItem>
                  </List>
                </Collapse>
                {makeRecursiveBOMComponent(
                  item,
                  collapseElementsState,
                  toggleCloseCollapse,
                  toggleOpenCollapse,
                  handleBOMAction,
                  toggleBOMModal,
                  checkedBoms,
                  parsedBOMs,
                  i,
                  isItemWithAnnotation,
                  enableAddBoms,
                )}
              </>
            )
            : (
              <Collapse in={collapseElementsState[item.parentId]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <BaseListItem margin={i}>
                    <BOMItemWrapperWithIcon>
                      <IsCheckedItemIcon isHidden={!isBomDeleted(item.id, checkedBoms)} />
                      <ItemText
                        widthDecrement={i}
                        isChecked={!isBomDeleted(item.id, checkedBoms)}
                        primary={`${item.number} - ${item?.part?.number} - ${item.title}`}
                        onClick={() => (enableAddBoms && !isBomDeleted(item.id, checkedBoms))
                          && handleBOMAction(item.id, !isBomDeleted(item.id, checkedBoms))}
                      />
                    </BOMItemWrapperWithIcon>
                    {isItemWithAnnotation && (!isBomDeleted(item.id, checkedBoms)
                      ? <RemoveItem onClick={() => handleBOMAction(item.id, true)} />
                      : <AddBOM onClick={() => handleBOMAction(item.id, false)} />)}
                  </BaseListItem>
                </List>
              </Collapse>
            )
        );
      })
    );
  }
};
