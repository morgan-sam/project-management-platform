import React, { useState, useContext } from "react";
import { parseLittleEndianToISOTime } from "processing/dates";
import { getOppositeRGB } from "styling/theme";
import ThemeContext from "context/ThemeContext";

const ClickableCellText = (props) => {
  const { cellType, filterOptions, setFilterOptions, selected } = props;
  const themeColor = useContext(ThemeContext);

  const [hoveredItem, setHoveredItem] = useState(false);

  const containerStyle = {
    display: "inline-block",
    width: "auto",
    cursor: "pointer",
  };

  const textClick = (text) => {
    if (cellType === "date")
      setFilterOptions({
        ...filterOptions,
        date: parseLittleEndianToISOTime(text),
        active: true,
      });
    if (cellType === "deadline")
      setFilterOptions({
        ...filterOptions,
        deadline: parseLittleEndianToISOTime(text),
        active: true,
      });
    if (cellType === "urgency")
      setFilterOptions({
        ...filterOptions,
        urgency: { min: parseInt(text), max: parseInt(text), active: true },
      });
    if (cellType === "teams")
      setFilterOptions({ ...filterOptions, teams: [text], active: true });
  };

  const textDivs = (text) => {
    const array = text.toString().split(" ");
    return array.map((el, i) => (
      <div
        key={i}
        style={{
          color:
            hoveredItem === el
              ? selected
                ? `rgb(${getOppositeRGB(themeColor).join(",")})`
                : "red"
              : props.color,
        }}
        onClick={() => textClick(el)}
        onMouseOver={() => setHoveredItem(el)}
        onMouseLeave={() => setHoveredItem(null)}
      >
        {el}
      </div>
    ));
  };

  return (
    <div
      style={containerStyle}
      className={`clickableCellText ${props.className}`}
    >
      {textDivs(props.text)}
    </div>
  );
};

export default ClickableCellText;
