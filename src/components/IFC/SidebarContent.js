export const data = [
  {
    title: "IFC",
    links: [
      { text: "Main", to: "/ifc/main" },
      { text: "My Tray", to: "/ifc/my-tray" },
      { text: "Cancelled", to: "/ifc/cancelled" },
    ],
  },
  {
    title: "Trays",
    links: [
      { text: "Design", to: "/ifc/design" },
      { text: "Stress", to: "/ifc/stress" },
      { text: "Supports", to: "/ifc/supports" },
      { text: "Materials", to: "/ifc/materials" },
      { text: "Issuer", to: "/ifc/issuer" },
      { text: "To Issue", to: "/ifc/to-issue" },
      { text: "Issued", to: "/ifc/issued" },
      { text: "Process", to: "/ifc/process" },
      { text: "Instrumentation", to: "/ifc/instrumentation" },
    ],
  },
];

export const rolesPerTray = {
  Design: ["Design", "Design Lead", "Speciality Lead"],
  Materials: ["Materials", "Speciality Lead"],
  Stress: ["Stress", "Stress Lead", "Speciality Lead"],
  Supports: ["Supports", "Supports Lead", "Speciality Lead"],
  Issuer: ["Issuer", "Speciality Lead"],
  ToIssue: ["Speciality Lead"],
  Issued: ["Speciality Lead"],
  Process: ["Process", "Speciality Lead"],
  Instrumentation: ["Instrument", "Speciality Lead"],
};
