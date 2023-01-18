export const checkForAlreadyClaimed = (data) => {
  return data.some((item) => item.owner === "Already claimed");
};
