// ## Concept
// Observables are lazy `Push` collections of `multiple` values.
//      SINGLE	MULTIPLE
// Pull	Function Generator/Iterator
// Push	Promise	Observable

import { Observable } from 'rxjs'

const observable = new Observable(subscriber => {
    subscriber.next(1)
    subscriber.next(2)
    subscriber.next(3)
    setTimeout(() => {
        subscriber.next(4)
        subscriber.complete()
    }, 1000)
})

console.log(':: before subscribe')
observable.subscribe({
    next(value) { console.log(':: value:', value) },
    error(err) { console.error('::', err) },
    complete() { console.log(':: complete') }
})
console.log(':: after subscribe')

//                      PRODUCER	                    CONSUMER
// Pull	Passive: produces data when requested.	Active: decides when data is requested.
// Push	Active: produces data at its own pace.	Passive: reacts to received data.

// ## Concepts
// Pull and Push are two different protocols describe how a `data Producer`
// can communicate with a `data Consumber`. (Pull 和 Push 是数据生产者和消费者之间的两种不同的通信协议)
// Pull: the consumber determines when it receives data from the data Producer,
//       The Producer itself is unware of when the data will be delivered to the Consumber
//       (消费者决定何时消费数据，生产者并不知道数据会被消费者消费)
// @examples Function, Iterator
//
// Push: the Producer determines when to send data to the consumber. The Consumber is unware 
//       of when it will receive the data.
//       (生产者决定什么时候发送数据，消费者不知道什么时候会收到数据)
// @examples Promise, Observable

// ## Concept 1
// Observable: a Producer of multiple values, "pushing" them to Observers (Consumbers).
// (Observable 可以主动推送 "push" 多个值到消费者 "Observer" 的生产者)

function foo() {
    console.log('Hello')
    return 42
}

const x = foo.call()
console.log(x)
const y = foo.call()
console.log(y)

const obv = new Observable(subscriber => {
    console.log('Hello')
    subscriber.next(42)
})
obv.subscribe(x => console.log(x))
obv.subscribe(y => console.log(y))

// ## Concept 2
// Observables are like functions with zero arguments, but generalize those to allow multiple values.
// (Observable 像没有参数的函数，但是可以有多个返回值)
//
// Observable 与 EventEmitter 的不同
// 1. Observables are lazy computations, if you don't call the function, the computations
//    won't happen but EventEmitter have eager execution regardless of the existence of subscribers 
//    (Observable 是惰性计算，如果没有 subscription 是不会计算的，但是 EventEmitter 是只要有事件就触发)
// 2. "subscribe" (订阅) is an isolated operation, two Observable subscribes triggers
//    two separate side effects but EventEmitter shares the side effects.
//     Each execution is exclusive to one Observable only
//     (Observable 的每个 subscription 的 side-effects 副作用都是隔离的，EventEmitter 是共享副作用)
// 综上两点，Observable 其实和函数更相似，不论是惰性计算还是副作用隔离。

// ## Concept 3
// Subscribing to an Observable is analogous to calling a Function.
// (订阅一个 Observable 就相当于调用了一个函数)

console.log(':- before')
console.log(foo.call())
console.log(':- after')

console.log('-: before')
obv.subscribe(x => console.log(x))
console.log('-: after')

// This case proves the subscription of an Observable is entirely synchronous, just like a function
// (订阅一个 Observable 就相当于调用一个函数，这个过程是`同步`的)

// ## Concept 4
// Observables are able to deliver values either synchronously or asynchronously.
// (Observable 可以或异步或同步地推送 "deliver" 数据)

// ## Concept 5
// Observables 和 Function 的不同
// Observables can "return" multiple values over time, something which functions cannot.
// (Observable 可以随着时间返回 "return" 多个值，但是函数不行)

const osb = new Observable(subscriber => {
    console.log('Hello')
    subscriber.next(42)
    subscriber.next(100) // "return" another value
    subscriber.next(200) // "return" yet another
    setTimeout(() => {
        subscriber.next(300) // "return" value asynchronously
    }, 1000)
})

console.log('-- before')
osb.subscribe(x => console.log(x))
console.log('-- after')

// ## Conclusion
// function.call() means "give me one value synchronously"
// observable.subscribe(observer/callback) means "give me any amount values, either
// synchronously or asynchronously"
// 
// Subscribing to an Observable is like calling a function,
// providing callbacks where the data will be delivered to.

// ## Concept 6
// Observable 的 4 个关注点
// 1. `Creating` Observables 创建
// 2. `Subscribing` Observables 订阅
// 3. `Executing` Observables 执行
// 4. `Disposing` Observables 丢弃

// Most commonly, observables are created using creation functions, like:
// - of, from, interval, etc.

const intervalObservable = new Observable(subscriber => {
    // lazy computation body start
    // ## Concept 7
    // There're 3 types of values an Observable can delivere:
    // "Next" notification: sends a value such as a Number, a String, an Object, etc.
    // "Error" notification: sends a JavaScript Error or exception
    // "Complete" notification: does not send a value
    const interval = setInterval(() => {
        subscriber.next('hi')
        console.log('I am Here ;)')
    }, 1000)
    // lazy computation body end

    // Provide custom unsubscribe function from subscribe
    // to dispose dispose computation powser and memory resources
    return function unsubscribe() {
        clearInterval(interval)
    }
})

// ## Concept 7
// When you subscribe, you get back a Subscription, which represents the ongoing
// execution. Just call unsubscribe() to cancel the execution.

const subscription = intervalObservable.subscribe(value => console.log(value))
setTimeout(() => subscription.unsubscribe(), 5000)