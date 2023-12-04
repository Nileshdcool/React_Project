import Collapse from '@material-ui/core/Collapse/Collapse';
import List from '@material-ui/core/List';
import React from 'react';
import some from 'lodash/some';
import {
  AnnotatedBOMNoteWrapper,
  BaseListItem,
  BOMItemWrapperWithIcon,
  BOMNoteWrapper,
  CloseCollapseIcon,
  ItemText,
  OpenCollapseIcon,
  RemoveItem,
  SecondaryCollapseListItem,
} from './styledComponents';
import NoteIcon from '../../../../../../../../../img/iconNotes.svg';

export const isBomsWereChange = (initialBOMs, stationBOMs) => {
  const initialStationBOMsIDs = initialBOMs.length > 0 && initialBOMs.map(item => item.bom.id);
  const stationBOMsIDs = stationBOMs.length > 0 && stationBOMs.map(item => item.bom.id);
  const isSameIDs = stationBOMsIDs && stationBOMsIDs
    .map(item => initialStationBOMsIDs && initialStationBOMsIDs.includes(item) ? 'true' : 'false')
    .includes('false');
  return isSameIDs || initialBOMs.length !== stationBOMs.length;
};

export const isBomDeleted = (bomId, allBOMs) => {
  const foundedBOM = allBOMs.find(bom => bomId === bom.id);
  const isChecked = foundedBOM && foundedBOM.isCheckedForStation;
  return isChecked;
};

export const isBomAnnotated = (bomId, allBOMs) => {
  const foundedBOM = allBOMs.find(bom => bomId === bom.id);
  const isAnnotated = foundedBOM
    && foundedBOM.annotation !== null
    && foundedBOM.annotation.length > 0;
  return isAnnotated;
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
  selectBOM,
  selectedBomData
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
          <List
            component="div"
            disablePadding
          >
            <BaseListItem
              isSelectedBom={selectedBomData && selectedBomData.id === item.id}
            >
              <BOMItemWrapperWithIcon>
                <ItemText
                  primary={`${item.number} - ${item?.part?.number} - ${item.title}`}
                  onClick={() => selectBOM(item.id, !isBomDeleted(item.id, checkedBoms))}
                />
                {(some(checkedBoms
                  .filter(bom => bom.isCheckedForStation)
                  .filter(bom => bom.parentId === item.id), 'annotation')) && isBomDeleted(item.id, checkedBoms)
                  ? (
                    <AnnotatedBOMNoteWrapper
                      onClick={() => isBomDeleted(item.id, checkedBoms)
                      && toggleBOMModal(item.title, item.id, item)}
                    >
                      <img alt="noteIcon" src={NoteIcon} />
                    </AnnotatedBOMNoteWrapper>
                  )
                  : (
                    <BOMNoteWrapper
                      backgroundColor={isBomDeleted(item.id, checkedBoms)}
                      onClick={() => isBomDeleted(item.id, checkedBoms)
                      && toggleBOMModal(item.title, item.id, item)}
                    >
                      <img alt="noteIcon" src={NoteIcon} />
                    </BOMNoteWrapper>
                  )}
              </BOMItemWrapperWithIcon>
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
                  <List
                    component="div"
                    disablePadding
                    isSelectedBom={selectedBomData && selectedBomData.id === item.id}
                  >
                    <SecondaryCollapseListItem
                      margin={i}
                      isSelectedBom={selectedBomData && selectedBomData.id === item.id}
                    >
                      {collapseElementsState[item.id]
                        ? <CloseCollapseIcon onClick={() => toggleCloseCollapse(item.id, parsedBOMs)} />
                        : <OpenCollapseIcon onClick={() => toggleOpenCollapse(item.id)} />}
                      <ItemText
                        widthDecrement={i}
                        primary={`${item.number} - ${item?.part?.number} - ${item.title}`}
                        onClick={() => selectBOM(item.id, !isBomDeleted(item.id, checkedBoms))}
                      />
                      {some(checkedBoms
                        .filter(bom => bom.isCheckedForStation)
                        .filter(bomItem => bomItem.parentId === item.id), 'annotation') && isBomDeleted(item.id, checkedBoms)
                        ? (
                          <AnnotatedBOMNoteWrapper
                            onClick={() => isBomDeleted(item.id, checkedBoms)
                            && toggleBOMModal(item.title, item.id, item)}
                          >
                            <img alt="noteIcon" src={NoteIcon} />
                          </AnnotatedBOMNoteWrapper>
                        )
                        : (
                          <BOMNoteWrapper
                            backgroundColor={isBomDeleted(item.id, checkedBoms)}
                            onClick={() => isBomDeleted(item.id, checkedBoms)
                            && toggleBOMModal(item.title, item.id, item)}
                          >
                            <img alt="noteIcon" src={NoteIcon} />
                          </BOMNoteWrapper>
                        )}
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
                  selectBOM,
                  selectedBomData
                )}
              </>
            )
            : (
              <Collapse in={collapseElementsState[item.parentId]} timeout="auto" unmountOnExit>
                <List
                  component="div"
                  disablePadding
                  isSelectedBom={selectedBomData && selectedBomData.id === item.id}
                >
                  <BaseListItem
                    margin={i}
                    isSelectedBom={selectedBomData && selectedBomData.id === item.id}
                  >
                    <BOMItemWrapperWithIcon>
                      <ItemText
                        widthDecrement={i}
                        primary={`${item.number} - ${item?.part?.number} - ${item.title}`}
                        onClick={() => selectBOM(item.id, !isBomDeleted(item.id, checkedBoms))}
                      />
                    </BOMItemWrapperWithIcon>
                  </BaseListItem>
                </List>
              </Collapse>
            )
        );
      })
    );
  }
};
