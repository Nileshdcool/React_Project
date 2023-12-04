import {
  CustomTable,
  CustomTableContainer,
  HeaderCell,
  JobLineTitle,
  SortingIcon,
  UnclicableItem,
} from './styledComponents';
import { LINES, TABLE_HEADER_CELLS } from '../../../constants/index';

import { Droppable } from 'react-beautiful-dnd';
import ListTable from './ListTable';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

function SimpleTable({
  title,
  line,
  jobs,
  isOnDrag,
  createSortHandler,
  orderBy,
  order,
}) {
  return (
    <CustomTableContainer component={Paper}>
      <JobLineTitle>{title}</JobLineTitle>
      <Droppable droppableId={line}>
        {(provided) => (
          <CustomTable
            ref={provided.innerRef}
            {...provided.draggableProps}
            stickyHeader
            aria-label="simple table"
          >
            {jobs.length ? (
              <TableHead>
                <TableRow>
                  <HeaderCell minwidth="10px" align="left" />
                  {TABLE_HEADER_CELLS.map((item, index) => (
                    <HeaderCell
                      key={`${item.textAlign}-${index}`}
                      minwidth={item.styleCell}
                      cursor={item.cursor}
                      align={item.textAlign}
                    >
                      {item.orderField === 'revisionNumber' ? (<UnclicableItem>{item.title}</UnclicableItem>) : (
                        <SortingIcon
                          active={orderBy === item.orderField}
                          direction={orderBy === item.orderField ? order : 'asc'}
                          onClick={() => createSortHandler(item.orderField, line)}
                        >
                          {item.title}
                        </SortingIcon>
                      )}
                    </HeaderCell>
                  ))}
                  <HeaderCell cursor="default" minwidth="60px" style={{ minWidth: '75px' }} align="center">{line === LINES.NEW ? 'STATUS' : null}</HeaderCell>
                  <HeaderCell cursor="default" minwidth="10px" align="left" />
                </TableRow>
              </TableHead>
            ) : null}
            <ListTable
              droppableId={line}
              jobs={jobs}
              isOnDrag={isOnDrag}
              provided={provided}
              orderBy={orderBy}
              order={order}
            />
          </CustomTable>
        )}
      </Droppable>
    </CustomTableContainer>
  );
}

export default SimpleTable;
