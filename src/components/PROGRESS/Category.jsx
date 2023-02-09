import AnimateHeight from "react-animate-height";

export default function OptionsBox({
  displayData,
  subcategories,
  handleChange,
  heightDropdown,
  setHeightDropdown,
  categoryName,
}) {
  return (
    <div className="categoryWrapper">
      <div className="category">
        <label className="bold pointer">
          <input
            type="checkbox"
            checked={
              !!displayData[0] &&
              subcategories.every((x) => displayData[0].hasOwnProperty(x.key))
            }
            onChange={() => handleChange(categoryName)}
          />
          {categoryName.toUpperCase()}
        </label>
        <img
          aria-controls="image_dropdown"
          className="pointer"
          src={
            !heightDropdown
              ? "https://img.icons8.com/material-outlined/24/null/filled-plus-2-math.png"
              : "https://img.icons8.com/material-outlined/24/null/indeterminate-checkbox.png"
          }
          onClick={() => setHeightDropdown(heightDropdown === 0 ? "auto" : 0)}
        />
      </div>
      <div className="subCategory">
        <AnimateHeight
          id="image_dropdown"
          duration={500}
          height={heightDropdown}
        >
          {subcategories.map((x, i) => {
            return (
              <label className="labelSub pointer" key={i}>
                <input
                  type="checkbox"
                  checked={!!displayData[0] && x.key in displayData[0]}
                  onChange={() => handleChange(x.key)}
                />
                {x.label}
                <br />
              </label>
            );
          })}
        </AnimateHeight>
      </div>
    </div>
  );
}
