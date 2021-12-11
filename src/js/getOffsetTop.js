const getOffsetTop = item => {
  if (!item) {
    return 0;
  }
  if (!item.offsetParent) {
    return item.offsetTop;
  }
  return item.offsetTop + getOffsetTop(item.offsetParent);
};

export default getOffsetTop;
