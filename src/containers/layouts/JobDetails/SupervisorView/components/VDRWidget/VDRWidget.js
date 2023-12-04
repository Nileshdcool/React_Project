import React from 'react';
import sortBy from 'lodash/sortBy';
import Typography from '@material-ui/core/Typography';
import ClearIcon from '@material-ui/icons/Clear';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { overrideWidgetItemsSortIndex } from '../../../../../../utils/jobDetailsFunctions';
import {
  DragIndicatorIcon,
  HandDragWrapper,
  ITPVDRWidgetHeader,
  ITPVDRWidgetWrapper,
  LeftBlock,
  StyledTypography,
  SupervisorWidgetsWrapper,
} from '../styledComponents';
import CustomIconButton from '../../../../../../components/Buttons/CustomIconButton';
import { updateWidgetVDRs } from '../../../../../../actions/supervisorVDRs';
import { selectStationWidgetVDRs } from '../../../../../../selectors/supervisorVDRs';

const VDRWidget = ({
  title,
  stationWidgetVDRs,
  handleAddedEntities,
  updateWidgetVDRs,
}) => {
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const { destination, source } = result;

    const sortedStationItems = sortBy(stationWidgetVDRs, 'sortIndex');
    const newItemsIds = sortedStationItems;
    const draggableElement = sortedStationItems[source.index];
    newItemsIds.splice(source.index, 1);
    newItemsIds.splice(destination.index, 0, draggableElement);
    const updatedNewArray = newItemsIds.map((item, i) => ({
      ...item,
      sortIndex: i,
    }));
    updateWidgetVDRs(updatedNewArray);
    handleAddedEntities();
  };

  const removeVDR = (file) => {
    const updatedWidgetItemsArray = overrideWidgetItemsSortIndex(
      stationWidgetVDRs.filter((item) => item.vdrId !== file.vdrId),
    );
    updateWidgetVDRs(updatedWidgetItemsArray);
    handleAddedEntities();
  };

  return (
    <SupervisorWidgetsWrapper>
      <ITPVDRWidgetHeader>
        <StyledTypography variant='subtitle1'>{title}</StyledTypography>
      </ITPVDRWidgetHeader>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='widget-vdrs'>
          {(provided) => (
            <ITPVDRWidgetWrapper
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <ul>
                {stationWidgetVDRs &&
                  sortBy(stationWidgetVDRs, 'sortIndex').map((item, index) => (
                    <Draggable
                      draggableId={`${item.vdrId}-${index}`}
                      index={index}
                    >
                      {(provided) => (
                        <Tooltip
                          title={`${item.sequence} - ${item.subject}`}
                          placement='top'
                        >
                          <li
                            key={`${item.vdrId}-${index}`}
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                          >
                            <LeftBlock>
                              <HandDragWrapper {...provided.dragHandleProps}>
                                <DragIndicatorIcon />
                              </HandDragWrapper>
                              <Typography variant='body2'>
                                {`${item.sequence} - ${item.subject}`}
                              </Typography>
                            </LeftBlock>
                            <CustomIconButton
                              color='mainCardTitleColor'
                              onClick={() => removeVDR(item)}
                              disableRipple
                              icon={<ClearIcon />}
                              iconFontSize='20px'
                            />
                            {provided.placeholder}
                          </li>
                        </Tooltip>
                      )}
                    </Draggable>
                  ))}
              </ul>
              {provided.placeholder}
            </ITPVDRWidgetWrapper>
          )}
        </Droppable>
      </DragDropContext>
    </SupervisorWidgetsWrapper>
  );
};

const mapStateToProps = createStructuredSelector({
  stationWidgetVDRs: selectStationWidgetVDRs(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateWidgetVDRs,
    },
    dispatch,
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(VDRWidget);
