const _getDOMElem = (attribute, value) => {
  return document.querySelectorAll(`[${attribute}="${value}"]`);
};

export const mapListToDOMElements = (listOfValues, attribute) => {
  const _viewElem = {};

  for (const value of listOfValues) {
    _viewElem[value] = _getDOMElem(attribute, value);
  }
  return _viewElem;
};
