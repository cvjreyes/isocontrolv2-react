export function copyToClipboard(id, table) {
  const copiedEle = document.getElementById(id);
  // create row
  const row = document.createElement("tr");
  // append row to table
  table.appendChild(row);
  // select all inputs in copied element
  const inputList = copiedEle.querySelectorAll("input");
  // loop through selected inputs
  inputList.forEach((input) => {
    // create cell
    const cell = document.createElement("td");
    // add value to cell
    cell.innerHTML = input.value;
    // append cell to row
    row.appendChild(cell);
  });
  // convert table to pastable html!
  const html = table.outerHTML;

  // ESTO SIRVE PARA HACER EXPORT!!!
  // window.open("data:application/vnd.ms-excel," + encodeURIComponent(html));

  // create Blob
  const blob = new Blob([html], { type: "text/html" });
  // write blob to clipboard ( copied! )
  navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
}
