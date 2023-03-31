export const progressNumbers = {
  TL1: {
    design: 0,
    materials: 85,
    issuer: 90,
    toissue: 95,
    issued: 100,
  },
  TL2: {
    design: 0,
    supports: 80,
    materials: 85,
    issuer: 90,
    toissue: 95,
    issued: 100,
  },
  TL3: {
    design: 0,
    stress: 60,
    supports: 80,
    materials: 85,
    issuer: 90,
    toissue: 95,
    issued: 100,
  },
};

export const calculateNextStep = (status, type) => {
  const list = Object.keys(this.progressNumbers[type]);
  const tempStatus = status.replace("-", "").replace("*", "").toLowerCase();
  const idx = list.findIndex((item) => tempStatus == item);
  const nextStep = list[idx + 1];
  return nextStep;
};
