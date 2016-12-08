# ng2-rx-collector

Angular 2 garbage collector for RxJS subscriptions.

Benefits:
- Clean, beautiful code
- One property for all component's observables
- No `ngOnDestroy` for cancelling subscriptions anymore (but still you can use it if you want)

Inspired by [philipooo's beautiful answer](http://stackoverflow.com/a/41015801/1990451).

## Installation

```sh
npm install --save ng2-rx-collector
```

## Usage

Import the `Collected` decorator and `CollectorEvent` data type (actually you can use `any` instead of `CollectorEvent` if this feels better) which will do all the magic.

```ts
import { Collected, CollectorEvent } from 'ng2-rx-collector';
```

Then create a property on your component which will represent the collector stopper event.

```ts
@Component({ ... })
export class MyComponent {

  @Collected() private collected: CollectorEvent;

}
```

Subscribe to any observable / subject using the created property as a flag, so the observable will stop producing the output when the component is being destroyed:

```ts
public ngOnInit() {
  myObservable.takeUntil(this.collected)
              .subscribe(console.log.bind(console));

  Observable.merge(myObservable1, myObservable2)
            .takeUntil(this.collected)
            .subscribe(console.log.bind(console));
}
```

That is pretty much it.

## Example

This is an example you may find in the app folder.

timer.ts (representing any RxJS source):

```ts
import { Observable } from 'rxjs';

export let timer = Observable.interval(1000);
```

testpage.component.ts:

```ts
import { Component } from '@angular/core';
import { Collected, CollectorEvent } from './src';
import { timer } from './timer';

@Component({
  template: 'Ticking'
})
export class TestpageComponent {

  @Collected() private collected: CollectorEvent;

  public ngOnInit() {
    timer.takeUntil(this.collected)
         .subscribe(console.log.bind(console));
  }

  public ngOnDestroy() {
    console.log('unnecessary destroy works, subscription is still killed');
  }

}
```

## License

MIT
