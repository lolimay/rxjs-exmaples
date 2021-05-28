import { fromEvent } from 'rxjs'
import { map, scan, throttleTime } from 'rxjs/operators'

// ## concepts
// 1. Observable (可被观察的对象) represents the idea of an invokable collection of future values or events
// 2. Observer (观察者) is a collection of callbacks that knows how to listen to values delivered by the Observable
// 3. Subscription (订阅) represents the execution of an Observable, is primarily useful for cancelling the execution
// 4. Operators (算子/操作) are pure functions that enable a functional programming style of dealing with collections
//                          with operations like map, filter, concat, reduce, etc.
// 5. Subject (主体) is equivalent to an EventEmitter, and the only way of multicasting a value or event to multiple
//                   Observables.
// 6. Schedulers (调度器) are centralized dispatchers to control concurrency, allowing us to coordinate when computation
// to                     happens on e.g. setTimeout or requestAnimationFrame for others. 

// ## operators
//  purity
//      - scan
//  flow controllers
//      - throttleTime, filter, delay, decounceTime, take
//        takeUtil, distinct, distinctUtilChanged
//  values transform operators / value producing operators
//      - map, pluck, pairwise, sample

fromEvent(document, 'click')
    .pipe(
        throttleTime(1000), // at most one click per second
        // debounceTime(1000),
        map(({ clientX }) => clientX),
        scan((count, clientX) => count + clientX, 0) // `scan` is similar to Array.prototype.reduce
    )
    // `document clicked ${ count } times`
    .subscribe(count => console.log(count))