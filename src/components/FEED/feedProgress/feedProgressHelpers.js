export const prepareRows = (rows, category) => {
  let weeks = [];
  for (let i = 0; i < rows.length; i++) {
    //Por cada semana
    //Creamos el punto en la grafica
    weeks.push({
      name: `W${rows[i].id}`,
      [`Current Weight ${category}`]: rows[i].progress,
      [`Max Weight ${category}`]: rows[i].max_progress,
      [`Estimated ${category}`]: (rows[i].max_progress / 100) * rows[i].estimated,
      [`Forecast ${category}`]: (rows[i].max_progress / 100) * rows[i].forecast,
    });
  }
  return weeks;
};