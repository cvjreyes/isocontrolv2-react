export const removeEmpties = (rows) => {
  let filled = [];
  rows.forEach((row) => {
    if (row.tag) filled.push(row);
  });
  return filled;
};

const checkAlreadyExists = (data) => {};
