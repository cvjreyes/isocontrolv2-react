/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useCallback, useEffect, useRef } from "react";
import Select from "react-select";

export default function Header({
  title,
  submitChanges,
  setCopyMulti,
  setDeleting,
  deleting,
  copyAll,
}) {
  // const escFunction = useCallback((e) => {
  //   if (e.key === "Escape" && deleting) {
  //     setDeleting(false);
  //   }
  // }, []);

  // useEffect(() => {
  //   document.addEventListener("keydown", escFunction, false);

  //   return () => {
  //     document.removeEventListener("keydown", escFunction, false);
  //   };
  // }, []);

  const selectRef = useRef(null);

  const options = [
    { value: "default", label: "Default" },
    { value: "copy", label: "Copy" },
    { value: "delete", label: "Delete" },
  ];

  const handleSelectChange = (e) => {
    if (e.value === "copy") setCopyMulti(true);
    else setCopyMulti(false);
    if (e.value === "delete") setDeleting(true);
    else setDeleting(false);
  };

  return (
    <div css={headStyle}>
      <div css={selectWrapper}>
        <label htmlFor="mode" onClick={() => selectRef.current.focus()}>
          Mode:
        </label>
        <Select
          options={options}
          openMenuOnFocus={true}
          ref={selectRef}
          onChange={handleSelectChange}
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              border: "none",
            }),
          }}
          defaultValue={options[0]}
        />
      </div>
      <h3 className="bold">{title}</h3>
      <div>
        <button onClick={copyAll}>Copy All</button>
        <button onClick={submitChanges}>Save</button>
      </div>
    </div>
  );
}

const headStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
};

const selectWrapper = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  label: {
    marginRight: ".5rem",
  },
};
