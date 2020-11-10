export const convertRemToPixels = (rem) => {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
};

export const convertPixelsToRem = (px) => {
  return px / parseFloat(getComputedStyle(document.documentElement).fontSize);
};
