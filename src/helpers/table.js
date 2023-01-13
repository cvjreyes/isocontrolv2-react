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

  const totalList =
    copiedEle.children.length === 13
      ? buildFeedList(inputList, valuesList)
      : buildIFDList(inputList, valuesList);

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

const buildFeedList = (inputList, valuesList) => {
  return [
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
};

const buildIFDList = (inputList, valuesList) => {
  return [
    valuesList[0].innerHTML, // line_reference
    inputList[1].value, // tag
    valuesList[1].innerHTML, // owner
    valuesList[2].innerHTML, // area
    inputList[4].value, // unit
    inputList[5].value, // fluid
    inputList[6].value, // seq
    valuesList[3].innerHTML, // diameter
    inputList[8].value, // spec
    inputList[9].value, // type
    inputList[10].value, // insulation
    valuesList[4].innerHTML, // train
    inputList[12].value, // status
  ];
};
