export const checkTitleBackgroundColorKey = (basedValue, comparisonValue) => {
  const basedValuePlusTenPercents = basedValue + (basedValue * 0.1);
  const basedValueMinusTenPercents = basedValue - (basedValue * 0.1);
  switch (true) {
    case comparisonValue === 0:
      return 'zero';
    case comparisonValue >= basedValueMinusTenPercents
    && comparisonValue <= basedValuePlusTenPercents:
      return 'equal';
    case basedValueMinusTenPercents > comparisonValue:
      return 'less';
    case basedValuePlusTenPercents < comparisonValue:
      return 'exceeded';
    default:
      return '';
  }
};
