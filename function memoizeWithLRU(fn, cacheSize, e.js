function memoizeWithLRU(fn, cacheSize, expiryTime) {
  const cache = new Map();
  const lruList = [];

  function removeFromLRU(key) {
    const index = lruList.indexOf(key);
    if (index > -1) lruList.splice(index, 1);
  }

  return async function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      const { value, expiry } = cache.get(key);
      if (expiry >= Date.now()) {
        removeFromLRU(key);
        lruList.unshift(key);
        return value;
      } else {
        cache.delete(key);
        removeFromLRU(key);
      }
    }

    const result = await fn(...args);
    const expiry = Date.now() + expiryTime;
    cache.set(key, { value: result, expiry });
    lruList.unshift(key);

    if (cache.size > cacheSize) {
      const removedKey = lruList.pop();
      cache.delete(removedKey);
    }

    return result;
  };
}

// Example usage
const memoizedAsyncFunction = memoizeWithLRU(
  async function (x) {
    console.log("Executing costly operation");
    return x * 2;
  },
  2, // Cache size
  5000 // Expiry time in milliseconds (5 seconds)
);

(async () => {
  console.log(await memoizedAsyncFunction(2)); // Calls the original function and caches the result
  console.log(await memoizedAsyncFunction(2)); // Uses the cached result
  console.log(await memoizedAsyncFunction(4)); // Uses the cached result
  console.log(await memoizedAsyncFunction(2)); // Uses the cached result
  console.log(await memoizedAsyncFunction(3)); // Uses the cached result
  console.log(await memoizedAsyncFunction(4)); // Uses the cached result

  // Wait for expiry
  await new Promise((resolve) => setTimeout(resolve, 6000));

  console.log(await memoizedAsyncFunction(2)); // Calls the original function again due to expiry
})();
