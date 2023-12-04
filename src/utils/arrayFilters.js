export const filterJobsByParam = (array, paramInArray, comparableParam) => {
  const intermediateArray = array.filter(item => item[paramInArray].id === comparableParam);
  return intermediateArray;
};

export const groupingArrayOfObjectsByKey = (array, key) => {
  const grouped = array.reduce((r, a, i) => {
    if (!i || r[r.length - 1][0][key] !== a[key]) {
      return r.concat([[a]]);
    }
    r[r.length - 1].push(a);
    return r;
  }, []);
  return grouped;
}

