import * as PropTypes from 'prop-types';

import { LabelBox, LabelWrapper, SquareLabelBox } from '../../containers/layouts/TileLayout/styledComponents';

import React from 'react';

export const Label = React.memo(({
  text, color, squareLabel, isLabelHide, isListView
}) => (
  <LabelWrapper hide={isLabelHide}>
    {squareLabel
      ? (
        <SquareLabelBox color={color}>
          {text}
        </SquareLabelBox>
      )
      : (
        <LabelBox isListView={isListView} color={color}>
          {text}
        </LabelBox>
      )}
  </LabelWrapper>
));

Label.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  squareLabel: PropTypes.bool,
  isLabelHide: PropTypes.bool,
};
