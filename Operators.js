import { interval, of, pipe } from 'rxjs'
import { filter, first, map } from 'rxjs/operators'

// Operators are the essential pieces that allow complex asynchronous code
// to be easily composed in a declarative manner.

// ## Concept 1
// Operators are functions.
// There're 2 kinds of operators:
//  1. Pipeable Operators
//     @examples - filter, mergeMap, map, first
//     When called, they do not change the existing Observable instance.
//     Instead, they return a new Observable, whose subscription logic is based on the first Observable.
//     A Pipeable Operator is a function that takes an Observable as its input and returns another Observable.
//     It is a pure operation: the previous Observable stays unmodified.
//     (一个 Pipeable 算子接受一个旧 Observable 返回变换后的新 Observable，是纯函数，不改变旧 Observable)
//  2. Creation Operators
//     @examples - of, from , interval
//     Observables, which can be called as standalone functions to create a new Observable.

of(1, 2, 3)
    .pipe(
        first(),
        map(x => x * x),
    )
    .subscribe(x => console.log(x))

const observable = interval(1000 /* number of milliseconds */)
observable
    .pipe(discardOddDoubleEven())
    .subscribe(x => console.log(x))

// ## Concept 2
// Higher-order Observables
// Observables most commonly emit ordinary values like strings and numbers,
// but surprisingly often, it is necessary to handle Observables of Observables,
// so-called higher-order Observables.

// ## Concept 3
// Categories of operators
// 1. Creation Operators
// 2. Join Creation Operators
// 3. Transformation Operators
// 4. Filtering Operators
// 5. Join Operators
// 6. Multicasting Operators
// 7. Error Handling Operators
// 8. Utility Operators
// 9. Conditional and Boolean Operators
// 10. Mathematical and Aggregate Operators

// ## Concept 4
// Creating custom operators
// 1. Use the pipe() functions to make new operators

// discard odd values and double even values
function discardOddDoubleEven() {
    return pipe(
        filter(n => !(n % 2)), // discard odd values
        map(n => n + n) // double the left odd values
    )
}

// 2. Creating new operators from scratch