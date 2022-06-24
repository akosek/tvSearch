const _getDOMElem = (attribute, value) => {
  return document.querySelector(`[${attribute}="${value}"]`);
};

export const mapListToDOMElements = (listOfValues, attribute) => {
  const _viewElem = {};

  for (const value of listOfValues) {
    _viewElem[value] = _getDOMElem(attribute, value);
  }
  return _viewElem;
};

export const createDOMElement = (tagName, className, innerText, src) => {
  const tag = document.createElement(tagName);
  tag.classList = className;

  if (innerText) tag.innerText = innerText;
  if (src) tag.src = src;

  return tag;
};
