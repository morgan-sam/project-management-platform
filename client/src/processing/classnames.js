export const getParentsClassList = (el) => {
  var parents = [];
  for (; el && el !== document; el = el.parentNode)
    if (el.className) parents.push(el.className);
  return parents.join(" ");
};
