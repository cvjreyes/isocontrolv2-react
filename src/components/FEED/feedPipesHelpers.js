export const buildTag = (row) => {
  let tag = "";
  let tag_order = import.meta.env.VITE_TAG_ORDER.split(/[ -]+/);
  for (let i = 0; i < tag_order.length; i++) {
    if (i === tag_order.length - 1) {
      tag += "_" + row[tag_order[i]];
    } else if (i === 0) {
      tag = row[tag_order[i]];
    } else {
      tag += "-" + row[tag_order[i]];
    }
  }
  return tag;
};

export const divideLineReference = (ref) => {
  // encontrar primer guión
  const idx1 = ref.indexOf("-");
  // coger unit
  const unit = ref.substring(0, idx1);
  // quitar primer guión
  const newStr = ref.replace("-", "");
  // encontrar segundo guión
  const idx2 = newStr.indexOf("-");
  // coger fluid
  const fluid = newStr.substring(idx1, idx2);
  // coger seq
  const sequential = newStr.substring(idx2 + 1);

  return { unit, fluid, sequential };
};

export const buildRow = (row, old) => {
  return {
    line_reference: row[0],
    tag: row[1],
    unit: row[2],
    area: row[3],
    fluid: row[4],
    sequential: row[5],
    spec: row[6],
    type: row[7],
    diameter: row[8],
    insulation: row[9],
    train: row[10],
    status: row[11],
    id: old.id,
  };
};
