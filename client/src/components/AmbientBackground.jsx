import React, { useContext } from "react";
import ThemeContext from "context/ThemeContext";
import { Shape, ShapeContainer } from "styling/ambientBackground";
import { colorToWhiteArray } from "processing/colors";

const AmbientBackground = (props) => {
  const NUM_OF_SHAPES = 30;
  const themeColor = useContext(ThemeContext);
  const colors = colorToWhiteArray(themeColor, NUM_OF_SHAPES);

  const getBackgroundShapes = () => {
    return [...Array(NUM_OF_SHAPES).keys()].map((i) => (
      <Shape
        key={i}
        style={{
          right: `${i}rem`,
          top: `${i}rem`,
          animationDelay: `${i / 10}s`,
          backgroundColor: colors[i],
        }}
      />
    ));
  };

  return <ShapeContainer>{getBackgroundShapes()}</ShapeContainer>;
};

export default AmbientBackground;
