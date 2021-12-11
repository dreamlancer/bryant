/**
 * Event path polyfill, for example, Safari does not implement Event.path
 * @source https://github.com/DieterHolvoet/event-propagation-path
 */
const getEventPath = event => {
  var polyfill = () => {
    var element = event.target || null;
    var pathArr = [element];

    if (!element || !element.parentElement) {
      return [];
    }

    while (element.parentElement) {
      element = element.parentElement;
      pathArr.unshift(element);
    }

    return pathArr;
  };

  return (
    event.path || (event.composedPath && event.composedPath()) || polyfill()
  );
};

export default getEventPath;
