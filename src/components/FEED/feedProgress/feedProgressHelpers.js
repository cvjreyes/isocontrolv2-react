export const prepareRows = (rows) => {
  let weeks = [];
  for (let i = 0; i < rows.length; i++) {
    //Por cada semana
    //Creamos el punto en la grafica
    weeks.push({
      name: `D${rows[i].id}`,
      current_weight: rows[i].progress,
      max_weight: rows[i].max_progress,
      estimated: (rows[i].max_progress / 100) * rows[i].estimated,
      forecast: (rows[i].max_progress / 100) * rows[i].forecast,
    });
  }
  return weeks;
};

export const prepareForecast = (data) => {
  let f = {}; //Diccionario dia-estimacion
  let d = []; //Array de labels
  let forecastObj = {};

  for (let i = 0; i < data.length; i++) {
    f["D" + data[i].day] = data[i].estimated;
    d.push("D" + data[i].day);
    forecastObj["D" + data[i].day] = data[i].data;
  }
  return { f, d, forecastObj };
};
