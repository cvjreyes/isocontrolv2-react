const getType = (d) => {
  if (import.meta.env.VITE_MMDN === "0") {
    if (d < 2.0) {
      //Si el diametro es inferior a 2 pulgadas
      return "TL1";
    } else {
      //Superior o igual
      return "TL2";
    }
  } else {
    if (d < 50) {
      //Si el diametro es inferior a 50 milimetros
      return "TL1";
    } else {
      //Superior o igual
      return "TL2";
    }
  }
};

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

export const divideTag = (tag) => {
  const dividedTag = tag.split("-");
  const [insulation, train] = dividedTag[6].split("_");
  const row = {
    line_reference: `${dividedTag[1]}-${dividedTag[2]}-${dividedTag[3]}`,
    tag: tag.trim(),
    area: dividedTag[0],
    unit: dividedTag[1],
    fluid: dividedTag[2],
    seq: dividedTag[3],
    diameter: dividedTag[4],
    spec: dividedTag[5],
    insulation,
    type: getType(dividedTag[4]),
    train,
  };
  return row;
};

export const divideLineReference = (ref, lineRefs) => {
  // coger line ref obj de la lista de line refs
  const idx = lineRefs.findIndex((x) => x.line_ref === ref.trim());
  // del line ref encontrado, coger spec e insulation
  const { spec, insulation } = { ...lineRefs[idx] };
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
  const seq = newStr.substring(idx2 + 1);
  // devolver todo 🤮
  return { unit, fluid, seq, spec, insulation };
};

export const buildRow = (row, id) => {
  return {
    line_reference: row[0],
    tag: row[1],
    unit: row[2],
    area: row[3],
    fluid: row[4],
    seq: row[5],
    spec: row[6],
    type: row[7],
    diameter: row[8],
    insulation: row[9],
    train: row[10],
    status: row[11],
    id,
  };
};

export const buildLineRef = (row) => {
  return `${row.unit}-${row.fluid}-${row.seq}`;
};

export const getTypeFromDiameter = (dia, calc_notes) => {
  if (calc_notes === "NA" || calc_notes === "unset") {
    if (import.meta.env.VITE_MMDN == "0") {
      if (dia < 2.0) return "TL1";
      else return "TL2";
    } else {
      if (dia < 50) return "TL1";
      else return "TL2";
    }
  } else return "TL3";
};

export const checkForAlreadyExists = (data) => {
  return data.some((item) => item.tag === "Already exists");
};

export const checkForEmptyCellsAdding = (row) => {
  let haveToBeFilled = ["area", "diameter", "line_reference", "train"];

  let empty = false;
  for (let key in row) {
    if (haveToBeFilled.includes(key) && !row[key]) {
      empty = true;
      break;
    }
  }
  return empty;
};

export const checkForEmptyCells = (data) => {
  let haveToBeFilled = [
    "area",
    "diameter",
    "fluid",
    "insulation",
    "line_reference",
    "tag",
    "unit",
    "seq",
    "spec",
    "train",
  ];

  let empty = false;
  for (let i = 0; i < data.length; i++) {
    for (let key in data[i]) {
      if (haveToBeFilled.includes(key) && !data[i][key]) {
        empty = true;
        break;
      }
    }
  }
  return empty;
};
