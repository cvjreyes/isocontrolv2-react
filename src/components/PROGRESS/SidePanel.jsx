/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

export default function SidePanel({ data, subcategories, section, handleChange }) {

  return (
    <div className="sidepanel">
      <div className="category">
        <label className="bold pointer">
          <input
            type="checkbox"
            checked={
              !!data[0] &&
              subcategories.every((x) => data[0].hasOwnProperty(x.key))
            }
            onChange={() => handleChange(section)}
          />
          {section}
        </label>
      </div>
      <div className="subcategories">
        {subcategories.map((x, i) => {
        //   console.log(x);
          return (
            <div className="subcategory" key={i}>
              <label className="pointer">
                <input
                  type="checkbox"
                  checked={!!data[0] && x.key in data[0]}
                  onChange={() => handleChange(x.key)}
                />
                {x.label}
                <br />
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}