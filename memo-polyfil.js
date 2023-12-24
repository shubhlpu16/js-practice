const memoizedAsyncFunction = (fn) => {
  let cache = new Map();

  return async function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = await fn(...args);
    cache.set(key, result);
    return result;
  };
};

const getMemo = memoizedAsyncFunction(async function (x) {
  console.log("Executing costly operation");
  return x * 2;
});

(async () => {
  console.log(await getMemo(2));
  console.log(await getMemo(2));
  console.log(await getMemo(2));
  console.log(await getMemo(3));
})();

const memoFib = (n, memo = {}) => {
  if (n in memo) {
    return memo[n];
  }

  if (n <= 1) {
    return n;
  }

  memo[n] = memoFib(n - 1, memo) + memoFib(n - 2, memo);
  return memo[n];
};

console.log("memo", memoFib(8));
