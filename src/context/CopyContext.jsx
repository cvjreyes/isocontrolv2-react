import React, { useEffect, useRef, useState } from "react";

import { copyFn } from "../helpers/copyContext";

export default function CopyContext({ children, data, view }) {
  const [copyMulti, setCopyMulti] = useState(false);
  const [copied, setCopied] = useState([]);
  const table = useRef(document.createElement("table"));

  useEffect(() => {
    setCopied([]);
    table.current = document.createElement("table");
  }, [copyMulti]);

  const copyAll = () => {
    table.current = document.createElement("table");
    setCopied([]);
    let finished = false;
    data.forEach((pipe, i) => {
      copyFn(pipe, table.current, view);
      if (i === data.length - 1) finished = true;
    });
    table.current = document.createElement("table");
  };

  const copyToClipBoard = (id) => {
    const pipe = data.find((x) => x.id === id);
    let newTable = document.createElement("table");
    copyFn(pipe, copyMulti ? table.current : newTable, view);
    if (copyMulti) {
      const tempCopied = [...copied];
      tempCopied.push(id);
      setCopied(tempCopied);
    }
  };

  return React.cloneElement(children, {
    setCopyMulti,
    copyToClipBoard,
    copyMulti,
    copied,
    copyAll,
  });
}
