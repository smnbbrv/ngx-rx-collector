# ngx-rx-collector

Angular 2+ garbage collector for RxJS subscriptions.

Benefits:

- Clean, beautiful code
- One property for all component's observables

## Installation

```sh
npm i -S ngx-rx-collector
```

For v1 and v2 see corresponding branches

## Usage

Use the pipe-able operator `untilDestroyed` and pass there your component instance. That is pretty much it.

If you use AoT build (which is enabled by default) you must have at least empty `ngOnDestroy` on your component.

If you don't use AoT build then simply call `ngxRxCollectorDisableAoTWarning()` in your `main.ts`. No `ngOnDestroy` required in this case.

## Example

AoT build + no ngOnDestroy logic:

```ts
import { Component } from '@angular/core';
import { Collectable } from 'ngx-rx-collector';
import { interval } from 'rxjs/observable/interval';

@Component({
  template: 'Ticking bomb'
})
export class TestpageComponent {

  ngOnInit() {
    interval(1000).pipe(untilDestroyed(this)).subscribe(console.log.bind(console));
  }

  ngOnDestroy() {}

}
```

Non-AoT build + no ngOnDestroy logic:

```ts
import { Component } from '@angular/core';
import { Collectable } from 'ngx-rx-collector';
import { interval } from 'rxjs/observable/interval';

@Component({
  template: 'Ticking bomb'
})
export class TestpageComponent {

  ngOnInit() {
    interval(1000).pipe(untilDestroyed(this)).subscribe(console.log.bind(console));
  }

}
```

Any build + ngOnDestroy logic:

```ts
import { Component } from '@angular/core';
import { Collectable } from 'ngx-rx-collector';
import { interval } from 'rxjs/observable/interval';

@Component({
  template: 'Ticking bomb'
})
export class TestpageComponent {

  ngOnInit() {
    interval(1000).pipe(untilDestroyed(this)).subscribe(console.log.bind(console));
  }

  ngOnDestroy() {
    console.log('destroyed')
  }

}
```

## License

MIT
