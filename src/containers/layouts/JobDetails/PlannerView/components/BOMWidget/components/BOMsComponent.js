import { isEmpty } from 'lodash';
import some from 'lodash/some';
import sortBy from 'lodash/sortBy';
import React, { Component } from 'react';

import { BOMsActionsRow } from '../../../../../../../components/BOMsCollapseExpandActions/BOMsCollapseExpandActions';
import BOMTableDialog from '../../../../../../../components/ModalDialog/BOMTableDialog';
import NoteIcon from '../../../../../../../img/iconNotes.svg';
import { createBOMsWithChildsAndParent } from '../../../../../../../utils/boms';
import {
  AddBOM,
  AnnotatedBOMNoteWrapper,
  BOMList,
  BOMNoteWrapper, BOMsWidgetContentWrapper,
  CloseCollapseIcon,
  ItemText,
  MainCollapseListItem,
  OpenCollapseIcon,
  RemoveItem,
} from './styledComponents';
import {
  areEqual,
  isBomDeleted,
  isTopLevelElementHasChild,
  makeRecursiveBOMComponent,
} from './utils';

class BOMsComponent extends Component {
  state = {
    openBOMModal: false,
    bomModalTitle: '',
    bomPartNumber: '',
    collapseElementsState: {},
    bomModalId: '',
    selectedValue: '',
    annotationText: '',
    openAnnotationModal: false,
    width: '1340',
    height: '400',
    x: 0,
    y: 0,
    isDisabled: false,
  };

  toggleCloseCollapse = (id, parsedBOMs) => {
    const { collapseElementsState } = this.state;
    const foundedBOMCollapse = parsedBOMs.find(bom => bom.id === id);

    const closeChildsCollapse = (bomItem) => {
      collapseElementsState[bomItem.id] = false;
      if (bomItem.children && bomItem.children.length > 0) {
        bomItem.children.forEach(item => {
          const foundedBOMCollapse = parsedBOMs.find(bom => bom.id === item.id);
          closeChildsCollapse(foundedBOMCollapse);
        });
      }
    };
    closeChildsCollapse(foundedBOMCollapse);
    this.setState({ collapseElementsState });
  }

  toggleOpenCollapse = (id) => {
    const { collapseElementsState } = this.state;
    collapseElementsState[id] = true;
    this.setState({ collapseElementsState });
  }

  toggleActionAllBoms = (items) => {
    const { boms } = this.props;
    const bomsIds = boms.map(item => item.id);
    const updatedElements = {};
    bomsIds.forEach(id => {
      updatedElements[id] = !items.some(item => item);
    });
    this.setState({ collapseElementsState: { ...updatedElements } });
  }

  toggleBOMModal = (title, id, bomClicked) => {
    const { checkedBoms } = this.props;
    const { openBOMModal } = this.state;

    if (!openBOMModal) {
      this.setState({
        x: 0, y: 0, width: 1340, height: 400,
      });
    }

    console.log('toggleBOMModal')
    console.log(checkedBoms)

    this.setState({
      openBOMModal: !openBOMModal,
      bomModalTitle: title && title.target ? '' : title,
      bomPartNumber: bomClicked?.part?.number,
      bomModalId: id,
      selectedValue: id && checkedBoms
        .filter(bom => !bom.isDeleted)
        .filter(bom => bom.parentId === id)[0] && sortBy(checkedBoms
        .filter(bom => !bom.isDeleted)

      // TODO change number to Id for BOM here

        .filter(bom => bom.parentId === id), 'number')[0].id,
      annotationText: id && checkedBoms
        .filter(bom => !bom.isDeleted)
        .filter(bom => bom.parentId === id)[0] && sortBy(checkedBoms
        .filter(bom => !bom.isDeleted)
        .filter(bom => bom.parentId === id), 'number')[0].annotation,
    });
  }

  toggleAnnotationModal = (bom, isDisabled) => {
    const { checkedBoms } = this.props;
    const { openAnnotationModal } = this.state;

    console.log('toggleAnnotationModal')
    console.log(checkedBoms)

    if (bom && bom.id) {
      this.setState({
        openAnnotationModal: !openAnnotationModal,
        // TODO change number to Id for BOM here
        selectedValue: checkedBoms.find(item => item.id === bom.id).id,
        annotationText: checkedBoms.find(item => item.id === bom.id).annotation,
        isDisabled,
      });
    } else {
      this.setState({ openAnnotationModal: !openAnnotationModal });
    }
  }

  onChangeItem = (e) => {
    const { checkedBoms } = this.props;
    const { bomModalId } = this.state;

    console.log('onChangeItem')
    console.log(checkedBoms)

    if (e.target.id) {
      this.setState({
        selectedValue: e.target.id,
        annotationText: sortBy(checkedBoms
          .filter(bom => !bom.isDeleted)
          .filter(bom => bom.parentId === bomModalId), 'number')
          .find(item => item.id === e.target.id).annotation,
      });
    }
  }

  onChangeAnnotation = (e, item) => {
    const {
      handleUnsavedChangesInAnnotations,
      handleUnsavedChangesInBOM,
      checkedBoms,
      liveUpdateBoms,
    } = this.props;

    console.log('onChangeAnnotation')
    console.log(checkedBoms)

    // const { selectedValue } = this.state;
    // if ((checkedBoms.find(bom => item === bom.id).annotation || '') !== e.target.value) {
    //   handleUnsavedChangesInAnnotations(false);
    //   handleUnsavedChangesInBOM(false);
    // } else {
    //   handleUnsavedChangesInAnnotations(true);
    //   handleUnsavedChangesInBOM(true);
    // }
    // const updatedBoms = checkedBoms.map(item =>
    //   // TODO change number to Id for BOM here
    //   (selectedValue === item.id ? { ...item, annotation: e.target.value } : item));
    // this.setState({ annotationText: '' });
    // liveUpdateBoms(updatedBoms);
    this.setState({ annotationText: e.target.value });
  };

  onDiscardAnnotation = bomId => {
    const { boms, handleUnsavedChangesInAnnotations, handleUnsavedChangesInBOM } = this.props;

    console.log('onDiscardAnnotation')
    console.log(boms)

    // TODO change number to Id for BOM here
    this.setState({ annotationText: boms.find(item => item.id === bomId).annotation });
    handleUnsavedChangesInAnnotations(true);
    handleUnsavedChangesInBOM(true);
  }

  saveAnnotation = () => {
    const {
      updateBoms,
      checkedBoms,
      handleUnsavedChangesInAnnotations,
      handleUnsavedChangesInBOM,
      boms,
    } = this.props;

    console.log('saveAnnotation')
    console.log(boms)
    console.log(checkedBoms)

    const { selectedValue, annotationText } = this.state;
    const updatedBoms = checkedBoms.map(item =>
      // TODO change number to Id for BOM here
      (selectedValue === item.id ? { ...item, annotation: annotationText } : item));
    this.setState({ annotationText: '' });
    updateBoms(updatedBoms);
    handleUnsavedChangesInAnnotations(true);
    // TODO change number to Id for BOM here
    if (annotationText !== checkedBoms.find(item => item.id === selectedValue).annotation) {
      handleUnsavedChangesInBOM(false);
    }
    // TODO change number to Id for BOM here
    if (annotationText === boms.find(item => item.id === selectedValue).annotation) {
      handleUnsavedChangesInBOM(true);
    }
  }

  removeAnnotation = () => {
    const {
      updateBoms, checkedBoms, handleUnsavedChangesInBOM, boms,
    } = this.props;

    console.log('removeAnnotation')
    console.log(boms)
    console.log(checkedBoms)

    const { selectedValue } = this.state;
    const updatedBoms = checkedBoms.map(item =>
      // TODO change number to Id for BOM here
      (selectedValue === item.id ? { ...item, annotation: '' } : item));
    updateBoms(updatedBoms);
    this.setState({ selectedValue: '', annotationText: '' });
    // TODO change number to Id for BOM here
    if (boms.find(item => selectedValue === item.id)
      && boms.find(item => selectedValue === item.id).annotation) {
      handleUnsavedChangesInBOM(false);
    } else {
      handleUnsavedChangesInBOM(true);
    }
  }

  onResize = (event, { element, size, handle }) => {
    this.setState({ width: size.width, height: size.height });
  };

  onDragStop = (e, position) => {
    const { x, y } = position;
    this.setState({ x, y });
  };

  handleBOMAction = (id, isDeleted) => {
    const {
      updateBoms, checkedBoms, boms, handleUnsavedChangesInBOM,
    } = this.props;

    const parsedBOMs = createBOMsWithChildsAndParent(boms);

    const foundedToggledBOM = parsedBOMs.find(bom => bom.id === id);
    const handledBOMsIds = [];
    let temporaryBOMS = [];

    const setHandledBOMsToTemporary = (bom) => {
      if (handledBOMsIds.includes(bom.id) === false) {
        handledBOMsIds.push(bom.id);

        temporaryBOMS = checkedBoms.map(item =>
          (handledBOMsIds.indexOf(item.id) >= 0 ? { ...item, isDeleted } : item));
      }
    };

    const updateBOMsStatus = (bomItem) => {
      setHandledBOMsToTemporary(bomItem);

      const foundedBOMInTemporary = bomItem.parentId !== null && temporaryBOMS.find(bom => bom.id === bomItem.parentId);
      const parentIsChangedStatus = isDeleted === foundedBOMInTemporary.isDeleted;

      const changeParentStatus = (parentBOM) => {
        setHandledBOMsToTemporary(parentBOM);
        const foundedParentBOM = parsedBOMs.find(item => item.id === parentBOM.parentId);
        if (parentBOM.parentId !== null) {
          changeParentStatus(foundedParentBOM);
        }
      };

      if (bomItem.parentId !== null && !parentIsChangedStatus) {
        const foundedParentBOM = parsedBOMs.find(item => item.id === bomItem.parentId);
        if (foundedParentBOM.children.length > 1) {
          const parentChildrenStatuses = foundedParentBOM.children
            .map(bom => temporaryBOMS.find(item => item.id === bom.id).isDeleted.toString());
          const isStatusesAreEqual = areEqual(parentChildrenStatuses);

          if (isStatusesAreEqual && foundedParentBOM.parentId) {
            updateBOMsStatus(foundedParentBOM);
          } else if (!isDeleted) {
            changeParentStatus(foundedParentBOM);
          } else if (isStatusesAreEqual && foundedParentBOM.parentId === null) {
            setHandledBOMsToTemporary(foundedParentBOM);
          }
        } else if (foundedParentBOM.children.length === 1) {
          setHandledBOMsToTemporary(foundedParentBOM);
        }
      }
      if (bomItem.children && bomItem.children.length > 0) {
        bomItem.children.forEach(item => {
          const foundedChildBOM = parsedBOMs.find(bom => bom.id === item.id);
          setHandledBOMsToTemporary(item);
          if (foundedChildBOM && foundedChildBOM.children && foundedChildBOM.children.length > 0) {
            updateBOMsStatus(foundedChildBOM);
          } else {
            setHandledBOMsToTemporary(foundedChildBOM);
          }
        });
      }
    };

    if (foundedToggledBOM.parentId !== null
      || (foundedToggledBOM.children && foundedToggledBOM.children.length > 0)
    ) {
      updateBOMsStatus(foundedToggledBOM);
    } else {
      setHandledBOMsToTemporary(foundedToggledBOM);
    }

    const updatedBOMs = checkedBoms.map(item =>
      (handledBOMsIds.indexOf(item.id) >= 0 ? { ...item, isDeleted } : item));
    updateBoms(updatedBOMs);

    if (updatedBOMs.filter(bom => bom.isDeleted).length === boms.filter(bom => bom.isDeleted).length) {
      handleUnsavedChangesInBOM(true);
    } else {
      handleUnsavedChangesInBOM(false);
    }
  }

  render() {
    const {
      collapseElementsState,
      openBOMModal,
      bomModalTitle,
      bomPartNumber,
      bomModalId,
      selectedValue,
      annotationText,
      openAnnotationModal,
      width,
      height,
      x,
      y,
      isDisabled,
    } = this.state;
    const {
      boms,
      checkedBoms,
      savedChangesInAnnotations,
    } = this.props;

    const changeBoms = boms.map(item => ({ ...item, isDeleted: true }));
    const parsedBOMs = createBOMsWithChildsAndParent(changeBoms);
    const bomTopLevelElements = sortBy(boms.filter(item => item.parentId === null), 'number');

    const itemsValues = Object.values(collapseElementsState);

    return (
      <BOMsWidgetContentWrapper>
        <BOMsActionsRow
          isExpanded={itemsValues.some(item => item)}
          onButtonClick={() => this.toggleActionAllBoms(itemsValues)}
        />
        <BOMList
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          {bomTopLevelElements.map(bom => {
            const isItemWithChild = isTopLevelElementHasChild(bom.id, parsedBOMs);
            return (
              <>
                <MainCollapseListItem withoutChildItem={!isItemWithChild}>
                  {isItemWithChild && (collapseElementsState[bom.id]
                    ? <CloseCollapseIcon onClick={() => this.toggleCloseCollapse(bom.id, parsedBOMs)} />
                    : <OpenCollapseIcon onClick={() => this.toggleOpenCollapse(bom.id)} />)}
                  <ItemText
                    fontColor={!isBomDeleted(bom.id, checkedBoms) ? '#425a70' : '#979797'}
                    primary={`${bom.number} - ${bom?.part?.number} - ${bom.title}`}
                  />
                  {isItemWithChild
                    ? (some(checkedBoms
                      .filter(bom => !bom.isDeleted)
                      .filter(item => item.parentId === bom.id), 'annotation')
                      ? (
                        <AnnotatedBOMNoteWrapper
                          onClick={() => !isBomDeleted(bom.id, checkedBoms)
                            && this.toggleBOMModal(bom.title, bom.id, bom)}
                        >
                          <img alt="noteIcon" src={NoteIcon} />
                        </AnnotatedBOMNoteWrapper>
                      )
                      : (
                        <BOMNoteWrapper
                          backgroundColor={!isBomDeleted(bom.id, checkedBoms)}
                          onClick={() => !isBomDeleted(bom.id, checkedBoms)
                            && this.toggleBOMModal(bom.title, bom.id, bom)}
                        >
                          <img alt="noteIcon" src={NoteIcon} />
                        </BOMNoteWrapper>
                      ))
                    : null}
                  {!isBomDeleted(bom.id, checkedBoms)
                    ? <RemoveItem onClick={() => this.handleBOMAction(bom.id, true)} />
                    : <AddBOM onClick={() => this.handleBOMAction(bom.id, false)} />}
                </MainCollapseListItem>
                {makeRecursiveBOMComponent(
                  bom,
                  collapseElementsState,
                  this.toggleCloseCollapse,
                  this.toggleOpenCollapse,
                  this.handleBOMAction,
                  this.toggleBOMModal,
                  checkedBoms,
                  parsedBOMs,
                  10,
                )}
              </>
            );
          })}
        </BOMList>
        <BOMTableDialog
          open={openBOMModal}
          openAnnotationModal={openAnnotationModal}
          buttonName="ANNOTATE"
          onClose={this.toggleBOMModal}
          bomPartNumber={bomPartNumber}
          bomModalId={bomModalId}
          headerText={bomModalTitle}
          bodyItems={checkedBoms}
          savedChangesInAnnotations={savedChangesInAnnotations}
          selectedValue={selectedValue}
          annotationText={annotationText}
          onChangeItem={this.onChangeItem}
          onChangeAnnotation={this.onChangeAnnotation}
          saveAnnotation={this.saveAnnotation}
          removeAnnotation={this.removeAnnotation}
          toggleAnnotationModal={this.toggleAnnotationModal}
          onDiscardAnnotation={this.onDiscardAnnotation}
          onResize={this.onResize}
          onDragStop={this.onDragStop}
          isDisabled={isDisabled}
          bomModalSize={{
            x, y, width, height,
          }}
        />
      </BOMsWidgetContentWrapper>
    );
  }
}

export default BOMsComponent;
