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

  const testList = copiedEle.getElementsByClassName("select-element");

  const totalList =
    copiedEle.children.length === 13
      ? buildFeedList(inputList, testList)
      : buildIFDList(inputList, testList);

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
  console.log("feed");
  return [
    valuesList[0].children[2].children[0].children[0].innerHTML, // line_reference
    inputList[1].value, // tag
    valuesList[1].children[2].children[0].children[0].innerHTML, // area
    inputList[3].value, // unit
    inputList[4].value, // fluid
    inputList[5].value, // sequential
    inputList[6].value, // diameter
    inputList[7].value, // spec
    inputList[8].value, // type
    inputList[9].value, // insulation
    valuesList[2].children[2].children[0].children[0].innerHTML, // train
    valuesList[3].children[2].children[0].children[0].innerHTML, // status
  ];
};

const buildIFDList = (inputList, valuesList) => {
  console.log("IFD");
  return [
    valuesList[0].children[2].children[0].children[0].innerHTML, // line_reference
    inputList[1].value, // tag
    valuesList[1].children[2].children[0].children[0].innerHTML, // owner
    valuesList[2].children[2].children[0].children[0].innerHTML, // area
    inputList[4].value, // unit
    inputList[5].value, // fluid
    inputList[6].value, // seq
    inputList[7].value, // diameter
    inputList[8].value, // spec
    inputList[9].value, // type
    inputList[10].value, // insulation
    valuesList[3].children[2].children[0].children[0].innerHTML, // train
    inputList[12].value, // status
  ];
};
