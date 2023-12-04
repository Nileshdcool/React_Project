import { BUTTONS_TEXT, LINES } from '../../../constants';
import {
  CustomTableBody,
  CustomTableRow,
  EmptyTablePlaceholder,
  HideTableBox,
  StyledCell,
  TextCutter,
} from './styledComponents';
import React, { Component } from 'react';

import ContainedButton from '../../../components/Buttons/ContainedButton';
import DragIndicator from '@material-ui/icons/DragIndicator';
import { Draggable } from 'react-beautiful-dnd';
import { HandDragWrapper } from '../TileLayout/styledComponents';
import IconSvg from '../../../components/Icon';
import { Label } from '../../../components/Label/Label';
import moment from 'moment';
import { withRouter } from 'react-router';

class ListTable extends Component {
  onEditClick = (jobId) => {
    const { history } = this.props;
    history.push(`/job-details/${jobId}`);
  };

  descendingComparator = (a, b, orderBy) => {
    if (orderBy.includes('.')) {
      const sortField = orderBy.split('.');
      if (b[sortField[0]][sortField[sortField.length - 1]] < a[sortField[0]][sortField[sortField.length - 1]]) {
        return -1;
      }
      if (b[sortField[0]][sortField[sortField.length - 1]] > a[sortField[0]][sortField[sortField.length - 1]]) {
        return 1;
      }
      return 0;
    }
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  getComparator = (order, orderBy) => (order === 'desc'
    ? (a, b) => this.descendingComparator(a, b, orderBy)
    : (a, b) => -this.descendingComparator(a, b, orderBy))

  stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
  }

  render() {
    const {
      jobs,
      provided,
      droppableId,
      isOnDrag,
      orderBy,
      order,
    } = this.props;
    const sortedJobs = this.stableSort(jobs, this.getComparator(order, orderBy));
    const userRole = JSON.parse(localStorage.getItem('USER_ROLE'));
    return (
      <CustomTableBody
        ref={provided.innerRef}
        {...provided.droppableProps}
      >

        <HideTableBox isondrag={isOnDrag} />
        {sortedJobs.length !== 0 ? (sortedJobs.map((job, index) => (
          <Draggable draggableId={job.jobId} index={index} key={job.jobId}>
            {(provided) => (
              <CustomTableRow
                key={job.jobId}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <StyledCell style={{ maxWidth: '10px' }} align="left">
                  <HandDragWrapper>
                    <IconSvg
                      color="mainCardTitleColor"
                      icon={<DragIndicator />}
                      iconFontSize="24px"
                    />
                  </HandDragWrapper>
                </StyledCell>
                <StyledCell isInProgress={job.inProgress} align="left">
                  <span>
                    {!!job.salesOrder && job.salesOrder.number}
                  </span>
                </StyledCell>
                <StyledCell align="left">{job.workOrder.number}</StyledCell>
                <StyledCell align="left"><TextCutter>{job.description}</TextCutter></StyledCell>
                <StyledCell align="left">
                  {job.revisionNumber > 0
                    && (
                      <Label
                        text={job.revisionNumber}
                        color="orange"
                        isListView
                      />
                    )}
                </StyledCell>
                <StyledCell align="center">{job.numberOfScheduledUnits}</StyledCell>
                <StyledCell align="center">{job.numberOfCompletedUnits}</StyledCell>
                <StyledCell align="center">{moment(job.plannedStartDateTime).format('MM/DD/YYYY')}</StyledCell>
                <StyledCell align="center">{moment(job.plannedCompletionDateTime).format('MM/DD/YYYY')}</StyledCell>
                {droppableId === LINES.NEW ? (
                  <StyledCell align="center">
                    <Label
                      isLabelHide={job.status === null || !job.status.shortDescription}
                      text={job.status !== null ? job.status.shortDescription.toUpperCase() : ''}
                      color={'purple'}
                    />
                  </StyledCell>
                ) : (userRole.planner && <StyledCell align="center" />)}
                <StyledCell align="center">
                  <ContainedButton
                    variant="contained"
                    color="primary"
                    colorType="classic"
                    text={BUTTONS_TEXT.edit}
                    id={index}
                    onClick={() => this.onEditClick(job.id)}
                    index={index}
                  />
                </StyledCell>
              </CustomTableRow>
            )}
          </Draggable>
        )))
          : (
            <EmptyTablePlaceholder align="center" color="primary">
              No Jobs to be shown
            </EmptyTablePlaceholder>
          )}
        {provided.placeholder}
      </CustomTableBody>
    );
  }
}

export default withRouter(ListTable);
