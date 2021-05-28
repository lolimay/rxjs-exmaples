import { Observable } from 'rxjs'

// ## Concept 1
// An Observer is a consumer of values delivered by an Observable.
// Observers are simply a set of callbacks, one for each type of notification
// delivered by the Observable: next, error, and complete. 
// (Observer 就是回调函数，用来处理 Observable 推 "deliver" 过来的值)

const observable = new Observable(subscriber => {
    subscriber.next(1)
    subscriber.next(2)
    subscriber.complete()
})
const observer = {
    next(value) { console.log(value) },
    error(err) { console.error(err) },
    complete() { console.log('complete') }
}
const subscription =observable.subscribe(observer)
subscription.unsubscribe()