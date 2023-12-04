import differenceBy from 'lodash/differenceBy';
import intersectionBy from 'lodash/intersectionBy';
import sortBy from 'lodash/sortBy';
import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators, compose } from 'redux';

import {
  addDrawingsToStaton,
} from '../../../../../../actions/drawings';
import {
  getLineJobRevisionNotifications,
  markNotificationsAsSupervisor,
} from '../../../../../../actions/issueRevision';
import {
  addDocumentsToStaton,
  getLineJobDocuments,
  getLineJobDrawings,
} from '../../../../../../actions/jobDetails';
import MultipleSelect from '../../../../../../components/MultipleSelect';
import { MULTI_SELECT_GROUP_TYPES } from '../../../../../../constants';
import {
  MultiSelectListsWrapper,
} from './styledComponents';

class MultiSelectGroup extends Component {

  componentDidMount = () => {
    const { getLineJobDocuments, getLineJobDrawings, match } = this.props;
    getLineJobDocuments(match.params.jobId);
    getLineJobDrawings(match.params.jobId);
  }

  addInstance = (items, checkedFileId) => {
    const {
      addDocumentsToStaton,
      addDrawingsToStaton,
      handleAddedEntities,
      dropdownDocuments,
      dropdownDrawings,
      openedStation,
      multiSelectType,
    } = this.props;
    const dropdownArrayInstance = multiSelectType === MULTI_SELECT_GROUP_TYPES.DOC
      ? dropdownDocuments
      : dropdownDrawings;
    const addedDocuments = items.filter(item => item.isChecked).map(item => item.value);
    const isIncluded = addedDocuments.some(doc => doc.id === checkedFileId);
    if ((!!openedStation) && !isIncluded) {
      const updatedList = sortBy(dropdownArrayInstance.map((doc, i) => (doc.id === checkedFileId
        ? { ...doc, isChecked: !doc.isChecked, addedPosition: +moment() }
        : doc)), 'addedPosition');
      multiSelectType === MULTI_SELECT_GROUP_TYPES.DOC
        ? addDocumentsToStaton({
          stationDocuments: updatedList,
          id: dropdownArrayInstance.find(doc => doc.id === checkedFileId).id,
        })
        : addDrawingsToStaton({
          stationDrawings: updatedList,
          id: dropdownArrayInstance.find(doc => doc.id === checkedFileId).id,
        });
      handleAddedEntities();
    }
  }

  render() {
    const {
      dropdownDocuments,
      dropdownDrawings,
      lineJobStationsDocuments,
      lineJobStationsDrawings,
      openedStation,
      multiSelectType,
      notifications,
      notificationType,
      markNotificationsAsSupervisor,
      getLineJobRevisionNotifications,
      isDataLoading
    } = this.props;
    const dropdownArrayInstance = multiSelectType === MULTI_SELECT_GROUP_TYPES.DOC
      ? dropdownDocuments
      : dropdownDrawings;
    const lineJobStationsArrayInstance = multiSelectType === MULTI_SELECT_GROUP_TYPES.DOC
      ? lineJobStationsDocuments
      : lineJobStationsDrawings.map(item => ({ ...item, fileName: item.fileName || item.drawing.fileName }));
    const sameArray = intersectionBy(dropdownArrayInstance, lineJobStationsArrayInstance, 'fileName');
    const differenceArray = differenceBy(dropdownArrayInstance, lineJobStationsArrayInstance, 'fileName');
    const items = sameArray.length && openedStation
      ? sortBy([...sameArray.map(doc => ({ ...doc, isChecked: true })), ...differenceArray], 'fileName')
      : dropdownArrayInstance;
    return (
      <MultiSelectListsWrapper>
        <MultipleSelect
          isDataLoading={isDataLoading}
          onChange={this.addInstance}
          displayEmpty
          items={items}
          placeholder={multiSelectType}
          notifications={notifications}
          notificationType={notificationType}
          markNotifications={markNotificationsAsSupervisor}
          updateNotifications={getLineJobRevisionNotifications}
        />
      </MultiSelectListsWrapper>
    );
  }
}

const mapStateToProps = state => ({
  documents: state.jobDetails.documents,
  drawings: state.jobDetails.drawings,
  stationDocuments: state.jobDetails.stationDocuments,
  dropdownDocuments: state.jobDetails.dropdownDocuments,
  stationDrawings: state.jobDetails.stationDrawings,
  dropdownDrawings: state.jobDetails.dropdownDrawings,
  lineJobStationsDocuments: state.supervisorJobDetails.lineJobStationsDocuments,
  lineJobStationsDrawings: state.drawings.lineJobStationsDrawings,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getLineJobDocuments,
  addDocumentsToStaton,
  addDrawingsToStaton,
  getLineJobDrawings,
  markNotificationsAsSupervisor,
  getLineJobRevisionNotifications,
}, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withRouter,
)(MultiSelectGroup);
