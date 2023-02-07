export const prepareRows = (rows) => {
  let weeks = [];
  for (let i = 0; i < rows.length; i++) {
    //Por cada semana
    //Creamos el punto en la grafica
    weeks.push({
      name: `W${rows[i].id}`,
      ["Current Weight"]: rows[i].progress,
      ["Max Weight"]: rows[i].max_progress,
      Estimated: (rows[i].max_progress / 100) * rows[i].estimated,
      Forecast: (rows[i].max_progress / 100) * rows[i].forecast,
    });
  }
  return weeks;
};
