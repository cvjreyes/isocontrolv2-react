import React, { useEffect, useRef, useState } from "react";
import { copyToClipboard } from "../helpers/table";

export default function CopyContext({ children }) {
  const [copyMulti, setCopyMulti] = useState(false);
  const [copied, setCopied] = useState([]);
  const table = useRef(document.createElement("table"));

  useEffect(() => {
    setCopied([]);
    table.current = document.createElement("table");
  }, [copyMulti]);

  const copyToClipBoard = (id) => {
    // const tableToUse = ;
    copyToClipboard(
      id,
      copyMulti ? table.current : document.createElement("table")
    );
    if (copyMulti) {
      const tempCopied = [...copied];
      tempCopied.push(id);
      setCopied(tempCopied);
    }
  };
  // const copiedEle = document.getElementById(id);
  return React.cloneElement(children, {
    setCopyMulti,
    copyToClipBoard,
    copyMulti,
    copied,
  });
}
