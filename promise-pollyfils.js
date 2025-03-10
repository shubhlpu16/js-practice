// class MyPromise {
//   constructor(executor) {
//     this.state = "pending"; // "fulfilled" | "rejected"
//     this.value = undefined;
//     this.onFulfilled = [];
//     this.onRejected = [];

//     const resolve = (value) => {
//       if (this.state !== "pending") return; // Prevent multiple resolves

//       if (value instanceof MyPromise) {
//         return value.then(resolve, reject); // Handle nested Promises
//       }

//       this.state = "fulfilled";
//       this.value = value;
//       this.onFulfilled.forEach((fn) => fn(value));
//     };

//     const reject = (reason) => {
//       if (this.state !== "pending") return; // Prevent multiple rejects

//       this.state = "rejected";
//       this.value = reason;
//       this.onRejected.forEach((fn) => fn(reason));
//     };

//     try {
//       executor(resolve, reject);
//     } catch (err) {
//       reject(err);
//     }
//   }

//   then(onFulfilled, onRejected) {
//     return new MyPromise((resolve, reject) => {
//       const handleFulfill = () => {
//         queueMicrotask(() => {
//           try {
//             const result = onFulfilled ? onFulfilled(this.value) : this.value;
//             resolve(result);
//           } catch (error) {
//             reject(error);
//           }
//         });
//       };

//       const handleReject = () => {
//         queueMicrotask(() => {
//           try {
//             if (!onRejected) {
//               reject(this.value); // If no handler, propagate rejection
//             } else {
//               const result = onRejected(this.value);
//               resolve(result);
//             }
//           } catch (error) {
//             reject(error);
//           }
//         });
//       };

//       if (this.state === "fulfilled") {
//         handleFulfill();
//       } else if (this.state === "rejected") {
//         handleReject();
//       } else {
//         this.onFulfilled.push(handleFulfill);
//         this.onRejected.push(handleReject);
//       }
//     });
//   }

//   catch(onRejected) {
//     return this.then(null, onRejected);
//   }

//   static resolve(value) {
//     return new MyPromise((resolve) => resolve(value));
//   }

//   static reject(reason) {
//     return new MyPromise((_, reject) => reject(reason));
//   }
// }

// // ✅ Example Usage
// const p1 = new MyPromise((resolve) => setTimeout(() => resolve("Hello"), 1000));
// p1.then(console.log); // After 1s: "Hello"

// const p2 = MyPromise.resolve(42);
// p2.then(console.log); // Logs 42 immediately

// const p3 = MyPromise.reject("Error!");
// p3.catch(console.error); // Logs "Error!"

// // ✅ Chaining works
// MyPromise.resolve(1)
//   .then((x) => x + 1)
//   .then((x) => x * 3)
//   .then(console.log); // Logs 6

// // ✅ Handling errors correctly
// const p4 = new MyPromise((_, reject) => reject("Failed"));
// p4.then(() => console.log("Won't run")).catch(console.error); // Logs "Failed"
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

promiseAll([promise1, promise3, promise2])
  .then((r) => console.log(r))
  .catch((e) => console.log(e));
