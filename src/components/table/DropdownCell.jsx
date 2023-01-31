import React, { useRef } from "react";
import Select from "react-select";

export default function DropdownCell({
  i,
  y,
  item,
  x,
  changed,
  deleting,
  handleChange,
}) {
  const refDropdown = useRef(null);

  const customStyles = {
    control: (styles) => ({
      ...styles,
      cursor: "pointer !important",
      backgroundColor:
        item.tag === "Already exists"
          ? "orange"
          : changed.includes(item.id)
          ? "rgb(0, 188, 6)"
          : (item.ifd_status && item.ifd_status !== "FEED_ESTIMATED") ||
            item.trashed ||
            (item.feed_id && !item.status.toLowerCase().includes("estimated"))
          ? "lightgray"
          : "white",
    }),
  };

  return (
    <div id={`${i}${y}`} className="selectWrapper">
      <Select
        className="select-element"
        value={{ label: item[x.key], value: item[x.key] }}
        onChange={(e) =>
          handleChange({ target: { name: x.key, value: e.label } }, item.id)
        }
        ref={refDropdown}
        inputId={x.key}
        options={x.source?.map((opt) => ({ label: opt, value: opt }))}
        components={{
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
        }}
        closeMenuOnScroll={true}
        isDisabled={
          (item.ifd_status && item.ifd_status !== "FEED_ESTIMATED") ||
          (item.feed_id && !item.status.toLowerCase().includes("estimated")) ||
          deleting
        }
        openMenuOnFocus={true}
        styles={customStyles}
      />
      <img
        src="https://img.icons8.com/ultraviolet/40/null/circled-chevron-down.png"
        onClick={() => refDropdown.current.focus()}
      />
    </div>
  );
}
