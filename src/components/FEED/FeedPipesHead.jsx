/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useRef } from "react";
import Select from "react-select";

export default function Header({
  title,
  submitChanges,
  setCopyMulti,
  setDeleting,
  copyAll,
  undoChanges,
  data,
}) {
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
        <label
          className="pointer"
          htmlFor="mode"
          onClick={() => selectRef.current.focus()}
        >
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
        <div>Add</div>
      </div>
      <h3 className="bold">{title}</h3>
      <div css={rightStyle}>
        <div>
          <button onClick={undoChanges}>Undo</button>
          <button onClick={copyAll}>Copy All</button>
          <button onClick={submitChanges}>Save</button>
        </div>
        <span className="itemsLength">{data.length} items</span>
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
  ".css-1nmdiq5-menu, .css-1nmdiq3-menu": {
    cursor: "pointer",
  },
  "*": {
    cursor: "pointer",
  },
  label: {
    marginRight: ".5rem",
  },
};

const rightStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  ".itemsLength": {
    marginRight: "1.5rem",
  },
};
