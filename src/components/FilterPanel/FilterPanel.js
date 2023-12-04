import React from 'react';
import * as PropTypes from 'prop-types';
import { FILTER_PANEL_ICONS } from '../../constants/index';
import { FilterPanelWrapper, FilterPanelButtonsWrapper } from './styledComponents';
import CustomIconButton from '../Buttons/CustomIconButton';

const isTableSize = window.innerWidth <= 1024;

const FilterPanel = ({ onViewChange }) => (
  <FilterPanelWrapper>
    <FilterPanelButtonsWrapper>
      {FILTER_PANEL_ICONS.map(item => {
        for (const [key, value] of Object.entries(item)) {
          return (
            <CustomIconButton
              key={`icon-${key}`}
              color="primary"
              onClick={() => onViewChange(key)}
              disableRipple
              icon={value}
              iconFontSize={isTableSize ? "50px" : "60px"}
            />
          );
        }
        return null;
      })}
    </FilterPanelButtonsWrapper>
  </FilterPanelWrapper>
);


FilterPanel.propTypes = {
  onViewChange: PropTypes.func,
};

export default React.memo(FilterPanel);
