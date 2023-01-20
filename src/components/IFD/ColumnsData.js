export const columnsData = (lineRefs, areas, diameters, owners) => [
  { key: "empty" },
  {
    title: "Line reference",
    key: "line_reference",
    source: lineRefs,
  },
  { title: "Tag", key: "tag", readOnly: true },
  { title: "Own", key: "owner", source: owners },
  {
    title: "A",
    key: "area",
    source: areas,
  },
  { title: "U", key: "unit", readOnly: true },
  { title: "Fl", key: "fluid", readOnly: true },
  { title: "Se", key: "seq", readOnly: true },
  {
    title: "D",
    key: "diameter",
    source: diameters,
  },
  { title: "Sp", key: "spec", readOnly: true },
  {
    title: "Ty",
    key: "type",
    readOnly: true,
  },
  {
    title: "I",
    key: "insulation",
    readOnly: true,
  },
  {
    title: "Tr",
    key: "train",
    source: ["01", "02", "03", "04", "05"],
  },
  {
    title: "Stat",
    key: "status",
    readOnly: true,
  },
];
