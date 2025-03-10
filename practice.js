// const obj = {
//   a: {
//     b: "b",
//     c: {
//       d: "d",
//       e: "e",
//     },
//   },
//   d: "df",
// };

// const parseObj = (obj, path) => {
//   const keys = path.split(".");
//   if (keys.length === 1) {
//     return obj[keys[0]];
//   }

//   return parseObj(obj[keys[0]], keys.slice(1).join("."));
// };

// console.log(parseObj(obj, "a.c.d")); // Output: d

// const increment = (n) => {
//   let count = n;

//   return () => {
//     return count++;
//   };
// };

// const inc = increment(5);
// console.log(inc()); // Output: 5
// console.log(inc()); // Output: 6
// console.log(inc()); // Output: 7

// const currySum = (...args) => {
//   return function (...args2) {
//     if (args2.length === 0) {
//       return args.reduce((acc, val) => acc + val, 0);
//     }

//     return currySum(...args, ...args2);
//   };
// };

// console.log(currySum(1)(2)(3)(4)(5)(6)(0)(8)(9)(10)()); // Output: 48

// function curryMul(x = 1) {
//   let product = x;
//   function mul(y) {
//     if (y === undefined) {
//       return product;
//     }
//     product *= y;
//     return curryMul(product);
//   }
//   mul.toString = () => product;
//   return mul;
// }

// // console.log(curryMul(1)(2)(3)(4)(5)(6)(8)(9)(10)); //Output:0

// function sum(a = 0) {
//   function add(b) {
//     if (b === undefined) {
//       return a;
//     }
//     return sum(a + b);
//   }
//   add.toString = () => a; // Custom coercion
//   return add;
// }

// const sum1 = sum(1);
// console.log(sum1(2).toString()); // Output: 3
// console.log(sum(1)(2)(3)()); // true

//infinite curry

const sum = (...a) => {
  const a1 = a.reduce((acc, val) => acc + val, 0);
  const inner = (...b) => {
    if (b.length === 0) {
      return a1;
    }
    return sum(a1 + b.reduce((acc, val) => acc + val, 0));
  };
  inner.toString = () => a1;
  return inner;
};

console.log(sum(1, 3, 3)(0)(4)(5)(0).toString());

const mul = (...a) => {
  const a1 = a.reduce((acc, val) => acc * val, 1);
  const inner = (...b) => {
    if (b.length === 0) {
      return a1;
    }
    return mul(a1 * b.reduce((acc, val) => acc * val, 1));
  };
  inner.toString = () => a1;
  return inner;
};

console.log(mul(1, 3, 3)(1)(4)(5)(1).toString());

function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return (...nextArgs) => curried(...args, ...nextArgs);
  };
}

const multiply = (a, b, c, d, e) => a * b * c * d * e;
const curriedMultiply = curry(multiply);
console.log(curriedMultiply(1)(2)(3)(4)(5));

const arr = [2, 4, 1, 5, 3, 4, 3, 6];

const findNthMin = (arr, n) => {
  if (n > arr.length) return null;
  let min;
  const copyArr = [...arr];
  for (let i = 0; i < n; i++) {
    min = Math.min(...copyArr);
    copyArr.splice(copyArr.indexOf(min), 1);
  }
  return min;
};

console.log(findNthMin(arr, 4));

const findMin = (arr) => {
  let firstMin = Infinity;
  let secondMin = Infinity;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < firstMin) {
      secondMin = firstMin;
      firstMin = arr[i];
    } else if (arr[i] < secondMin && arr[i] !== firstMin) {
      secondMin = arr[i];
    }
  }
};
