import { isEmpty } from 'lodash';
import some from 'lodash/some';
import sortBy from 'lodash/sortBy';
import React, { Component } from 'react';

import { BOMsActionsRow } from '../../../../../../../../../components/BOMsCollapseExpandActions/BOMsCollapseExpandActions';
import { IsCheckedItemIcon } from '../../../../../../../../../components/IsCheckedItemIcon/IsCheckedItemIcon';
import BOMTableDialog from '../../../../../../../../../components/ModalDialog/BOMTableDialog';
import NoteIcon from '../../../../../../../../../img/iconNotes.svg';
import { createBOMsWithChildsAndParent } from '../../../../../../../../../utils/boms';
import { BOMsWidgetContentWrapper } from '../WidgetBoms/styledComponents';
import {
  AddBOM,
  AnnotatedBOMNoteWrapper,
  BOMList,
  BOMNoteWrapper,
  CloseCollapseIcon,
  ItemText,
  MainCollapseListItem,
  OpenCollapseIcon,
  RemoveItem,
} from './styledComponents';
import {
  isBomDeleted,
  isTopLevelElementHasChild,
  makeRecursiveBOMComponent,
} from './utils';

class BOMsComponent extends Component {
  state = {
    openBOMModal: false,
    bomModalTitle: '',
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

  toggleBOMModal = (title, id) => {
    const { checkedBoms } = this.props;
    const { openBOMModal } = this.state;

    if (!openBOMModal) {
      this.setState({
        x: 0, y: 0, width: 1340, height: 400,
      });
    }

    this.setState({
      openBOMModal: !openBOMModal,
      bomModalTitle: title && title.target ? '' : title,
      bomModalId: id,
      selectedValue: id && checkedBoms
        .filter(bom => !bom.isCheckedForStation)
        .filter(bom => bom.parentId === id)[0] && sortBy(checkedBoms
        .filter(bom => !bom.isCheckedForStation)
        .filter(bom => bom.parentId === id), 'number')[0].number,
      annotationText: id && checkedBoms
        .filter(bom => !bom.isCheckedForStation)
        .filter(bom => bom.parentId === id)[0] && sortBy(checkedBoms
        .filter(bom => !bom.isCheckedForStation)
        .filter(bom => bom.parentId === id), 'number')[0].annotation,
    });
  }

  componentDidMount() {
    const { boms } = this.props;
    const { collapseElementsState } = this.state;
    const bomsIds = boms.map(item => item.id);
    bomsIds.forEach(id => {
      collapseElementsState[id] = true;
      this.setState({ collapseElementsState });
    });
  }

  toggleAnnotationModal = (bom, isDisabled) => {
    const { checkedBoms } = this.props;
    const { openAnnotationModal } = this.state;
    if (bom && bom.id) {
      this.setState({
        openAnnotationModal: !openAnnotationModal,
        selectedValue: checkedBoms.find(item => item.id === bom.id).number,
        annotationText: checkedBoms.find(item => item.id === bom.id).annotation,
        isDisabled,
      });
    } else {
      this.setState({ openAnnotationModal: !openAnnotationModal });
    }
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

  onChangeItem = (e) => {
    const { checkedBoms } = this.props;
    const { bomModalId } = this.state;
    if (e.target.value) {
      this.setState({
        selectedValue: sortBy(checkedBoms
          .filter(bom => !bom.isCheckedForStation)
          .filter(bom => bom.parentId === bomModalId), 'number')[e.target.value - 1].number,
        annotationText: sortBy(checkedBoms
          .filter(bom => !bom.isCheckedForStation)
          .filter(bom => bom.parentId === bomModalId), 'number')[e.target.value - 1].annotation,
      });
    }
  }

  onChangeAnnotation = (e, item) => {
    const {
      checkedBoms,
      liveUpdateBoms,
      addedStationsBoms,
      setIsStationChangesSaved,
      handleAddedEntities,
    } = this.props;
    const { selectedValue } = this.state;
    if ((checkedBoms.find(bom => item === bom.number).annotation || '') !== e.target.value) {
      setIsStationChangesSaved(true);
    } else if (addedStationsBoms.length > 0) {
      handleAddedEntities();
    }
    const updatedBoms = checkedBoms.map(item =>
      (selectedValue === item.number ? { ...item, annotation: e.target.value } : item));
    this.setState({ annotationText: '' });
    liveUpdateBoms(updatedBoms);
    this.setState({ annotationText: e.target.value });
  };

  onDiscardAnnotation = number => {
    const {
      boms,
      handleUnsavedChangesInAnnotations,
      handleUnsavedChangesInBOM,
    } = this.props;
    this.setState({ annotationText: boms.find(item => item.number === number).annotation });
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
    const { selectedValue, annotationText } = this.state;
    const updatedBoms = checkedBoms.map(item =>
      (selectedValue === item.number ? { ...item, annotation: annotationText } : item));
    this.setState({ annotationText: '' });
    updateBoms(updatedBoms);
    handleUnsavedChangesInAnnotations(true);
    if (annotationText !== checkedBoms.find(item => item.number === selectedValue).annotation) {
      handleUnsavedChangesInBOM(false);
    }
    if (annotationText === boms.find(item => item.number === selectedValue).annotation) {
      handleUnsavedChangesInBOM(true);
    }
  }

  removeAnnotation = () => {
    const {

      updateBoms,
      checkedBoms,
      boms,
      addedStationsBoms,
      setIsStationChangesSaved,
      handleAddedEntities,
    } = this.props;
    const { selectedValue } = this.state;
    const updatedBoms = checkedBoms.map(item =>
      (selectedValue === item.number ? { ...item, annotation: '' } : item));
    updateBoms(updatedBoms);
    this.setState({ selectedValue: '', annotationText: '' });
    if (boms.find(item => selectedValue === item.number)
      && boms.find(item => selectedValue === item.number).annotation) {
      setIsStationChangesSaved(true);
    } else if (addedStationsBoms.length > 0) {
      handleAddedEntities();
    }
  }

  onResize = (event, { element, size, handle }) => {
    this.setState({ width: size.width, height: size.height });
  };

  onDragStop = (e, position) => {
    const { x, y } = position;
    this.setState({ x, y });
  };

  render() {
    const {
      collapseElementsState,
      openBOMModal,
      bomModalTitle,
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
      isItemWithAnnotation,
      openedStation,
      handleBOMAction,
    } = this.props;

    const parsedBOMs = createBOMsWithChildsAndParent(boms);
    const bomTopLevelElements = sortBy(boms.filter(item => item.parentId === null), 'number');
    const enableAddBoms = openedStation.length > 0;

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
              <div key={bom.id}>
                <MainCollapseListItem withoutChildItem={!isItemWithChild}>
                  <IsCheckedItemIcon isHidden={!isBomDeleted(bom.id, checkedBoms)} />
                  {isItemWithChild && (collapseElementsState[bom.id]
                    ? <CloseCollapseIcon onClick={() => this.toggleCloseCollapse(bom.id, parsedBOMs)} />
                    : <OpenCollapseIcon onClick={() => this.toggleOpenCollapse(bom.id)} />)}
                  <ItemText
                    isChecked={!isBomDeleted(bom.id, checkedBoms)}
                    primary={`${bom.number} - ${bom?.part?.number} - ${bom.title}`}
                    onClick={() => (enableAddBoms && !isBomDeleted(bom.id, checkedBoms))
                      && handleBOMAction(bom.id, !isBomDeleted(bom.id, checkedBoms))}
                    // enableAddBoms &&
                  />
                  {isItemWithChild && isItemWithAnnotation
                    ? (some(checkedBoms
                      .filter(bom => !bom.isCheckedForStation)
                      .filter(item => item.parentId === bom.id), 'annotation') && !isBomDeleted(bom.id, checkedBoms)
                      ? (
                        <AnnotatedBOMNoteWrapper
                          onClick={() => !isBomDeleted(bom.id, checkedBoms)
                          && this.toggleBOMModal(bom.title, bom.id)}
                        >
                          <img alt="noteIcon" src={NoteIcon} />
                        </AnnotatedBOMNoteWrapper>
                      )
                      : (
                        <BOMNoteWrapper
                          backgroundColor={!isBomDeleted(bom.id, checkedBoms)}
                          onClick={() => !isBomDeleted(bom.id, checkedBoms)
                          && this.toggleBOMModal(bom.title, bom.id)}
                        >
                          <img alt="noteIcon" src={NoteIcon} />
                        </BOMNoteWrapper>
                      ))
                    : null}
                  {(!isBomDeleted(bom.id, checkedBoms)
                    ? <RemoveItem onClick={() => handleBOMAction(bom.id, true)} />
                    : <AddBOM onClick={() => handleBOMAction(bom.id, false)} />)}
                </MainCollapseListItem>
                {makeRecursiveBOMComponent(
                  bom,
                  collapseElementsState,
                  this.toggleCloseCollapse,
                  this.toggleOpenCollapse,
                  handleBOMAction,
                  this.toggleBOMModal,
                  checkedBoms,
                  parsedBOMs,
                  15,
                  isItemWithAnnotation,
                  enableAddBoms,
                )}
              </div>
            );
          })}
        </BOMList>
        <BOMTableDialog
          open={openBOMModal}
          openAnnotationModal={openAnnotationModal}
          buttonName="ANNOTATE"
          onClose={this.toggleBOMModal}
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
