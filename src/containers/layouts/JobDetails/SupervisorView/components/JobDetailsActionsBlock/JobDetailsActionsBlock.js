import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators, compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { getLineJobStationDrawings } from '../../../../../../actions/drawings';
import { applyTemplate, getTemplates, onDeleteTemplate } from '../../../../../../actions/jobDetailsTemplates';
import {
  getLineJobStationITPsWithoutSettingToRedux,
  setIsStationHasITPs,
} from '../../../../../../actions/supervisorITPs';
import {
  clearLineJobStationsData,
  clearLineJobStationsWidgetsData,
  getDrawingsLineJobID,
  getLineJobID,
  getLineJobStationBOMs,
  getLineJobStationDocuments,
  getLineJobStations,
  getLineJobStationsWithDetails,
  getLineJobStationTasks,
  getLineJobTasks,
  getLineStations,
  setBOMsToStation,
  setLineJobStationTasks,
} from '../../../../../../actions/supervisorJobDetails';
import {
  getLineJobStationVDRsWithoutSettingToRedux,
  setIsStationHasVDRs,
} from '../../../../../../actions/supervisorVDRs';
import {
  clearUnitChecks,
  getLineJobStationUnitChecksWithoutSettingToRedux, getLineUnitChecks,
  setIsStationHasUnitChecks,
} from '../../../../../../actions/unitChecks';
import ContainedButton from '../../../../../../components/Buttons/ContainedButton';
import ModalDialog from '../../../../../../components/ModalDialog';
import {
  APPLY_TEMPLATE_MODAL_HEADER,
  APPLY_TEMPLATE_MODAL_TEXT,
  BUTTONS_TEXT,
  BUTTONS_TOOLTIPS, DELETE_TEMPLATE_MODAL_HEADER, DELETE_TEMPLATE_MODAL_TEXT,
} from '../../../../../../constants';
import {
  LeftButtonsGroup, MainActionsWrapper, TemplateSelector,
} from '../../styledComponents';
import DropDownSelectTemplates from '../DropDownSelect/DropDownSelectTemplate';
import { JobDetailsActionsBlockWrapper } from '../styledComponents';

const initialTemplateSelect = { id: '', templateName: 'SELECT TEMPLATE' };

const JobDetailsActionsBlock = ({
  match,
  addNewStation,
  isStationChangesSaved,
  applyTemplate,
  onDeleteTemplate,
  selectedLine,
  getLineStations,
  getLineJobStations,
  getLineJobStationsWithDetails,
  getLineJobStationDocuments,
  getLineJobID,
  getLineJobStationDrawings,
  getDrawingsLineJobID,
  getLineJobStationUnitChecksWithoutSettingToRedux,
  setIsStationHasUnitChecks,
  getLineJobStationVDRsWithoutSettingToRedux,
  setIsStationHasVDRs,
  getLineJobStationITPsWithoutSettingToRedux,
  setIsStationHasITPs,
  getLineJobStationTasks,
  setLineJobStationTasks,
  getLineJobStationBOMs,
  setBOMsToStation,
  getLineJobTasks,
  getLineUnitChecks,
  clearLineJobStationsWidgetsData,
  clearUnitChecks,
  clearLineJobStationsData,
  closeOpenedStation,
  getTemplates,
}) => {
  const [createNewTemplateModal, setCreateNewTemplateModal] = React.useState(false);
  const [templateAction, setTemplateAction] = React.useState(null);
  const [selectedTemplate, setSelectedTemplate] = React.useState(initialTemplateSelect);

  const onSelectTemplate = (e) => {
    const newChoosedTemplateValue = e.target.attributes.value && e.target.attributes.value.value;
    if (newChoosedTemplateValue && selectedTemplate !== newChoosedTemplateValue) {
      setSelectedTemplate({ id: newChoosedTemplateValue, templateName: e.target.innerText });
    }
  };

  const deleteTemplate = async () => {
    const selectedLineId = localStorage.getItem('SELECTED_LINEJOBS');
    const lineJobId = match.params.jobId;
    const body = {
      lineJobId: selectedTemplate.id,
    };
    await onDeleteTemplate(lineJobId, body).then(() => {
      getTemplates(selectedLineId);
      setTemplateAction(null);
      setSelectedTemplate(initialTemplateSelect);
    });
  };

  const onApplyTemplate = () => {
    const body = {
      lineJobId: match.params.jobId,
      templateId: selectedTemplate.id,
    };
    closeOpenedStation();
    applyTemplate(match.params.jobId, selectedTemplate.id, body).then(() => {
      clearLineJobStationsWidgetsData();
      clearLineJobStationsData();
      clearUnitChecks();
      Promise.all([
        getLineStations(selectedLine),
        getLineJobStationsWithDetails(match.params.jobId),
        // getLineJobStations(match.params.jobId)
        //   .then(response => response && response.data
        //     .forEach(station => {
        //       getLineJobStationDocuments(station.id)
        //         .then(response => response && getLineJobID(response.data, station.id));
        //       getLineJobStationDrawings(station.id)
        //         .then(response => response && getDrawingsLineJobID(response.data, station.id));
        //       getLineJobStationUnitChecksWithoutSettingToRedux(station.id)
        //         .then(response => response
        //           && setIsStationHasUnitChecks(response.data.length > 1, station.id));
        //       getLineJobStationVDRsWithoutSettingToRedux(station.id)
        //         .then(response => response
        //           && setIsStationHasVDRs(response.data.length > 0, station.id));
        //       getLineJobStationITPsWithoutSettingToRedux(station.id)
        //         .then(response => response
        //           && setIsStationHasITPs(response.data.length > 0, station.id));
        //       getLineJobStationTasks(station.id)
        //         .then(response => response && setLineJobStationTasks(response.data, station.id));
        //       getLineJobStationBOMs(station.id)
        //         .then(response => response && setBOMsToStation(response.data));
        //     })),
        getLineJobTasks(match.params.jobId),
        getLineUnitChecks(match.params.jobId),
      ]);
      setTemplateAction(null);
    });
  };

  return (
    <JobDetailsActionsBlockWrapper>
      <TemplateSelector>
        <DropDownSelectTemplates
          value="TEMPLATE"
          displayEmpty
          variant="outlined"
          lineJobId={match.params.jobId}
          createNewTemplateModal={createNewTemplateModal}
          closeCreateTemplateModal={() => setCreateNewTemplateModal(false)}
          onChange={onSelectTemplate}
          selectedTemplate={selectedTemplate.templateName}
        />
      </TemplateSelector>
      <MainActionsWrapper>
        <LeftButtonsGroup>
          <ContainedButton
            variant="contained"
            color="primary"
            colorType="classic"
            text={BUTTONS_TEXT.applyTemplate}
            disabled={!selectedTemplate.id.length}
            onClick={() => setTemplateAction('apply')}
          />
          <ContainedButton
            variant="contained"
            color="primary"
            colorType="red"
            text={BUTTONS_TEXT.deleteTemplate}
            disabled={!selectedTemplate.id.length}
            onClick={() => setTemplateAction('delete')}
          />
          <Tooltip
            disableHoverListener={isStationChangesSaved}
            title={BUTTONS_TOOLTIPS.createNewTemplate}
            placement="top"
          >
            <div>
              <ContainedButton
                variant="contained"
                color="secondary"
                colorType="gray"
                disabled={!isStationChangesSaved}
                text={BUTTONS_TEXT.createNewTemplate}
                onClick={() => setCreateNewTemplateModal(true)}
              />
            </div>
          </Tooltip>
        </LeftButtonsGroup>
        <ContainedButton
          variant="contained"
          color="primary"
          colorType="classic"
          text={BUTTONS_TEXT.addStation}
          onClick={addNewStation}
        />
      </MainActionsWrapper>

      <ModalDialog
        open={templateAction}
        buttonsNames={{
          confirmButtonText: templateAction === 'apply' ? BUTTONS_TEXT.apply : BUTTONS_TEXT.delete,
          cancelButtonText: BUTTONS_TEXT.cancel,
        }}
        headerText={templateAction === 'apply' ? APPLY_TEMPLATE_MODAL_HEADER : DELETE_TEMPLATE_MODAL_HEADER}
        bodyText={templateAction === 'apply' ? APPLY_TEMPLATE_MODAL_TEXT : DELETE_TEMPLATE_MODAL_TEXT}
        onClickCancel={() => setTemplateAction(null)}
        onClickConfirm={() => (templateAction === 'apply' ? onApplyTemplate() : deleteTemplate())}
      />
    </JobDetailsActionsBlockWrapper>
  );
};

const mapStateToProps = createStructuredSelector({
});

const mapDispatchToProps = dispatch => bindActionCreators({
  applyTemplate,
  onDeleteTemplate,
  getTemplates,
  getLineStations,
  getLineJobStations,
  getLineJobStationsWithDetails,
  getLineJobStationDocuments,
  getLineJobID,
  getLineJobStationDrawings,
  getDrawingsLineJobID,
  getLineJobStationUnitChecksWithoutSettingToRedux,
  setIsStationHasUnitChecks,
  getLineJobStationVDRsWithoutSettingToRedux,
  setIsStationHasVDRs,
  getLineJobStationITPsWithoutSettingToRedux,
  setIsStationHasITPs,
  getLineJobStationTasks,
  setLineJobStationTasks,
  getLineJobStationBOMs,
  setBOMsToStation,
  clearLineJobStationsWidgetsData,
  clearLineJobStationsData,
  clearUnitChecks,
  getLineJobTasks,
  getLineUnitChecks,
}, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withRouter,
)(JobDetailsActionsBlock);
