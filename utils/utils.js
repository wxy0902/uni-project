export function debounce(func,wait) {
  let timeout;
  return function () {
      const context = this;
      const args = [...arguments];
      if (timeout) clearTimeout(timeout);
      const callNow = !timeout;
      timeout = setTimeout(() => {
          timeout = null;
      }, wait)
      if (callNow) func.apply(context, args)
  }
}
