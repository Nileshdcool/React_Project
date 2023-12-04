import React from 'react';
import FilterPanel from '../../../components/FilterPanel';
import ListLayout from '../../layouts/ListLayout/ListLayout';
import TileLayout from '../../layouts/TileLayout/TileLayout';

export const MainComponent = ({
  lineJobs,
  onViewChange,
  layoutView,
  queuePositions,
  selectedLine,
}) => (
  <>
    {!!lineJobs.length && <FilterPanel onViewChange={onViewChange} />}
    {layoutView === 'tiles'
      ? (
        <TileLayout
          queuePositions={queuePositions}
          lineJobs={lineJobs}
          selectedLine={selectedLine}
        />
      )
      : (
        <ListLayout
          queuePositions={queuePositions}
          lineJobs={lineJobs}
          selectedLine={selectedLine}
        />
      )}
  </>
);
