import * as PropTypes from 'prop-types';

import {
  EmptyTablePlaceholder,
  JobWrapperLineContent,
  JobWrapperLineTitle,
  TileJobWrapper,
} from '../styledComponents';

import { Droppable } from 'react-beautiful-dnd';
import React from 'react';
import TileJobCard from './TileJobCard';
import Typography from '@material-ui/core/Typography';
import { sortByExecutionOrder } from '../../../../utils/sorting';

const TileJobLine = ({ title, id, jobs }) => {
  const sortedJobs = sortByExecutionOrder(jobs);
  return (
    <TileJobWrapper className="jobColumn">
      <JobWrapperLineTitle>
        <Typography variant="h2">
          {title}
        </Typography>
      </JobWrapperLineTitle>
      <Droppable droppableId={id}>
        {(provided) => (
          <JobWrapperLineContent
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {sortedJobs.length !== 0 ? (sortedJobs.map((jobData, index) => (
              <TileJobCard line={id} key={jobData.id} jobData={jobData} index={index} />
            )))
              : (
                <EmptyTablePlaceholder color="secondary">
                  No Jobs to be shown
                </EmptyTablePlaceholder>
              )}
            {provided.placeholder}
          </JobWrapperLineContent>
        )}
      </Droppable>
    </TileJobWrapper>
  );
};
TileJobLine.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string,
  jobs: PropTypes.instanceOf(Array),
};

export default React.memo(TileJobLine);
