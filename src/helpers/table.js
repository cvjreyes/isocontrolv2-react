export function copyToClipboard(id, table) {
  const copiedEle = document.getElementById(id);
  // create row
  const row = document.createElement("tr");
  // append row to table
  table.appendChild(row);
  // select all inputs in copied element
  const inputList = copiedEle.querySelectorAll("input");
  // select all dropdowns in copied element
  const valuesList = copiedEle.getElementsByClassName(
    "css-1dimb5e-singleValue"
  );
  const totalList = [
    valuesList[0].innerHTML,
    inputList[1].value,
    valuesList[1].innerHTML,
    inputList[3].value,
    inputList[4].value,
    inputList[5].value,
    valuesList[2].innerHTML,
    inputList[6].value,
    inputList[7].value,
    inputList[8].value,
    valuesList[3].innerHTML,
    valuesList[4].innerHTML,
  ];
  // loop through selected inputs
  totalList.forEach((item) => {
    // create cell
    const cell = document.createElement("td");
    // add value to cell
    cell.innerHTML = item;
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
