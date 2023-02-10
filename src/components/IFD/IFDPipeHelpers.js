const progressNumbers = {
  TL1: {
    modelled: 50,
    sdesign: 100,
  },
  TL2: {
    modelled: 50,
    supports: 90,
    sdesign: 100,
  },
  TL3: {
    modelled: 50,
    sstress: 75,
    rstress: 80,
    stress: 85,
    supports: 90,
    sdesign: 100,
    isotracker: 100,
  },
};

export const calculateNextStep = (status, type) => {
  const list = Object.keys(progressNumbers[type]);
  const tempStatus = status.replace("-", "").replace("*", "").toLowerCase();
  const idx = list.findIndex((item) => tempStatus == item);
  const nextStep = list[idx + 1];
  return nextStep;
};

export const buildIFDRow = (row, id) => {
  return {
    line_reference: row[0],
    tag: row[1],
    owner: row[2],
    area: row[3],
    unit: row[4],
    fluid: row[5],
    seq: row[6],
    diameter: row[7],
    spec: row[8],
    type: row[9],
    insulation: row[10],
    train: row[11],
    status: row[12],
    id,
  };
};
