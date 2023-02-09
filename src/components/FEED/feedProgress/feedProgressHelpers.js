export const prepareRowsFeed = (rows, name) => {
  let weeks = [];
  for (let i = 0; i < rows.length; i++) {
    //Por cada semana
    //Creamos el punto en la grafica
    weeks.push({
      name: `W${rows[i].id}`,
      ["Current Weight Feed"]: rows[i].progress,
      ["Max Weight Feed"]: rows[i].max_progress,
      ["Estimated Feed"]: (rows[i].max_progress / 100) * rows[i].estimated,
      ["Forecast Feed"]: (rows[i].max_progress / 100) * rows[i].forecast,
    });
  }
  return weeks;
};

export const prepareRowsIFD = (rows) => {
  let weeks = [];
  for (let i = 0; i < rows.length; i++) {
    //Por cada semana
    //Creamos el punto en la grafica
    weeks.push({
      name: `W${rows[i].id}`,
      ["Current Weight IFD"]: rows[i].progress,
      ["Max Weight IFD"]: rows[i].max_progress,
      ["Estimated IFD"]: (rows[i].max_progress / 100) * rows[i].estimated,
      ["Forecast IFD"]: (rows[i].max_progress / 100) * rows[i].forecast,
    });
  }
  return weeks;
};