import { Subject } from 'rxjs';

export class CollectorEvent extends Subject<void> {}

export function Collected() {
  return (prototype: any, name: string) => {
    const onDestroy = prototype.ngOnDestroy;
    const event = new CollectorEvent();

    Object.defineProperty(prototype, name, {
      configurable: false,
      get: () => event
    });

    prototype.ngOnDestroy = function() {
      if (onDestroy) {
        onDestroy.call(this);
      }

      event.next();
    };
  };
};
