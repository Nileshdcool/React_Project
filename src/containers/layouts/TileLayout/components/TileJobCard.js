import * as PropTypes from 'prop-types';

import { BUTTONS_TEXT, JOB_STATUS, LINES } from '../../../../constants';
import {
  CardButtonsWrapper,
  CardHeaderTitleRowWrapper,
  ContentBlock,
  ContentBlocksWrapper,
  HandDragWrapper,
  StyledCardContent,
  TileJobCardWrapper,
} from '../styledComponents';

import CardHeader from '@material-ui/core/CardHeader';
import ContainedButton from '../../../../components/Buttons/ContainedButton';
import DragIndicator from '@material-ui/icons/DragIndicator';
import { Draggable } from 'react-beautiful-dnd';
import IconSvg from '../../../../components/Icon';
import { Label } from '../../../../components/Label/Label';
import React from 'react';
import { TileJobCardUnits } from './TileJobCardUnits';
import { TruncatedText } from '../../../../components/TruncatedText/TruncatedText';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import { withRouter } from 'react-router';

const isJobStatusLabelDisabled = (jobDataStatus, isInProgress, line) => (
  (jobDataStatus === null
  || (!jobDataStatus.shortDescription && LINES.NEW === line)) ||
  (LINES.ACTIVE === line && !isInProgress) ||
  [LINES.STAGED, LINES.CREATED].includes(line)
);

const jobStatusText = (jobDataStatus, isInProgress) => {
  if (!!jobDataStatus && !isInProgress) {
    return jobDataStatus.shortDescription.toUpperCase();
  }
  if (isInProgress) {
    return JOB_STATUS.inProgress;
  }
};

const TileJobCard = ({
  line, jobData, index, history,
}) => {
  const onEditClick = (jobId) => {
    history.push(`/job-details/${jobId}`);
  };
  return (
    <Draggable draggableId={jobData.jobId} index={index}>
      {(provided) => (
        <TileJobCardWrapper
          id={!!jobData.salesOrder ? jobData.salesOrder.id : jobData.jobId}
          elevation={0}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <CardHeader
            title={(
              <CardHeaderTitleRowWrapper haverevision={jobData.revisionNumber !== null}>
                <Typography variant="h4">{!!jobData.salesOrder && jobData.salesOrder.number}</Typography>
                {jobData.revisionNumber > 0
                  && (
                    <Label
                      text={`REVISION#: ${jobData.revisionNumber}`}
                      color="orange"
                    />
                  )}
              </CardHeaderTitleRowWrapper>
            )}
            action={(
              <HandDragWrapper
                {...provided.dragHandleProps}
              >
                <IconSvg
                  color="mainCardTitleColor"
                  icon={<DragIndicator />}
                  iconFontSize="24px"
                />
              </HandDragWrapper>
            )}
          />
          <TileJobCardUnits units={{ scheduled: jobData.numberOfScheduledUnits, completed: jobData.numberOfCompletedUnits }} />
          <StyledCardContent>
            <ContentBlock>
              <Typography
                variant="h5"
              >
                Work Order
              </Typography>
              <Typography
                variant="subtitle1"
              >
                {jobData.workOrder.number}
              </Typography>
            </ContentBlock>
            <ContentBlock>
              <Typography
                variant="h5"
              >
                Customer
              </Typography>
              <Typography
                variant="subtitle1"
              >
                {jobData.customer.name}
              </Typography>
            </ContentBlock>
            <ContentBlock>
              <Typography
                variant="h5"
              >
                Description
              </Typography>
              <TruncatedText
                variant="subtitle1"
                text={jobData.description}
              />
            </ContentBlock>
            <ContentBlocksWrapper>
              <ContentBlock>
                <Typography
                  variant="h5"
                >
                  Planned Start
                </Typography>
                <Typography
                  variant="subtitle1"
                >
                  {moment(jobData.plannedStartDateTime).format('MM/DD/YYYY')}
                </Typography>
              </ContentBlock>
              <ContentBlock>
                <Typography
                  variant="h5"
                >
                  Planned Completion
                </Typography>
                <Typography
                  variant="subtitle1"
                >
                  {moment(jobData.plannedCompletionDateTime).format('MM/DD/YYYY')}
                </Typography>
              </ContentBlock>
            </ContentBlocksWrapper>
          </StyledCardContent>
          <CardButtonsWrapper>
            <Label
              isLabelHide={isJobStatusLabelDisabled(jobData.status, jobData.inProgress, line)}
              text={jobStatusText(jobData.status, jobData.inProgress)}
              color={jobData.inProgress ? 'green' : 'purple'}
              squareLabel={jobData.inProgress}
            />
            <ContainedButton
              variant="contained"
              color="primary"
              colorType="classic"
              text={BUTTONS_TEXT.edit}
              onClick={() => onEditClick(jobData.id)}
              index={index}
            />
          </CardButtonsWrapper>
        </TileJobCardWrapper>
      )}
    </Draggable>
  );
};

TileJobCard.propTypes = {
  jobData: PropTypes.instanceOf(Object).isRequired,
  index: PropTypes.number,
};

export default withRouter(TileJobCard);
