export const getURL = () =>
  "http://" +
  import.meta.env.VITE_SERVER +
  ":" +
  import.meta.env.VITE_NODE_PORT;
