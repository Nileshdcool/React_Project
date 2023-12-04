import sortBy from 'lodash/sortBy';

export const createBOMsWithChildsAndParent = (boms) => {
  const parsedBOMs = boms.map(item => {
    const parentBOM = boms.find(f => f.id === item.parentId);
    const childBOM = sortBy(boms.filter(f => f.parentId === item.id), 'number');
    return (
      {
        ...item,
        parent: parentBOM,
        children: childBOM,
      }
    );
  });
  return parsedBOMs;
};
