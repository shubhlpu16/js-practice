/*
Polyfills

1. Map  - X
2. Filter -X
3. Reduce - X
4. Bind - X
5. Call -X
6. Apply -X
7. Promise
8. PromiseAll -X
9. PromiseRace
10. Debounce -X
11. Throttle -X
12. DeepClone- X
13. Flat- X
14. Flatten -X
15. Memoize -X

16. Currying -X
17. Factory Pattern -X
18. Observer Pattern -X
19. Singleton Pattern -X
20. Module Pattern -X
21. Sort -X
22. Shuffle -X
24. Async and defer
25. Lazy loading
26. React Design Patterns- HOC, Render Props, Context API, Hooks
27. LRU - X
28. Moves 0 to end - X
*/

Array.prototype.map1 = function (callback) {
  const array = this;
  const result = [];

  for (let i = 0; i < array.length; i++) {
    result.push(callback(array[i], i, array));
  }
  return result;
};

Array.prototype.filter1 = function (callback) {
  const array = this;
  const result = [];

  for (let i = 0; i < array.length; i++) {
    const condition = callback(array[i], i, array);
    if (condition) result.push(array[i]);
  }
  return result;
};

Array.prototype.reduce1 = function (callback, accum) {
  const array = this;
  let acc = accum !== undefined ? accum : array[0];

  for (let i = 0; i < array.length; i++) {
    acc = callback(acc, array[i], i, array);
  }
  return acc;
};

Array.prototype.slice1 = function (sI, eI) {
  const array = this;
  const result = [];
  let startIndex = sI == undefined ? 0 : sI < 0 ? array.length + sI : sI;
  let endIndex =
    eI == undefined ? array.length : eI < 0 ? array.length + eI : eI;

  for (let i = startIndex; i < endIndex; i++) {
    result.push(array[i]);
  }
  return result;
};
// const arr = [1, 2, 3, 4];
// console.log(arr.slice1(-3, -2));

class Person {
  constructor() {
    this.name = "Shubham";
    this.age = "27";
  }

  greeting(sal = "", lastName = "") {
    console.log(
      `Hi my name is ${sal} ${this.name} ${lastName}, my age is ${this.age}`
    );
  }
}

Function.prototype.bind1 = function (thisArgs, ...args) {
  thisArgs = thisArgs || globalThis;
  const fn = Symbol("fn");
  thisArgs[fn] = this;

  return (...nextArgs) => {
    const result = thisArgs[fn](...args, ...nextArgs);
    delete thisArgs[fn];
    return result;
  };
};

Function.prototype.call1 = function (thisArgs, ...args) {
  thisArgs = thisArgs || globalThis;
  const fn = Symbol("fn");
  thisArgs[fn] = this;

  const result = thisArgs[fn](...args);
  delete thisArgs[fn];
  return result;
};

Function.prototype.apply1 = function (thisArgs, args) {
  thisArgs = thisArgs || globalThis;
  const fn = Symbol("fn");
  thisArgs[fn] = this;

  const result = thisArgs[fn](...args);
  delete thisArgs[fn];
  return result;
};

// const person = new Person();
// person.greeting();

// const greet = person.greeting.apply1({ name: "Kaya", age: 24 }, [
//   "Mrs",
//   "Saxena",
// ]);

const flatten = (arr, level = 1) => {
  let res = [];

  arr.forEach((element) => {
    if (Array.isArray(element) && level > 0) {
      res = res.concat(flatten(element, level - 1));
    } else {
      res.push(element);
    }
  });
  return res;
};

const arr = [1, [2, 3], 4, 5, [6, 7, [8, [9]]]];

Array.prototype.flatten1 = function (level) {
  let res = [];

  this.forEach((element) => {
    if (Array.isArray(element) && level > 0) {
      res = res.concat(element.flatten1(level - 1));
    } else {
      res.push(element);
    }
  });
  return res;
};

// console.log(arr.flatten1(Infinity));

const flattenJSON = (obj, parentKey = "") => {
  // let res = {};

  // Object.keys(obj).forEach((key) => {
  //   const newKey = parentKey ? `${parentKey}.${key}` : key;

  //   if (typeof obj[newKey] == "object") {
  //     res = { ...res, ...flattenJSON(obj[key], newKey) };
  //   } else {
  //     res = { ...res, [newKey]: obj[key] };
  //   }
  // });
  // return res;

  return Object.keys(obj).reduce((acc, key) => {
    const newKey = parentKey ? `${parentKey}.${key}` : key;
    if (typeof obj[key] == "object") {
      return { ...acc, ...flattenJSON(obj[key], newKey) };
    } else {
      return { ...acc, [newKey]: obj[key] };
    }
  }, {});
};

// const nestedJSON = { a: { b: { c: 1 } } };
// const flattenedJSON = flattenJSON(nestedJSON);
// console.log(flattenedJSON);

const obj = {
  a: {
    b: "b",
    c: {
      d: "d",
      e: "e",
    },
  },
  d: "df",
};

//a.b.c.d

const parseObj = (obj, keyCheck) => {
  const keys = keyCheck.split(".");
  if (keys.length === 1) {
    return obj?.[keys[0]];
  }

  return parseObj(obj[keys[0]], keys.slice(1).join("."));
};

// console.log(parseObj(obj, "a.c"));

const deepCompare = (obj1, obj2) => {
  if (obj1 === obj2) return true; // Direct comparison for primitive values & same reference

  if (
    typeof obj1 !== "object" ||
    obj1 === null ||
    typeof obj2 !== "object" ||
    obj2 === null
  ) {
    return false; // If one is not an object or is null, they are not equal
  }
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (!keys2.includes(key) || !deepCompare(obj1[key], obj2[key])) {
      return false; // Check if key exists in both and compare values recursively
    }
  }
  return true;
};

// // Example usage:
// const obj1 = { a: 1, b: { c: 2 } };
// const obj2 = { a: 1, b: { c: 2 } };
// const obj3 = { a: 1, b: { c: 3 } };

// console.log(deepCompare(obj1, obj2)); // Output: true
// console.log(deepCompare(obj1, obj3)); // Output: false

const memo = (cb) => {
  const cache = {};

  return (...args) => {
    const key = JSON.stringify(args);

    if (cache[key]) {
      return cache[key];
    }
    const res = cb(...args);
    cache[key] = res;
    return res;
  };
};

const memoFib = (n, cache = { 0: 1, 1: 1 }) => {
  if (n in cache) {
    return cache[n];
  }

  cache[n] = memoFib(n - 1, cache) + memoFib(n - 2, cache);
  return cache[n];
};

const debounce = (cb, delay) => {
  let timeoutId;

  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => cb.apply(this, args), delay);
  };
};

const throttle = (cb, delay) => {
  let isCalled = false;

  return (...args) => {
    if (!isCalled) {
      cb.apply(this, args);
      isCalled = true;
      setTimeout(() => {
        isCalled = false;
      }, delay);
    }
  };
};

Array.prototype.sort1 = function (callback) {
  const arr = this;
  const n = arr.length;
  const compareFn = callback || ((a, b) => String(a) > String(b));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (compareFn(arr[j], arr[j + 1])) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }

  return arr;
};

const arr1 = [2, 4, 1, 4, 5, 0];
// console.log(arr1.sort());

Array.prototype.shuffle = function () {
  const arr = this;
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    const randIndex = Math.floor(Math.random() * i + 1);
    [arr[i], arr[randIndex]] = [arr[randIndex], arr[i]];
  }
  return arr;
};

// console.log(arr1.shuffle());

const deepClone = (obj, map = new WeakMap()) => {
  if (obj == null) {
    return null;
  }

  if (typeof obj != "object") {
    return obj;
  }

  if (map.has(obj)) {
    return map.get(obj);
  }

  const clone = Array.isArray(obj) ? [] : {};
  map.set(obj, clone);

  Object.keys(obj).forEach((key) => {
    clone[key] = deepClone(obj[key], map);
  });

  return clone;
};

const memoizeWithLRU = (cb, cacheSize, expiryTime) => {
  const cache = new Map();
  const lruList = [];

  const removeFromLRU = (key) => {
    const index = lruList.indexOf(key);
    if (index > -1) lruList.splice(index, 1);
  };

  return async (...args) => {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      const { value, expiry } = cache.get(key);

      if (expiry >= Date.now()) {
        removeFromLRU(key);
        lruList.unshift(key);
        return value;
      } else {
        removeFromLRU(key);
        cache.delete(key);
      }
    }

    const result = await cb(...args);

    cache.set(key, { value: result, expiry: Date.now() + expiryTime });
    lruList.unshift(key);

    if (cache.size > cacheSize) {
      const removedKey = lruList.pop();
      cache.delete(removedKey);
    }
    return result;
  };
};
// Example usage
const memoizedAsyncFunction = memoizeWithLRU(
  async function (x) {
    console.log("Executing costly operation");
    return x * 2;
  },
  2, // Cache size
  5000 // Expiry time in milliseconds (5 seconds)
);

// (async () => {
//   console.log(await memoizedAsyncFunction(2)); // Calls the original function and caches the result
//   console.log(await memoizedAsyncFunction(2)); // Uses the cached result
//   console.log(await memoizedAsyncFunction(4)); // Uses the cached result
//   console.log(await memoizedAsyncFunction(2)); // Uses the cached result
//   console.log(await memoizedAsyncFunction(3)); // Uses the cached result
//   console.log(await memoizedAsyncFunction(4)); // Uses the cached result

//   // Wait for expiry
//   await new Promise((resolve) => setTimeout(resolve, 6000));

//   console.log(await memoizedAsyncFunction(2)); // Calls the original function again due to expiry
// })();

const arr2 = [0, 1, 0, 2, 3, 0, 4, 5, 0, 0];

const moveOsToEnd = (arr) => {
  let nonZeroIndex = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] != 0) {
      [arr[i], arr[nonZeroIndex]] = [arr[nonZeroIndex], arr[i]];
      nonZeroIndex++;
    }
  }
  return arr;
};

// console.log(moveOsToEnd(arr2));

const curry = (cb) => {
  const curried = (...args) => {
    if (args.length >= cb.length) return cb.apply(this, args);

    return (...nextArgs) => curried(...args, ...nextArgs);
  };

  return curried;
};

// const sum = (a, b, c, d) => a + b + c + d;

// const curriedSum = curry(sum);

// console.log(curriedSum(1)(2)(2)(4));

const sum = (a) => {
  const add = (b) => {
    if (b >= 0) {
      return sum(a + b);
    }
    return a;
  };

  add[Symbol.toPrimitive] = () => a;
  return add;
};

// console.log(+sum(1)(2)(0)(5));

const infiniteSum = (...args) => {
  const a = args.reduce((acc, i) => acc + i, 0);

  const add = (...nextArgs) => {
    const b = nextArgs.reduce((acc, i) => acc + i, 0);

    if (nextArgs.length) {
      return infiniteSum(a + b);
    }
    return a;
  };

  return add;
};

// console.log(infiniteSum(1, 2, 3)(2, 3)(0, 2)(0)(5)());

const counter = (init = 0) => {
  let i = init;

  return {
    incement: () => ++i,
    decrement: () => --i,
  };
};

// const count = counter(0);

// console.log(count.incement());

// console.log(count.incement());

// console.log(count.decrement());

const once = (fn) => {
  let called = false;

  return (...args) => {
    if (!called) {
      fn(...args);
      called = true;
    }
  };
};

const private = (secret) => {
  return {
    set: (a) => (secret = a),
    get: () => secret,
  };
};

function Person1(name, age) {
  this.name = name;
  this.age = age;
}

function createFactory(fn) {
  return (...args) => {
    return new fn(...args);
  };
}

class Singleton {
  static instance;

  constructor() {
    if (!Singleton.instance) {
      Singleton.instance = this;
    }
    return Singleton.instance;
  }
}

class Singleton1 {
  static instance;

  constructor(fn, ...args) {
    if (!Singleton1.instance) {
      Singleton1.instance = new fn(...args);
    }
    return Singleton1.instance;
  }
}

function Fn(init) {
  this.init = init;

  this.increment = function () {
    return ++this.init;
  };

  this.getCount = function () {
    return this.init;
  };
}

// const c = new Singleton(Fn, 0);

// console.log(c.increment()); // 1
// console.log(c.increment()); // 2

class Observer {
  constructor() {
    this.subscriber = [];
  }

  subscribe(fn) {
    this.subscriber.push(fn);
  }

  unsubscribe(fn) {
    this.subscriber = this.subscriber.filter((key) => key !== fn);
  }

  notify(val) {
    this.subscriber.forEach((fn) => fn(val));
  }
}
const CounterModule = (function () {
  let count = 0; // Private variable

  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count,
  };
})();

class MyPromise {
  constructor(executor) {
    this.state = "pending";
    this.value = null;
    this.reason = null;
    this.fulfilledCallbacks = [];
    this.rejectedCallbacks = [];

    const resolve = (value) => {
      if (this.state !== "pending") return;

      if (value && typeof value.then === "function") {
        return value.then(resolve, reject);
      }

      this.state = "fulfilled";
      this.value = value;
      this.fulfilledCallbacks.forEach((cb) => cb(value));
    };

    const reject = (reason) => {
      if (this.state !== "pending") return;

      this.state = "rejected";
      this.reason = reason;
      this.rejectedCallbacks.forEach((cb) => cb(reason));
    };

    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      const handleSuccess = () => {
        queueMicrotask(() => {
          try {
            const result = onFulfilled ? onFulfilled(this.value) : this.value;
            resolve(result);
          } catch (error) {
            reject(error);
          }
        });
      };

      const handleFailure = () => {
        queueMicrotask(() => {
          try {
            if (onRejected) {
              const result = onRejected(this.reason);
              resolve(result);
            } else {
              reject(this.reason);
            }
          } catch (error) {
            reject(error);
          }
        });
      };

      if (this.state === "fulfilled") {
        handleSuccess();
      } else if (this.state === "rejected") {
        handleFailure();
      } else {
        this.fulfilledCallbacks.push(handleSuccess);
        this.rejectedCallbacks.push(handleFailure);
      }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  static resolve(value) {
    return new MyPromise((resolve) => resolve(value));
  }

  static reject(reason) {
    return new MyPromise((_, reject) => reject(reason));
  }
}

const promiseAll = (promises) => {
  return new MyPromise((res, rej) => {
    if (!Array.isArray(promises)) {
      return rej(new TypeError("Argument must be an array"));
    }

    let count = 0;
    const results = new Array(promises.length);

    promises.forEach((promise, index) => {
      MyPromise.resolve(promise)
        .then((value) => {
          results[index] = value;
          count++;
          if (count === promises.length) {
            res(results);
          }
        })
        .catch((error) => rej(error));
    });
  });
};

// Test cases
const promise1 = 1;
const promise2 = new MyPromise((resolve) => resolve(2));
const promise3 = new MyPromise((resolve) => setTimeout(() => resolve(3), 1000));

promiseAll([promise1, promise2, promise3]).then(console.log); // [1, 2, 3] after 1 sec
