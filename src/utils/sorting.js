export const sortByExecutionOrder = array => {
  const intermediateArray = [...array];
  intermediateArray.sort((a, b) => a.executionOrder - b.executionOrder);
  return intermediateArray;
};

export const sortByStationIndex = array => {
  const intermediateArray = [...array];
  intermediateArray.sort((a, b) => a.sortIndex - b.sortIndex);
  return intermediateArray;
};

export const sortByName = array => {
  const intermediateArray = [...array];
  intermediateArray.sort((a, b) => {
    const x = a.name ? a.name.toLowerCase() : '';
    const y = b.name ? b.name.toLowerCase() : '';
    return x < y ? -1 : x > y ? 1 : 0;
  })
  return intermediateArray;
}
