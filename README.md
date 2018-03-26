# ngx-rx-collector

Angular 2+ garbage collector for RxJS subscriptions.

Benefits:
- Clean, beautiful code
- One property for all component's observables
- No `ngOnDestroy` for cancelling subscriptions anymore (but still you can use it if you want)

## Installation

```sh
npm i -S ngx-rx-collector
```

For v1 see [this branch](https://github.com/smnbbrv/ng2-rx-collector/tree/v1).

## Usage

Use the `Collectable` decorator on component class and use pipe-able operator `untilDestroyed`. That is pretty much it.

## Example

timer.ts (representing any RxJS source):

```ts
import { Observable } from 'rxjs';

export let timer = Observable.interval(1000);
```

testpage.component.ts:

```ts
import { Component } from '@angular/core';
import { Collectable } from 'ngx-rx-collector';
import { timer } from './timer';

@Component({
  template: 'Ticking'
})
@Collectable()
export class TestpageComponent {

  public ngOnInit() {
    timer.pipe(untilDestroyed(this))
         .subscribe(console.log.bind(console));
  }

  public ngOnDestroy() {
    console.log('unnecessary destroy works, subscription is still killed');
  }

}
```

## License

MIT
