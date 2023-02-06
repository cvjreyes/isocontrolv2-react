export const prepareRows = (rows) => {
  let weeks = [];
  for (let i = 0; i < rows.length; i++) {
    //Por cada semana
    //Creamos el punto en la grafica
    weeks.push({
      name: `W${rows[i].id}`,
      current_weight: rows[i].progress,
      max_weight: rows[i].max_progress,
      estimated: (rows[i].max_progress / 100) * rows[i].estimated,
      forecast: (rows[i].max_progress / 100) * rows[i].forecast,
    });
  }
  return weeks;
};
