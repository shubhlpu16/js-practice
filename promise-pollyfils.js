function myPromise(callback) {
    let onResolve;
    let onReject;
    let isCalled=false;
    let isFullfiled=false;
    let isRejected=false;
    let val;
    let err;

    this.then=function (resolveHandler){
        onResolve=resolveHandler
        if(!isCalled && isFullfiled) {
            onResolve(val)
            isCalled=true
        }
        return this
    }

    this.catch=function (rejectHandler){
        onReject=rejectHandler
        if(!isCalled && isRejected) {
            onReject(err)
            isCalled=true
        }
        return this
    }

    function resolve(value){
        val=value
        isFullfiled=true
        if(typeof onResolve=="function" && !isCalled) {
            onResolve(value)
        }
       
    }

    function reject(error){
        err=error
        isRejected=true
        if(typeof onReject=="function" && !isCalled ) {
            onReject(error)
        }
    }

    callback(resolve, reject)
}

myPromise.reject=(reason=>{
    return new myPromise((reject)=>{
        reject(reason)
    })
})

myPromise.resolve=(val=>{
    return new myPromise((resolve)=>{
        resolve(val)
    })
})

myPromise.all=(promises)=>{
return new myPromise((resolve,reject)=>{
    if(!Array.isArray(promises)) {
        return reject(new TypeError('promises is not array'))
    }
    let results=[]
    let count=0
    promises.forEach((promise)=>{
        Promise.resolve(promise).then((res)=>{
            results.push(res)
            count++
            if(count===promises.length){
                resolve(results)
            }
        }).catch((err)=>{
            reject(err)
        })
    })
})
}


const p = new myPromise((resolve)=>{setTimeout(()=>resolve('setTime'),200)})

const p1 = new myPromise((resolve)=>{resolve('hello')})

p.then((res)=>{
    console.log(res)
}).catch((e)=>{
    console.log(e)
})

p1.then((res)=>{
    console.log(res)
}).catch((e)=>{
    console.log(e)
})

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
  
  PromiseAll([promise1, promise3, promise2]).then(r => console.log('PromiseAll',r)).catch(e => console.log(e))
const pall=  myPromise.all([promise1, promise3, promise2])
pall.then((res)=>{
    console.log('myPromiseAll',res)
})