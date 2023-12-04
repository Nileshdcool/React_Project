import sortBy from 'lodash/sortBy';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import {
  clearRevisionNotifications,
  getOperatorRevisionNotifications,
  getStationRevisedElementTypes,
  markNotificationsAsOperator, setLineJobStationDeletedNotification,
  updateStationNotificationsList,
  viewNotificationsModalAsOperator,
} from '../../../actions/issueRevision';
import {
  clearOperatorData,
  getLineJobNotesOperatorView,
  getLineJobStationKPI,
  getOperatorDrawings,
  getOperatorSidebarData, getOperatorStationBoms,
  getOperatorStationDocuments,
  getOperatorTasks,
  getOperatorUnitChecks,
  lastOpenedDrawing,
  showOperatorAnnotations
} from "../../../actions/operator";
import { getLineJobStationITPs } from '../../../actions/supervisorITPs';
import { getLineJobStationVDRs } from '../../../actions/supervisorVDRs';
import Loader from '../../../components/Loader/Loader';
import IssueRevisionInfo from '../../../components/ModalDialog/IssueRevision/IssueRevisionInfo';
import {
  DELETED_STATION_NOTIFICATION_MESSAGE,
  OPERATOR_MATERIALS_ITEMS
} from '../../../constants';
import {
  selectIsStationsWasDeletedNotification,
  selectOperatorModalNotifications,
  selectOperatorNotifications,
  selectStationNotificationsTypes,
} from '../../../selectors/issueRevision';
import {
  selectOperatorDrawings,
  selectOperatorShowedAnnotations,
  selectOperatorSidebarData,
  selectStationBOMs,
  selectStationDocuments,
  selectStationITPs,
  selectStationNotes,
  selectStationTopLevelBOMs,
  selectStationVDRs,
} from '../../../selectors/operatorSelectors';
import { BomModal } from './components/BomModal';
import DrawerSidebar from './components/DrawerSidebar/DrawerSidebar';
import { MaterialsPopup } from './components/MaterialsPopup';
import {
  OperatorContentWrapper,
  OperatorViewWrapper,
} from './styledComponents';
import { withRouter } from "react-router";
import { MaterialsItemsRowWrapper, MaterialsWrapper } from "./components/styledComponents";

const OperatorLayout = ({
  getOperatorDrawings,
  drawings,
  match,
  getLineJobStationVDRs,
  getLineJobStationITPs,
  getOperatorTasks,
  getOperatorStationBoms,
  vdrs,
  itps,
  topLevelBOMs,
  stationBoms,
  getOperatorSidebarData,
  getLineJobNotesOperatorView,
  getLineJobStationDocuments,
  notes,
  getOperatorStationDocuments,
  documents,
  operatorSidebarData,
  getLineJobStationKPI,
  getOperatorUnitChecks,
  getOperatorRevisionNotifications,
  getStationRevisedElementTypes,
  updateStationNotificationsList,
  viewNotificationsModalAsOperator,
  modalNotifications,
  notifications,
  markNotificationsAsOperator,
  deletedStationData,
  setLineJobStationDeletedNotification,
  clearOperatorData
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(match && true);
  const [openedBomModalData, setOpenedBomModalData] = useState(null);
  const [openAnnotationModalData, setOpenAnnotationModalData] = useState(null);

  const [materialsItems, setMaterialsItems] = useState({
    drawings: [],
    documents: [],
    itps: [],
    boms: [],
    vdrs: [],
    notes: [],
  });

  const getPageData = () => {
    setIsLoading(true);
    getOperatorSidebarData(match.params.stationId)
      .then(response => {
        if (!response || !response.data) {
          return;
        }
        const { id, lineJobId } = response.data;
        getLineJobStationVDRs(id);
        getLineJobStationITPs(id);
        getOperatorStationBoms(id);
        getOperatorStationDocuments(id);
        getOperatorUnitChecks(id);
        getLineJobNotesOperatorView(lineJobId);
        getOperatorDrawings(id);
        getLineJobStationKPI(id);
        getOperatorTasks(id);
        getOperatorRevisionNotifications(id);
        getStationRevisedElementTypes();
      }).then(() => setIsLoading(false));
  };

  useEffect(() => {
    if (match && match.params.stationId) {getPageData()}
  }, [
    getLineJobStationITPs,
    getLineJobStationVDRs,
    getOperatorStationBoms,
    getOperatorDrawings,
    getOperatorTasks,
    match,
    getOperatorSidebarData,
    getLineJobNotesOperatorView,
    getLineJobStationDocuments,
    getOperatorStationDocuments,
    getLineJobStationKPI,
    getOperatorUnitChecks,
    getOperatorRevisionNotifications,
    getStationRevisedElementTypes,
  ]);

  useEffect(() => {
    const menuBoms = sortBy(topLevelBOMs, 'number').map(item => ({
      name: `${item.number} - ${item.title}`,
      bom: item,
    }));

    setMaterialsItems({
      ...materialsItems,
      drawings,
      itps,
      vdrs,
      boms: menuBoms,
      notes,
      documents,
    });
    // eslint-disable-next-line
  }, [itps, vdrs, topLevelBOMs, notes, documents, drawings]);

  useEffect(() => {
    clearRevisionNotifications();
    return () => {
      clearOperatorData();
    }
  }, []);

  const confirmModalByOperator = async (items) => {
    const viewedItemsIDs = items.map(item => item.id);
    const filteredAlertNotifications = modalNotifications.map(item =>
      item.filter(item => !viewedItemsIDs.includes(item.id)));
    await viewNotificationsModalAsOperator(viewedItemsIDs).then(() => getPageData()).then(() =>
      getOperatorSidebarData(match.params.stationId)
        .then(response => {
          if (!response.data) {
            return;
          }
          const { id } = response.data;
          getOperatorRevisionNotifications(id);
        }));
    updateStationNotificationsList(filteredAlertNotifications.flat());
  };

  const confirmDeletedStationModal = () => {
    setLineJobStationDeletedNotification({ name: null });
      clearOperatorData();
      window.location.reload();
  };

  const handleDrawerButton = () => {
    setOpenDrawer(openDrawer => !openDrawer);
  };

  const onMaterialMenuItemClick = (item, widgetId) => {
    switch (widgetId) {
      case 'itps':
        // setAnchorRef(null);
        window.open(item.url);
        markAsRead(item);
        break;
      // case 'drawings':
      //   window.open(`file://${item.drawing.fileUrl}`, '_blank');
      //   markAsRead(item);
      //   break;
      case 'boms':
        toggleBOMModal(item.bom.title, item.bom.id);
        break;
      // case 'documents':
      //   window.open(`file://${item.fileUrl}`, '_blank');
      //   markAsRead(item);
      //   break;
      default:
        return '';
    }
  };

  const toggleBOMModal = (title, id) => {
    if (title) {
      setOpenedBomModalData({
        bomModalTitle: title && title.target ? '' : title,
        bomModalId: id,
      });
    } else {
      setOpenedBomModalData(null);
    }
  };

  const toggleAnnotationModal = (bom, isDisabled) => {
    if (bom && bom.id) {
      const foundedBom = stationBoms.find(item => item.id === bom.id);
      setOpenAnnotationModalData({
        selectedValue: foundedBom.number,
        annotationText: foundedBom.annotation,
        isDisabled,
      });
    } else {
      setOpenAnnotationModalData(null);
    }
  };

  const markAsRead = async (item, isVDRsBOMsNotes) => {
    let readIds;
    if (isVDRsBOMsNotes) {
      readIds = notifications.filter(notification =>
        notification.revisedElementType.name === item.name).map(item => item.id);
    } else {
      readIds = [notifications.find(notification => notification.revisedElementId === item.id)?.id];
    }
    await markNotificationsAsOperator({ items: readIds });
    getOperatorSidebarData(match.params.stationId)
      .then(response => {
        const { id } = response.data;
        getOperatorRevisionNotifications(id);
      });
  };

  return (
    <OperatorViewWrapper>
      <DrawerSidebar
        handleDrawerButton={handleDrawerButton}
        open={openDrawer}
      />
      <OperatorContentWrapper isOpenDrawer={openDrawer}>
        <MaterialsWrapper>
          <MaterialsItemsRowWrapper>
            {OPERATOR_MATERIALS_ITEMS.firstLine.map((item) => <MaterialsPopup
              key={item.name}
              widgetId={item.id}
              title={item.name}
              icon={item.icon}
              items={console.log("materialsItems <<<< ====", materialsItems) || materialsItems[item.id]}
              notifications={notifications}
              onClick={onMaterialMenuItemClick}
            />)}
          </MaterialsItemsRowWrapper>
          <MaterialsItemsRowWrapper>
            {OPERATOR_MATERIALS_ITEMS.secondLine.map((item) => <MaterialsPopup
              key={item.name}
              widgetId={item.id}
              title={item.name}
              icon={item.icon}
              items={materialsItems[item.id]}
              isNotesModal={item.id === 'notes' || item.id === 'vdrs'}
              notifications={notifications}
              onClick={onMaterialMenuItemClick}
            />)}
          </MaterialsItemsRowWrapper>
        </MaterialsWrapper>
        <BomModal
          openBOMModal={!!openedBomModalData}
          openAnnotationModalData={openAnnotationModalData}
          toggleAnnotationModal={toggleAnnotationModal}
          allBoms={stationBoms}
          closeBomModal={() => toggleBOMModal(null)}
          bomModalData={openedBomModalData}
        />
      </OperatorContentWrapper>
      <Loader open={isLoading} />
      {modalNotifications.length > 0 && (
        <IssueRevisionInfo
          open
          workOrder={operatorSidebarData && operatorSidebarData.workOrder.number}
          modalNotification={modalNotifications[0]}
          onClickConfirm={() => confirmModalByOperator(modalNotifications[0])}
        />
      )}
      {
        !!deletedStationData
        && deletedStationData.stationId === match.params.stationId
        && (
        <IssueRevisionInfo
          open
          isDisableSubtitle={deletedStationData.action !== 'deleted'}
          isStationActionsNotification={!!deletedStationData}
          workOrder={deletedStationData.workOrder}
          modalNotification={DELETED_STATION_NOTIFICATION_MESSAGE[deletedStationData.action]}
          onClickConfirm={() => confirmDeletedStationModal()}
        />
        )
}
    </OperatorViewWrapper>
  );
};
const mapStateToProps = createStructuredSelector({
  vdrs: selectStationVDRs(),
  itps: selectStationITPs(),
  drawings: selectOperatorDrawings(),
  isShowed: selectOperatorShowedAnnotations(),
  topLevelBOMs: selectStationTopLevelBOMs(),
  stationBoms: selectStationBOMs(),
  notes: selectStationNotes(),
  documents: selectStationDocuments(),
  operatorSidebarData: selectOperatorSidebarData(),
  notifications: selectOperatorNotifications(),
  modalNotifications: selectOperatorModalNotifications(),
  stationNotificationsTypes: selectStationNotificationsTypes(),
  deletedStationData: selectIsStationsWasDeletedNotification(),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getOperatorDrawings,
  getLineJobStationVDRs,
  getLineJobStationITPs,
  showOperatorAnnotations,
  getOperatorTasks,
  getOperatorStationBoms,
  getOperatorSidebarData,
  getLineJobNotesOperatorView,
  getOperatorStationDocuments,
  getLineJobStationKPI,
  lastOpenedDrawing,
  getOperatorUnitChecks,
  getOperatorRevisionNotifications,
  getStationRevisedElementTypes,
  viewNotificationsModalAsOperator,
  updateStationNotificationsList,
  markNotificationsAsOperator,
  clearRevisionNotifications,
  setLineJobStationDeletedNotification,
  clearOperatorData,
}, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withRouter,
)(OperatorLayout);
