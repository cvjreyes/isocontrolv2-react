import React, { useEffect, useRef, useState } from "react";
import { copyToClipboard } from "../helpers/table";

export default function CopyContext({ children, data, id }) {
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
    data.forEach((_, i) => {
      copyToClipboard(`${id}${i}`, table.current);
      if (i === data.length - 1) finished = true;
    });
    table.current = document.createElement("table");
  };

  const copyToClipBoard = (id) => {
    let newTable = document.createElement("table");
    copyToClipboard(id, copyMulti ? table.current : newTable);
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
