import { Subject } from 'rxjs/Subject';

export class CollectorEvent extends Subject<void> {}

const metaProperty = Symbol();

export function Collected() {
  return (prototype: any, name: string) => {
    const onDestroy = prototype.ngOnDestroy;

    Object.defineProperty(prototype, name, {
      configurable: false,
      get() {
        if (!this[metaProperty]) {
          this[metaProperty] = new CollectorEvent();
        }

        return this[metaProperty];
      }
    });

    prototype.ngOnDestroy = function() {
      if (onDestroy) {
        onDestroy.call(this);
      }

      if (this[metaProperty]) {
        this[metaProperty].next();
      }
    };
  };
};
