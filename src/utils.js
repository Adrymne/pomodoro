// See: http://ramdajs.com/docs/#cond
export const cond = pairs => (...args) => {
  const result = pairs.find(([predicate]) => predicate(...args));
  if (result) {
    return result[1](...args);
  }
};

// See: http://ramdajs.com/docs/#anyPass
export const anyPass = preds => (...args) => preds.some(p => p(...args));
