class Promise{
			constructor(executor) {
				const self = this;
				this.PromiseStatus = 'pending'
				this.PromiseResult = null;
				this.callbacks = []
				function resolve(data) {
					if (self.PromiseStatus !=='pending') return
						self.PromiseStatus = 'fulfilled'
						self.PromiseResult = data
						setTimeout(() => {
								self.callbacks.forEach(item => {
											item.onResolved(data)
									 })
							})

					}
        function reject(data) {
            if (self.PromiseStatus !=='pending') return
            self.PromiseStatus = 'rejected'
            self.PromiseResult = data
            setTimeout(() => {
                self.callbacks.forEach(item => {
                    item.onRejected(data)
                })
            })
        }
        try {
            executor(resolve,reject);
        }catch(e) {
            throw e
        }  
    }
    then(onResolved,onRejected) {
        const self = this;
        // 判断回调函数参数  异常穿透
        if(typeof onRejected!== 'function') {
            onRejected = reason => {
                throw reason
            }
        }
        // 判断回调函数参数  异常穿透
        if (typeof onResolved !=='function') {
            onResolved = value => value
        }
        return new Promise((resolve,reject) => {
            function callback(type) {
                try {
                    let result = type(self.PromiseResult)
                    if (result instanceof Promise) {
                        result.then(r => {
                            resolve(r)
                        },j => {
                            reject(j)
                        })
                    }else {
                        resolve(result)
                    }
                }catch(e) {
                    reject(e)
                }
            }
    
            if (this.PromiseStatus === 'fulfilled') {
                setTimeout(() => {
                    callback(onResolved)
                })    
            }
            if (this.PromiseStatus === 'rejected') {
                setTimeout(() => {
                    callback(onRejected)
                })
            }
            if (this.PromiseStatus === 'pending') {
                this.callbacks.push({
                    onResolved: function() {
                        callback(onResolved)
                    },
                    onRejected: function() {
                        callback(onRejected)
                    }
                })
            }
        })
    }
    catch(onRejected) {
        return this.then(undefined,onRejected)
    }
    static resolve(value) {
        return new Promise((resolve,reject) => {
            if (value instanceof Promise) {
                value.then(v=> {
                    resolve(v)
                },j => {
                    reject(j)
                })
            }else {
                resolve(value)
            }
        })
    }
    static reject(value) {
        return new Promise((resolve,reject) => {
            reject(value)
        })
    }
    static all(promises) {
        // 返回结果为promise对象
        return new Promise((resovle,reject) => {
            // 遍历
            let count = 0
            let arr = [];// 存放
            promises.forEach((item,index) => {
                item.then(v=> {
                // 每个promise都成功才去执行resolve
                    count ++;
                    // 保存成功的结果，为了让结果顺序和调用顺序一致
                    arr[index] = v
                    if(count === promises.length) {
                            resovle(arr)
                    }
                },j => {
                    reject(j)
                })
            })
        })
    }
    static race(promises){
        return new Promise((resovle,reject) => {
            promises.forEach(item => {
                item.then(r => {
                    resovle(r)
                },j => {
                    reject(j)
                })
            })
        })
    }

}
