const arr = [1, 2, 3, 4, 5, 6];

Array.prototype.myReduce = function (cb, initial) {
  const array = this;
  const length = array.length;
  let acc = initial === undefined ? array[0] : initial;

  for (let index = 0; index < length; index++) {
    acc = cb.call(undefined, acc, array[index], arr);
  }
  return acc;
};

console.log(arr.myReduce((acc, a) => a + acc, 0));

Array.prototype.flatten = function (level) {
  const flat = [];
  this.map((arr) => {
    if (Array.isArray(arr)) {
      flat = flat.concat(flatten(arr));
    } else {
      flat.push(arr);
    }
  });
  return flat;
};

const flatten = (arr) => {
  let flat = [];
  arr.forEach((element) => {
    if (Array.isArray(element)) {
      flat = flat.concat(flatten(element));
    } else {
      flat.push(element);
    }
  });

  return flat;
};

console.log(flatten([1, 2, [4, 5, 6], 7, [8, [9, 10]]]));
//reduce polyfikll ?

const debounce = (cb, delay) => {
  let timeoutId = null;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    } else {
      timeoutId = setTimeout(() => cb(...args), delay);
    }
  };
};

const throttle = (cb, delay) => {
  let lastCall = false;
  return (...args) => {
    if (!lastCall) {
      cb(...args);
      lastCall = true;
      setTimeout(() => (lastCall = false), delay);
    }
  };
};

const reverseString = (s) => {
  let str = s.split("");
  let i = 0;
  let j = str.length - 1;

  // Swap characters until the two pointers meet
  while (i < j) {
    let temp = str[i];
    str[i] = str[j];
    str[j] = temp;
    i++;
    j--;
  }
  str = str.join("");
  return str === s;
};

console.log(reverseString("asa"));

function objectFactory() {
  // Define a private object to store instances
  const instances = {};

  // Return a function that creates or retrieves an instance for a given key
  return function (key) {
    if (!instances[key]) {
      // Create a new instance if it doesn't exist
      instances[key] = { key };
    }

    return instances[key];
  };
}

// Create an instance of the object factory
const createObject = objectFactory();

// Use the factory function to get instances
const instance1 = createObject("key1");
const instance2 = createObject("key2");

console.log(instance1 === createObject("key1")); // Output: true (same instance)
console.log(instance1 === createObject("key2")); // Output: false (different instance)

function insertSpirally() {
  const grid = [];
  const size = 10;

  for (let i = 0; i < size; i++) {
    grid[i] = [];
  }

  let num = 1;
  let top = 0;
  let bottom = size - 1;
  let left = 0;
  let right = size - 1;

  while (num <= size * size) {
    for (let i = left; i <= right; i++) {
      grid[top][i] = num++;
    }
    top++;

    for (let i = top; i <= bottom; i++) {
      grid[i][right] = num++;
    }
    right--;

    for (let i = right; i >= left; i--) {
      grid[bottom][i] = num++;
    }
    bottom--;

    for (let i = bottom; i >= top; i--) {
      grid[i][left] = num++;
    }
    left++;
  }

  return grid;
}

function printGrid(grid) {
  for (let i = 0; i < grid.length; i++) {
    console.log(grid[i].join("\t"));
  }
}

const spiralGrid = insertSpirally();
printGrid(spiralGrid);

class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

const nodesBelowK = [];
function findNodesBelowKLevels(root, targetValue, k) {
  function dfs(node, level) {
    if (node === null) return;

    if (level === k) {
      nodesBelowK.push(node.value);
      return;
    }

    dfs(node.left, level + 1);
    dfs(node.right, level + 1);
  }

  function findReferenceNode(node) {
    if (node === null) return null;

    if (node.value === targetValue) {
      return node;
    }

    const left = findReferenceNode(node.left);
    const right = findReferenceNode(node.right);

    return left || right;
  }

  const referenceNode = findReferenceNode(root);
  if (referenceNode) {
    dfs(referenceNode, 0);
  }

  return nodesBelowK;
}

// Example Usage:

// Creating a sample binary tree
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.right.left = new TreeNode(6);
root.right.right = new TreeNode(7);

const targetValue = 1;
const k = 2;

const nodesBelowK1 = findNodesBelowKLevels(root, targetValue, k);
console.log(
  "Nodes below",
  k,
  "levels from node with value",
  targetValue,
  "are:",
  nodesBelowK1
);

function flattenJSON(obj, parentKey = "") {
  return Object.keys(obj).reduce((acc, key) => {
    const newKey = parentKey ? `${parentKey}.${key}` : key;

    if (typeof obj[key] === "object") {
      return { ...acc, ...flattenJSON(obj[key], newKey) };
    }

    return { ...acc, [newKey]: obj[key] };
  }, {});
}

// Example usage:
const nestedJSON = { a: { b: { c: 1 } } };
const flattenedJSON = flattenJSON(nestedJSON);

console.log(flattenedJSON);

function deepCompare(obj1, obj2) {
  // Check if both are objects
  if (typeof obj1 !== "object" || typeof obj2 !== "object") {
    return obj1 === obj2;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (!keys2.includes(key) || !deepCompare(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}

// Example usage:
const obj1 = { a: 1, b: { c: 2 } };
const obj2 = { a: 1, b: { c: 2 } };
const obj3 = { a: 1, b: { c: 3 } };

console.log(deepCompare(obj1, obj2)); // Output: true
console.log(deepCompare(obj1, obj3)); // Output: false

 function PromiseAll(promises) {
  return new Promise((resolve, reject) => {

    if (!Array.isArray(promises)) {
      return reject(new TypeError('promises is not array'))
    }


    let results = [];
    let counter = 0

    promises.forEach(promise => {
      Promise.resolve(promise).then((result) => {
        results.push(result)
        counter++
        if (counter === promises.length) {
          resolve(results)
        }
      }).catch((e) => reject(e))
    })
  })
}

const promise1 = 1;
const promise2 = new Promise((resolve) => resolve(2))
const promise3 = new Promise(resolve => setTimeout(() => {
  resolve(3)
}, 1000))

PromiseAll([promise1, promise3, promise2]).then(r => console.log(r)).catch(e => console.log(e)) */


function add(a) {
return function(b) {
  if(b) {
  return add(a+b)
  }
  return a
}
}

const add = a => {
  return (b) => {
    if (b) {
      return add(a + b)
    }
    return a
  }
} 
function add(...args) {
  const a = args.reduce(((a, b) => a + b), 0)
  return function(...args) {
    const b = args.reduce(((a, b) => a + b), 0)
    if (b) {
      return add(a + b)
    }
    return a;
  }
}
console.log(add(1,2,3)(2,4)(3,5,6,7,8)(4)())

function add(a){
return function(b) {
return a+b
}
}

const add5=add(5)
console.log(add5(6)) 