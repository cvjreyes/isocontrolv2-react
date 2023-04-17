export function copyFn(pipe, table, view) {
  const arr = [
    pipe.line_reference,
    pipe.tag,
    pipe.owner ? pipe.owner : null,
    pipe.area,
    pipe.unit,
    pipe.fluid,
    pipe.seq,
    pipe.diameter,
    pipe.spec,
    pipe.type,
    pipe.insulation,
    pipe.train,
    pipe.status,
  ];
  const filteredArray =
    view == "feed" ? arr.filter((item) => item !== null) : arr;

  const row = document.createElement("tr");
  table.appendChild(row);
  filteredArray.forEach((item) => {
    const cell = document.createElement("td");
    cell.innerHTML = item;
    row.appendChild(cell);
  });
  const html = table.outerHTML;
  const blob = new Blob([html], { type: "text/html" });
  try {
    navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
  } catch (e) {
    console.error(e);
  }
}
