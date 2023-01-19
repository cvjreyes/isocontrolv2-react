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
  console.log(nextStep);
  return nextStep;
};
