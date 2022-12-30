export const columnsData = () => [
  // { lineRefs = [], areas = [], diameters = [] }
  {
    key: "empty",
  },
  {
    title: "Line reference",
    key: "line_reference",
    // type: "dropdown",
    // source: lineRefs,
    strict: true,
  },
  { title: "Tag", key: "tag", type: "text", readOnly: true },
  { title: "U", key: "unit", type: "text" },
  {
    title: "A",
    key: "area",
    type: "dropdown",
    // source: areas,
    strict: true,
  },
  { title: "Fl", key: "fluid", type: "text" },
  { title: "Se", key: "sequential", type: "text" },
  { title: "Sp", key: "spec", type: "text" },
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
    // source: diameters,
    strict: true,
  },
  {
    title: "I",
    key: "insulation",
    type: "text",
  },
  {
    title: "Tr",
    key: "train",
    type: "dropdown",
    // source: ["01", "02", "03", "04", "05"],
    strict: true,
  },
  {
    title: "Stat",
    key: "status",
    type: "dropdown",
    // source: ["ESTIMATED", "MODELLING(50%)", "TOCHECK(80%)", "MODELLED(100%)"],
  },
];
