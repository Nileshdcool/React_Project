import React from 'react';
import sortBy from 'lodash/sortBy';
import Typography from '@material-ui/core/Typography';
import ClearIcon from '@material-ui/icons/Clear';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { createStructuredSelector } from 'reselect';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import {
  DragIndicatorIcon,
  HandDragWrapper,
  LeftBlock,
  StyledTypography,
  SupervisorFullHeightWidgetsWrapper,
} from '../styledComponents';
import { ChecksHeader } from './styledComponents';
import CustomIconButton from '../../../../../../components/Buttons/CustomIconButton';
import {
  selectLineUnitChecks,
  selectStationWidgetUnitChecks,
} from '../../../../../../selectors/unitChecks';
import { updateWidgetUnitChecks } from '../../../../../../actions/unitChecks';
import { UnitChecksWrapper } from './components/UnitCheckMultiSelectGroup/styledComponents';
import { overrideWidgetItemsSortIndex } from '../../../../../../utils/jobDetailsFunctions';

const ChecksWidget = ({
  title,
  stationWidgetUnitChecks,
  handleAddedEntities,
  updateWidgetUnitChecks,
}) => {
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const { destination, source } = result;

    const sortedStationUnitChecks = sortBy(
      stationWidgetUnitChecks,
      'sortIndex',
    );
    const newUnitChecksIds = sortedStationUnitChecks;
    const draggableElement = sortedStationUnitChecks[source.index];
    newUnitChecksIds.splice(source.index, 1);
    newUnitChecksIds.splice(destination.index, 0, draggableElement);
    const updatedNewArray = newUnitChecksIds.map((item, i) => ({
      ...item,
      sortIndex: i,
    }));
    updateWidgetUnitChecks(updatedNewArray);
    handleAddedEntities();
  };

  const removeUnitCheck = (file) => {
    const updatedWidgetUnitChecksArray = overrideWidgetItemsSortIndex(
      stationWidgetUnitChecks.filter((item) => item.id !== file.id),
    );
    updateWidgetUnitChecks(updatedWidgetUnitChecksArray);
    handleAddedEntities();
  };

  return (
    <SupervisorFullHeightWidgetsWrapper>
      <ChecksHeader>
        <StyledTypography variant='subtitle1'>{title}</StyledTypography>
      </ChecksHeader>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='unit_checks'>
          {(provided) => (
            <UnitChecksWrapper
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <ul>
                {stationWidgetUnitChecks &&
                  sortBy(stationWidgetUnitChecks, 'sortIndex').map(
                    (unitCheck, index) => (
                      <Draggable
                        draggableId={`${unitCheck.fileName}-${index}`}
                        index={index}
                      >
                        {(provided) => (
                          <Tooltip title={unitCheck.text} placement='top'>
                            <li
                              key={`${unitCheck.id}-${index}`}
                              {...provided.draggableProps}
                              ref={provided.innerRef}
                            >
                              <LeftBlock>
                                <HandDragWrapper {...provided.dragHandleProps}>
                                  <DragIndicatorIcon />
                                </HandDragWrapper>
                                <Typography variant='body2'>
                                  {unitCheck.text}
                                </Typography>
                              </LeftBlock>
                              <CustomIconButton
                                color='mainCardTitleColor'
                                onClick={() => removeUnitCheck(unitCheck)}
                                disableRipple
                                icon={<ClearIcon />}
                                iconFontSize='20px'
                              />
                              {provided.placeholder}
                            </li>
                          </Tooltip>
                        )}
                      </Draggable>
                    ),
                  )}
              </ul>
              {provided.placeholder}
            </UnitChecksWrapper>
          )}
        </Droppable>
      </DragDropContext>
    </SupervisorFullHeightWidgetsWrapper>
  );
};

const mapStateToProps = createStructuredSelector({
  lineJobUnitChecks: selectLineUnitChecks(),
  stationWidgetUnitChecks: selectStationWidgetUnitChecks(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateWidgetUnitChecks,
    },
    dispatch,
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ChecksWidget);
