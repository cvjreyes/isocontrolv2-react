export const columnsData = (lineRefs, areas, diameters) => [
  // { lineRefs = [], areas = [], diameters = [] }
  { key: "empty" },
  {
    title: "Line reference",
    key: "line_reference",
    type: "dropdown",
    source: lineRefs,
  },
  { title: "Tag", key: "tag", type: "text", readOnly: true },
  { title: "U", key: "unit", type: "text", readOnly: true },
  {
    title: "A",
    key: "area",
    type: "dropdown",
    source: areas,
  },
  { title: "Fl", key: "fluid", type: "text", readOnly: true },
  { title: "Se", key: "seq", type: "text", readOnly: true },
  { title: "Sp", key: "spec", type: "text", readOnly: true },
  {
    title: "Ty",
    key: "type",
    type: "text",
    readOnly: true,
  },
  {
    title: "D",
    key: "diameter",
    type: "dropdown",
    source: diameters,
  },
  {
    title: "I",
    key: "insulation",
    type: "text",
    readOnly: true,
  },
  {
    title: "Tr",
    key: "train",
    type: "dropdown",
    source: ["01", "02", "03", "04", "05"],
  },
  {
    title: "Stat",
    key: "status",
    type: "dropdown",
    source: ["ESTIMATED", "MODELLING(50%)", "TOCHECK(80%)", "MODELLED(100%)"],
  },
];
