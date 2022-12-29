export const URL =
  "http://" +
  import.meta.env.VITE_SERVER +
  ":" +
  import.meta.env.VITE_NODE_PORT;

export const URLold =
  "http://" +
  import.meta.env.VITE_SERVER +
  ":" +
  (import.meta.env.VITE_NODE_PORT - 1);
