import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';
import React from 'react';

import ContainedButton from '../../../../../../components/Buttons/ContainedButton';
import { BUTTONS_TEXT } from '../../../../../../constants';
import { STATION_WIDGETS_AND_CHECKBOXES_TITLES } from '../../../../../../constants/labelsNaming';
import { calculateStationTasksTime } from '../../../../../../utils/jobDetailsFunctions';
import {
  CheckBoxGroup,
  CheckBoxGroupItem,
  IconWrapper,
  ItemText,
  StationButton,
  StationCollapseWrapper,
  StationExpansionPanelDetails,
  StationExpansionPanelSummary,
  StationMinutes,
  StationText,
} from './styledComponents';
import { generateWidgetMaterialsCheckboxes } from './utils';
import Tooltip from "@material-ui/core/Tooltip/Tooltip";

const checkboxesTypes = [
  'draws',
  'docs',
  'tasks',
  'boms',
  'unitChecks',
  'vdrs',
  'itps',
];

export default function CustomizedExpansionPanels({
  children,
  stationName,
  openStationData,
  expanded,
  lineJobStations,
  stationTasks,
  isDataLoading,
  setStationsBoms,
}) {
  const widgetMaterialsCheckboxes = generateWidgetMaterialsCheckboxes(lineJobStations, stationName, setStationsBoms);

  return (
    <StationCollapseWrapper square expanded={expanded}>
      <StationExpansionPanelSummary hide={!expanded} aria-controls="panel1d-content" id="panel1d-header">
        <Tooltip title={stationName.toUpperCase()} placement="top">
          <StationText>{stationName.toUpperCase()}</StationText>
        </Tooltip>
        <CheckBoxGroup>
          {checkboxesTypes.map(item => (
            <CheckBoxGroupItem>
              <ItemText>{STATION_WIDGETS_AND_CHECKBOXES_TITLES[item]}</ItemText>
              <IconWrapper transparent={!widgetMaterialsCheckboxes[item]}>
                {widgetMaterialsCheckboxes[item]
                  ? <CheckIcon />
                  : null}
              </IconWrapper>
            </CheckBoxGroupItem>
          ))}
        </CheckBoxGroup>
        <StationMinutes>
          {stationTasks && (
            <Typography variant="subtitle1">
              {calculateStationTasksTime(stationTasks)}
              {' Mins'}
            </Typography>
          )}
        </StationMinutes>
        <StationButton>
          <ContainedButton
            variant="contained"
            color="primary"
            colorType="classic"
            text={BUTTONS_TEXT.viewEdit}
            disabled={isDataLoading}
            onClick={() => openStationData(stationName)}
          />
        </StationButton>
      </StationExpansionPanelSummary>
      <Fade in={expanded}>
        <StationExpansionPanelDetails>
          {children}
        </StationExpansionPanelDetails>
      </Fade>
    </StationCollapseWrapper>
  );
}
