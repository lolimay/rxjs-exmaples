import { Subject, Observable, from } from 'rxjs'

// ## Concept 1
// An RxJS Subject is a special type of Observable that
// allows values to be multicasted to many Observers.
// 1. Subject 是一种特殊的 Observable
console.log(new Subject() instanceof Observable) // true
// 2. Subject 允许值被多播给 Observable
// 3. Subject 与 EventEmitter 等价

// ## Concept 2
// Subject vs. Observable vs. EventEmitter
// 1. While plain Observables are unicast
// (each subscribed Observer owns an independent execution of the Observable),
// Subjects are multicast.
// (普通 Observable 是单播的 "unicast"，每个订阅者 subscribed Observer 有自己独立的执行 "execution")
// (Subject 是多播 "multicast"，多个 Observables  共享同一个 execution)
// 2. Every Subject is an Observable (每个 Subject 都是一个 Observable)
//   From the perspective of the Observer, it cannot tell whether the Observable execution is
//   coming from a plain unicast Observable or a Subject. 
//    (从 Observer 的角度来看，它是分不清这个 Observable execution 是来自普通单播 Observable 还是多播 Observable)
// 3. Every Subject is an Observer (每一个 Subject 都是一个 Observer)
//    It is an object with the methods next(v), error(e), and complete().
//    (总结，Subject 既是一种特殊的 multicast Observable，也是一个 Observer)
const subject = new Subject()
subject.next(1) // 收不到
subject.next(2) // 收不到，说明 Subject 是 eager "push" instead of lazy push
subject.subscribe(x => console.log(`Observer-x: ${ x }`))
subject.subscribe(y => console.log(`Observer-y: ${ y }`))
subject.next(3)
subject.next(4)

const observable = from(['a', 'b', 'c'])
observable.subscribe(subject)

// Multicasted Observables
// A "multicasted Observable" passes notifications through a Subject which
// may have many subscribers, whereas a plain "unicast Observable" only sends
// notifications to a single Observer.
// (多播 "multicasted" Observable 通过 Subject 来传递通知，普通单播 "unicast" Observable
// 只能发送消息给一个订阅者 Observer)
// 注：这里是指 plain unicasted Observable 的每个订阅者 subscribed Observer 有自己的独立的执行
// 上下文 "execution"。