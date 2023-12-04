import { isEmpty } from 'lodash';
import some from 'lodash/some';
import sortBy from 'lodash/sortBy';
import React, { Component } from 'react';

import { BOMsActionsRow } from '../../../../../../../../../components/BOMsCollapseExpandActions/BOMsCollapseExpandActions';
import BOMTableDialog from '../../../../../../../../../components/ModalDialog/BOMTableDialog';
import NoteIcon from '../../../../../../../../../img/iconNotes.svg';
import { createBOMsWithChildsAndParent } from '../../../../../../../../../utils/boms';
import { areEqual } from '../DropDownBoms/utils';
import {
  AnnotatedBOMNoteWrapper,
  BOMList,
  BOMNoteWrapper, BOMsWidgetContentWrapper,
  CloseCollapseIcon,
  ItemText,
  MainCollapseListItem,
  OpenCollapseIcon,
} from './styledComponents';
import {
  isBomDeleted,
  isBomsWereChange,
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
    isAnnotationSavedChanges: true,
  };

  toggleCloseCollapse = (id, parsedBOMs) => {
    const { collapseElementsState } = this.state;
    const foundedBOMCollapse = parsedBOMs.find(bom => bom.id === id);

    const closeChildsCollapse = (bomItem) => {
      collapseElementsState[bomItem.id] = false;
      if (bomItem.children) {
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

  toggleBOMModal = (title, id, bomClicked) => {
    const { checkedBoms } = this.props;
    const { openBOMModal } = this.state;

    if (!openBOMModal) {
      this.setState({
        x: 0, y: 0, width: 1340, height: 400,
      });
    }
    this.setState({
      openBOMModal: !openBOMModal,
      bomPartNumber: bomClicked?.part?.number,
      bomModalTitle: title && title.target ? '' : title,
      bomModalId: id,
      selectedValue: id && checkedBoms
        .filter(bom => bom.isCheckedForStation)
        .filter(bom => bom.parentId === id)[0] && sortBy(checkedBoms
        .filter(bom => bom.isCheckedForStation)
        .filter(bom => bom.parentId === id), 'number')[0].id,
      annotationText: id && checkedBoms
        .filter(bom => bom.isCheckedForStation)
        .filter(bom => bom.parentId === id)[0] && sortBy(checkedBoms
        .filter(bom => bom.isCheckedForStation)
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

  componentDidUpdate(prevProps) {
    const { collapseElementsState } = this.state;
    const { boms } = this.props;
    const isBOMsChange = boms.length !== (prevProps.boms
      && prevProps.boms.length);
    if (isBOMsChange) {
      const bomsIds = boms.map(item => item.id);
      bomsIds.forEach(id => {
        collapseElementsState[id] = true;
        this.setState({ collapseElementsState });
      });
    }
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

  toggleAnnotationModal = (bom, isDisabled) => {
    const { checkedBoms } = this.props;
    const { openAnnotationModal } = this.state;

    if (bom && bom.id) {
      this.setState({
        openAnnotationModal: !openAnnotationModal,
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
    const { bomModalId, annotation } = this.state;
    if (e.target.id) {
      this.setState({
        selectedValue: e.target.id,
        annotationText: e.target.id ? sortBy(checkedBoms
          .filter(bom => bom.isCheckedForStation)
          .filter(bom => bom.parentId === bomModalId), 'number')
          .find(item => item.id === e.target.id).annotation : annotation,
      });
    }
  }

  onChangeAnnotation = (e) => {
    this.setState({ annotationText: e.target.value, isAnnotationSavedChanges: false });
  };

  onDiscardAnnotation = bomId => {
    const {
      boms,
    } = this.props;
    this.setState({
      annotationText: boms.find(item => item.id === bomId).annotation,
      isAnnotationSavedChanges: true,
    });
  }

  saveAnnotation = () => {
    const {
      updateBoms,
      checkedBoms,
      boms,
      setIsStationChangesSaved,
      handleAddedEntities,
      addedStationsBoms,
      isStationDataSavedChanges,
      lineJobStations,
      openedStation,
      addToStation,
    } = this.props;
    const { selectedValue, annotationText } = this.state;
    const updatedBOMs = checkedBoms.map(item =>
      (selectedValue === item.id ? { ...item, annotation: annotationText } : item));
    // this.setState({ annotationText: '' });

    const bomsForStation = updatedBOMs.filter(item => item.isCheckedForStation);

    updateBoms(updatedBOMs);
    const openedStationId = lineJobStations.find(item => item.name === openedStation);

    const stationBOMsData = bomsForStation.map(item => (
      {
        lineJobStationId: openedStationId && openedStationId.id,
        lineJobBomId: item.id,
        bom: item,
        annotation: annotationText,
      }
    ));

    addToStation(stationBOMsData);

    if (annotationText !== checkedBoms.find(item => item.id === selectedValue).annotation
      || !isStationDataSavedChanges) {
      handleAddedEntities();
    }
    if (annotationText === boms.find(item => item.id === selectedValue).annotation
      && addedStationsBoms === 0
    ) {
      setIsStationChangesSaved(true);
    }

    this.setState({ annotationText: '', isAnnotationSavedChanges: true });
  }

  removeAnnotation = () => {
    const {
      updateBoms,
      checkedBoms,
      isStationDataSavedChanges,
      handleAddedEntities,
      lineJobStations,
      openedStation,
      addToStation,
      initialStationBOMs,
      setIsStationChangesSaved,
    } = this.props;
    const { selectedValue } = this.state;

    const updatedBOMs = checkedBoms.map(item =>
      (selectedValue === item.id ? { ...item, annotation: null } : item));

    const bomsForStation = updatedBOMs.filter(item => item.isCheckedForStation);
    updateBoms(updatedBOMs);
    const openedStationId = lineJobStations.find(item => item.name === openedStation);

    const stationBOMsData = bomsForStation.map(item => (
      {
        lineJobStationId: openedStationId.id,
        lineJobBomId: item.id,
        bom: item,
        annotation: null,
      }
    ));

    addToStation(stationBOMsData);

    this.setState({ selectedValue: '', annotationText: '' });

    const selectedInitialAnnotationBom = initialStationBOMs.find(item => item.bom.id === selectedValue);
    const isBOMWithoutSavedAnnotation = selectedInitialAnnotationBom && selectedInitialAnnotationBom.bom.annotation === null;

    if (isBOMWithoutSavedAnnotation && !isStationDataSavedChanges) {
      setIsStationChangesSaved(true);
    } else {
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

  handleBOMAction = (id, isCheckedForStation) => {
    const {
      updateBoms,
      checkedBoms,
      boms,
      setIsStationChangesSaved,
      handleAddedEntities,
      openedStation,
      addToStation,
      lineJobStations,
      initialStationBOMs,
    } = this.props;

    const parsedBOMs = createBOMsWithChildsAndParent(boms);

    const foundedToggledBOM = parsedBOMs.find(bom => bom.id === id);
    const handledBOMsIds = [];
    let temporaryBOMS = [];

    const setHandledBOMsToTemporary = (bom) => {
      if (handledBOMsIds.includes(bom.id) === false) {
        handledBOMsIds.push(bom.id);

        temporaryBOMS = checkedBoms.map(item =>
          (handledBOMsIds.indexOf(item.id) >= 0 ? { ...item, isCheckedForStation } : item));
      }
    };

    const updateBOMsStatus = (bomItem) => {
      setHandledBOMsToTemporary(bomItem);

      const foundedBOMInTemporary = bomItem.parentId !== null
        && temporaryBOMS.find(bom => bom.id === bomItem.parentId);
      const parentIsChangedStatus = isCheckedForStation === foundedBOMInTemporary.isCheckedForStation;

      if (bomItem.parentId !== null && !parentIsChangedStatus) {
        const foundedParentBOM = parsedBOMs.find(item => item.id === bomItem.parentId);
        if (isCheckedForStation) {
          setHandledBOMsToTemporary(foundedParentBOM);
        }

        if (foundedParentBOM.children.length > 1) {
          const parentChildrenStatuses = foundedParentBOM.children
            .map(bom => (!!temporaryBOMS.find(item => item.id === bom.id).isCheckedForStation).toString());
          const isStatusesAreEqual = areEqual(parentChildrenStatuses);

          if (isStatusesAreEqual && foundedParentBOM.parentId) {
            updateBOMsStatus(foundedParentBOM);
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
          if (foundedChildBOM && foundedChildBOM.children) {
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
      (handledBOMsIds.indexOf(item.id) >= 0 ? { ...item, isCheckedForStation } : item));

    const bomsForStation = updatedBOMs.filter(item => item.isCheckedForStation);

    updateBoms(updatedBOMs);
    const openedStationId = lineJobStations.find(item => item.name === openedStation);

    const stationBOMsData = bomsForStation.map(item => (
      {
        lineJobStationId: openedStationId.id,
        lineJobBomId: item.id,
        bom: item,
      }
    ));

    addToStation(stationBOMsData);
    if (isBomsWereChange(initialStationBOMs, stationBOMsData)) {
      handleAddedEntities();
    } else {
      setIsStationChangesSaved(true);
    }
  }

  deleteWidgetBOM = (id) => {
    this.handleBOMAction(id, false);
  }

  render() {
    const {
      collapseElementsState,
      openBOMModal,
      bomPartNumber,
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
      isAnnotationSavedChanges,
    } = this.state;
    const {
      boms,
      checkedBoms,
      initialStationBOMs,
      selectBOM,
      selectedBomData,
    } = this.props;
    const parsedBOMs = createBOMsWithChildsAndParent(boms);

    const bomTopLevelElements = sortBy(boms.filter(item => item.parentId === null), 'number');

    const selectedAnnotationBom = initialStationBOMs.find(item => item.bom.id === selectedValue);
    const isAnnotationNotChange = (isAnnotationSavedChanges || annotationText === '')
      && selectedAnnotationBom
      && selectedAnnotationBom.bom.annotation === null;
    const savedChangesInAnnotations = selectedAnnotationBom
      && (selectedAnnotationBom.bom.annotation === annotationText || isAnnotationNotChange);

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
                <MainCollapseListItem
                  isSelectedBom={selectedBomData && selectedBomData.id === bom.id}
                  withoutChildItem={!isItemWithChild}
                >
                  {isItemWithChild && (collapseElementsState[bom.id]
                    ? <CloseCollapseIcon onClick={() => this.toggleCloseCollapse(bom.id, parsedBOMs)} />
                    : <OpenCollapseIcon onClick={() => this.toggleOpenCollapse(bom.id)} />)}
                  <ItemText
                    primary={`${bom.number} - ${bom?.part?.number} - ${bom.title}`}
                    onClick={() =>
                      selectBOM(bom.id, !isBomDeleted(bom.id, checkedBoms))}
                  />
                  {isItemWithChild
                    ? (some(checkedBoms
                      .filter(bom => bom.isCheckedForStation)
                      .filter(item => item.parentId === bom.id), 'annotation')
                    && isBomDeleted(bom.id, checkedBoms)
                      ? (
                        <AnnotatedBOMNoteWrapper
                          onClick={() => isBomDeleted(bom.id, checkedBoms)
                            && this.toggleBOMModal(bom.title, bom.id, bom)}
                        >
                          <img alt="noteIcon" src={NoteIcon} />
                        </AnnotatedBOMNoteWrapper>
                      )
                      : (
                        <BOMNoteWrapper
                          backgroundColor={isBomDeleted(bom.id, checkedBoms)}
                          onClick={() => isBomDeleted(bom.id, checkedBoms)
                            && this.toggleBOMModal(bom.title, bom.id, bom)}
                        >
                          <img alt="noteIcon" src={NoteIcon} />
                        </BOMNoteWrapper>
                      ))
                    : null}
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
                  15,
                  selectBOM,
                  selectedBomData,
                )}
              </div>
            );
          })}
        </BOMList>
        <BOMTableDialog
          open={openBOMModal}
          isSupervisorTable
          openAnnotationModal={openAnnotationModal}
          buttonName="ANNOTATE"
          onClose={this.toggleBOMModal}
          bomModalId={bomModalId}
          bomPartNumber={bomPartNumber}
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
