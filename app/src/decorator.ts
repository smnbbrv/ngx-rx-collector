import { Subject } from 'rxjs/Subject';
import { MonoTypeOperatorFunction } from 'rxjs/interfaces';
import { takeUntil } from 'rxjs/operators';

const metaProperty = Symbol();
const metaGetter = Symbol();

export function Collectable() {
  return (constructor: Function) => {
    const onDestroy = constructor.prototype.ngOnDestroy;
    const subject = new Subject();

    Object.defineProperty(constructor.prototype, metaGetter, {
      configurable: false,
      get() {
        return this[metaProperty] || (this[metaProperty] = new Subject());
      }
    });

    constructor.prototype.ngOnDestroy = function() {
      if (onDestroy) {
        onDestroy.call(this);
      }

      if (this[metaGetter]) {
        subject.next();
        subject.complete();
      }
    };
  };
}

export function untilDestroyed<T>(componentInstance: any): MonoTypeOperatorFunction<T> {
  return takeUntil(componentInstance[metaGetter]);
}
