export const columnsData = (lineRefs, areas, owners) => [
  { key: "empty" },
  {
    title: "Line reference",
    key: "line_reference",
    source: lineRefs,
  },
  { title: "Tag", key: "tag", readOnly: true },
  { title: "Own", key: "owner", source: owners },
  {
    title: "Area",
    key: "area",
    source: areas,
  },
  { title: "Unit", key: "unit", readOnly: true },
  { title: "Fluid", key: "fluid", readOnly: true },
  { title: "Seq", key: "seq", readOnly: true },
  {
    title: "Diam",
    key: "diameter",
    readOnly: true,
  },
  { title: "Spec", key: "spec", readOnly: true },
  {
    title: "Type",
    key: "type",
    readOnly: true,
  },
  {
    title: "Ins",
    key: "insulation",
    readOnly: true,
  },
  {
    title: "Train",
    key: "train",
    source: ["01", "02", "03", "04", "05"],
  },
  {
    title: "Status",
    key: "status",
    readOnly: true,
  },
];
