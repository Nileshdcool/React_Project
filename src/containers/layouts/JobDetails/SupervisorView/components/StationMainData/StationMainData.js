import * as PropTypes from 'prop-types';

import {
  ActionsBlock,
  ButtonsWrapper,
  DropDownWIthTooltip,
  FirstWidgetsLine,
  GroupWidgetsBlock,
  LeftSubBlock,
  SecondWidgetsLine,
  StationInnerMinutes,
  StationWidgets,
  StyledWarningIcon,
  UnsavedChangesWarning,
  WidgetsBlock,
} from '../../styledComponents';
import React, { useEffect } from 'react';

import BOM from '../BOMWidget/BOMWidget';
import { BUTTONS_TEXT } from '../../../../../../constants';
import ChecksWidget from '../ChecksWidget/ChecksWidget';
import ContainedButton from '../../../../../../components/Buttons/ContainedButton';
import DocumentsWidget from '../DocumentsWidget/DocumentsWidget';
import DrawingsWidget from '../DrawingsWidget/DrawingsWidget';
import DropDownSelectStation from '../DropDownSelect';
import Fade from '@material-ui/core/Fade';
import ITPWidget from '../ITPWidget/ITPWidget';
import { STATION_WIDGETS_AND_CHECKBOXES_TITLES } from '../../../../../../constants/labelsNaming';
import TasksWidget from '../TasksWidget/TasksWidget';
import Typography from '@material-ui/core/Typography';
import VDRWidget from '../VDRWidget/VDRWidget';
import { calculateStationTasksTime } from '../../../../../../utils/jobDetailsFunctions';
import { updateBoms } from '../../../../../../actions/jobDetails';

const checkButtonIsDisabled = (savedName, selectedStation) =>
  savedName === 'SELECT STATION' && !selectedStation.name;

const StationMainData = ({
  stations,
  savedStationName,
  setIsStationChangesSaved,
  stationDocuments,
  stationDrawings,
  isStationDataSavedChanges,
  stationAction,
  isAddNewStation,
  removeDocument,
  removeDrawing,
  changeSelectedStation,
  selectedStationBySelect,
  stationTasks,
  removeTask,
  stationBoms,
  handleAddedEntities,
  updateLineJobStationDocuments,
  updateLineJobStationDrawings,
  updateStationTasks,
  updateLineJobStationTasks,
}) => {
  const [stationsList, setStationsList] = React.useState([stations]);
  const [selectedStation, setSelectedStation] = React.useState({});

  useEffect(() => {
    setStationsList(stations);
    setSelectedStation(selectedStationBySelect);
  }, [isAddNewStation, savedStationName, stations, selectedStationBySelect]);

  const onStationChange = (e) => {
    const newChoosedStationValue =
      e.target.attributes.value && e.target.attributes.value.value;
    const savedStationId =
      savedStationName === 'SELECT STATION'
        ? ''
        : stationsList.find((item) => item.name === savedStationName)
        ? stationsList.find((item) => item.name === savedStationName).id
        : '';
    if (newChoosedStationValue) {
      changeSelectedStation(newChoosedStationValue, savedStationName);
    }
    if (newChoosedStationValue && newChoosedStationValue !== savedStationId) {
      setIsStationChangesSaved(false);
    }
    setStationsList(stations);
  };
  const onStationSearch = (e) => {
    if (e.target.value.length > 0) {
      const filteredStations = stations
        .filter(
          (item) =>
            item.name.toUpperCase().indexOf(e.target.value.toUpperCase()) + 1,
        )
        .filter((item) => !item.isStationChoosed);
      setStationsList(filteredStations);
      return;
    }
    if (e.target.value.length === 0) {
      setStationsList(stations);
    }
  };

  return (
    <StationWidgets>
      <ActionsBlock>
        <LeftSubBlock>
          <DropDownWIthTooltip>
            <DropDownSelectStation
              value={
                selectedStation.name ? selectedStation.name : savedStationName
              }
              onChange={onStationChange}
              onStationSearch={onStationSearch}
              displayEmpty
              variant='outlined'
              items={stationsList}
              stations={stations}
            />
            {!selectedStation.name && isAddNewStation && (
              <Typography variant='body2'>
                To add the materials, please select a station first.
              </Typography>
            )}
          </DropDownWIthTooltip>

          <Fade in={!isStationDataSavedChanges}>
            <UnsavedChangesWarning>
              <StyledWarningIcon type='errorColor' />
              <p>
                There are unsaved changes detected. Click SAVE to apply the
                changes.
              </p>
            </UnsavedChangesWarning>
          </Fade>
        </LeftSubBlock>
        <ButtonsWrapper>
          <StationInnerMinutes>
            {stationTasks && (
              <Typography variant='subtitle1'>
                {calculateStationTasksTime(stationTasks)}
                {' Mins'}
              </Typography>
            )}
          </StationInnerMinutes>
          <ContainedButton
            variant='contained'
            color='secondary'
            colorType='white'
            text={BUTTONS_TEXT.delete}
            disabled={isAddNewStation}
            onClick={() => stationAction('delete', savedStationName)}
          />
          <ContainedButton
            variant='contained'
            color='secondary'
            colorType='white'
            text={BUTTONS_TEXT.cancel}
            onClick={() => stationAction('cancel', savedStationName)}
          />
          <ContainedButton
            variant='contained'
            color='primary'
            colorType='classic'
            text={BUTTONS_TEXT.save}
            disabled={checkButtonIsDisabled(savedStationName, selectedStation)}
            onClick={() => stationAction('save', savedStationName)}
          />
        </ButtonsWrapper>
      </ActionsBlock>
      {selectedStation.name !== 'SELECT STATION' && (
        <WidgetsBlock>
          <GroupWidgetsBlock>
            <FirstWidgetsLine>
              <DrawingsWidget
                title={STATION_WIDGETS_AND_CHECKBOXES_TITLES.draws}
                onModalOpen={false}
                drawings={stationDrawings}
                removeDrawing={removeDrawing}
                handleAddedEntities={handleAddedEntities}
                updateLineJobStationDrawings={updateLineJobStationDrawings}
              />
              <BOM
                openedStation={
                  savedStationName === 'SELECT STATION'
                    ? selectedStationBySelect.name
                    : savedStationName
                }
                boms={stationBoms}
                checkedBoms={{}}
                updateBoms={updateBoms}
                savedChangesInAnnotations={() => {}}
                setIsStationChangesSaved={setIsStationChangesSaved}
                isStationDataSavedChanges={isStationDataSavedChanges}
                handleAddedEntities={handleAddedEntities}
              />
            </FirstWidgetsLine>
            <SecondWidgetsLine>
              <VDRWidget
                title={STATION_WIDGETS_AND_CHECKBOXES_TITLES.vdrs}
                handleAddedEntities={handleAddedEntities}
              />
              <ITPWidget
                title={STATION_WIDGETS_AND_CHECKBOXES_TITLES.itps}
                handleAddedEntities={handleAddedEntities}
              />
              <DocumentsWidget
                title={STATION_WIDGETS_AND_CHECKBOXES_TITLES.docs}
                documents={stationDocuments}
                onModalOpen={false}
                removeDocument={removeDocument}
                updateLineJobStationDocuments={updateLineJobStationDocuments}
                handleAddedEntities={handleAddedEntities}
              />
            </SecondWidgetsLine>
          </GroupWidgetsBlock>
          <TasksWidget
            title={STATION_WIDGETS_AND_CHECKBOXES_TITLES.tasks}
            stationTasks={stationTasks}
            removeTask={removeTask}
            updateStationTasks={updateStationTasks}
            handleAddedEntities={handleAddedEntities}
            updateLineJobStationTasks={updateLineJobStationTasks}
          />
          <ChecksWidget
            title={STATION_WIDGETS_AND_CHECKBOXES_TITLES.unitChecks}
            handleAddedEntities={handleAddedEntities}
          />
        </WidgetsBlock>
      )}
    </StationWidgets>
  );
};

StationMainData.propTypes = {
  stations: PropTypes.instanceOf(Array),
  stationAction: PropTypes.func,
  setIsStationChangesSaved: PropTypes.func,
  changeSelectedStation: PropTypes.func,
  selectedStationBySelect: PropTypes.string,
  savedStationName: PropTypes.string,
  isStationDataSavedChanges: PropTypes.bool,
  isAddNewStation: PropTypes.bool,
};

export default StationMainData;
