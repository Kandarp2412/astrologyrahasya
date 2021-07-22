const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }

  if (b[orderBy] > a[orderBy]) {
    return 1;
  }

  return 0;
};

export const applySort = (rows, order, orderBy) => {
  if (!rows || !order) {
    return rows;
  }

  return rows.sort((a, b) => (
    order === 'desc'
      ? descendingComparator(a, b, orderBy)
      : -descendingComparator(a, b, orderBy)
  ));
};
