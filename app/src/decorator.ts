import { Subject } from 'rxjs';

export class CollectorEvent extends Subject<void> {}

export function Collected() {
  return (prototype: any, name: string) => {
    let onDestroy = prototype.ngOnDestroy;

    prototype.ngOnDestroy = function() {
      if (onDestroy) {
        onDestroy.call(this);
      }

      this[name].next();
    };
  };
};
