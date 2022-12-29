export function copyToClipboard(id) {
  // return;
  const copiedEle = document.getElementById(id);
  // create table
  const table = document.createElement("table");
  // create row
  const row = document.createElement("tr");
  // append row to table
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
  const body = document.createElement("tbody");
  body.appendChild(row);
  table.appendChild(body);
  const html = table.outerHTML;

  // ESTO SIRVE PARA HACER EXPORT!!!
  // window.open("data:application/vnd.ms-excel," + encodeURIComponent(html));

  const blob = new Blob([html], { type: "text/html" });
  navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);

  console.log("Element Copied! Paste it in a file");
}
