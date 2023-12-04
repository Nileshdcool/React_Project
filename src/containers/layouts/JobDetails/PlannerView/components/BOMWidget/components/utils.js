import Collapse from '@material-ui/core/Collapse/Collapse';
import List from '@material-ui/core/List';
import React from 'react';
import some from 'lodash/some';
import {
  AddBOM,
  AnnotatedBOMNoteWrapper,
  BaseListItem,
  BOMItemWrapperWithIcon,
  BOMNoteWrapper, CloseCollapseIcon,
  ItemText, OpenCollapseIcon, RemoveItem, SecondaryCollapseListItem,
} from './styledComponents';
import NoteIcon from '../../../../../../../img/iconNotes.svg';

export const isBomDeleted = (bomId, allBOMs) => {
  const foundedBOM = allBOMs.find(bom => bomId === bom.id);
  const isDeleted = foundedBOM && foundedBOM.isDeleted;
  return isDeleted;
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
) => {
  i += 15;

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
                <ItemText
                  fontColor={!isBomDeleted(item.id, checkedBoms) ? '#425a70' : '#979797'}
                  primary={`${item.number} - ${item?.part?.number} - ${item.title}`}
                />
                {some(checkedBoms
                  .filter(bom => !bom.isDeleted)
                  .filter(bom => bom.parentId === item.id), 'annotation')
                  ? (
                    <AnnotatedBOMNoteWrapper
                      onClick={() => !isBomDeleted(item.id, checkedBoms)
                      && toggleBOMModal(item.title, item.id, item)}
                    >
                      <img alt="noteIcon" src={NoteIcon} />
                    </AnnotatedBOMNoteWrapper>
                  )
                  : (
                    <BOMNoteWrapper
                      backgroundColor={!isBomDeleted(item.id, checkedBoms)}
                      onClick={() => !isBomDeleted(item.id, checkedBoms)
                      && toggleBOMModal(item.title, item.id, item)}
                    >
                      <img alt="noteIcon" src={NoteIcon} />
                    </BOMNoteWrapper>
                  )}
              </BOMItemWrapperWithIcon>
              {!isBomDeleted(item.id, checkedBoms)
                ? <RemoveItem onClick={() => handleBOMAction(item.id, true)} />
                : <AddBOM onClick={() => handleBOMAction(item.id, false)} />}
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
                      {collapseElementsState[item.id]
                        ? <CloseCollapseIcon onClick={() => toggleCloseCollapse(item.id, parsedBOMs)} />
                        : <OpenCollapseIcon onClick={() => toggleOpenCollapse(item.id)} />}
                      <ItemText
                        widthDecrement={i}
                        fontColor={!isBomDeleted(item.id, checkedBoms) ? '#425a70' : '#979797'}
                        primary={`${item.number} - ${item?.part?.number} - ${item.title}`}
                      />
                      {some(checkedBoms
                        .filter(bom => !bom.isDeleted)
                        .filter(bomItem => bomItem.parentId === item.id), 'annotation')
                        ? (
                          <AnnotatedBOMNoteWrapper
                            onClick={() => !isBomDeleted(item.id, checkedBoms)
                            && toggleBOMModal(item.title, item.id, item)}
                          >
                            <img alt="noteIcon" src={NoteIcon} />
                          </AnnotatedBOMNoteWrapper>
                        )
                        : (
                          <BOMNoteWrapper
                            backgroundColor={!isBomDeleted(item.id, checkedBoms)}
                            onClick={() => !isBomDeleted(item.id, checkedBoms)
                            && toggleBOMModal(item.title, item.id, item)}
                          >
                            <img alt="noteIcon" src={NoteIcon} />
                          </BOMNoteWrapper>
                        )}
                      {!isBomDeleted(item.id, checkedBoms)
                        ? <RemoveItem onClick={() => handleBOMAction(item.id, true)} />
                        : <AddBOM onClick={() => handleBOMAction(item.id, false)} />}
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
                )}
              </>
            )
            : (
              <Collapse in={collapseElementsState[item.parentId]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <BaseListItem margin={i}>
                    <BOMItemWrapperWithIcon>
                      <ItemText
                        widthDecrement={i}
                        fontColor={!isBomDeleted(item.id, checkedBoms) ? '#425a70' : '#979797'}
                        primary={`${item.number} - ${item?.part?.number} - ${item.title}`}
                      />
                    </BOMItemWrapperWithIcon>
                    {!isBomDeleted(item.id, checkedBoms)
                      ? <RemoveItem onClick={() => handleBOMAction(item.id, true)} />
                      : <AddBOM onClick={() => handleBOMAction(item.id, false)} />}
                  </BaseListItem>
                </List>
              </Collapse>
            )
        );
      })
    );
  }
};
