import { Subject } from 'rxjs/Subject';
import { MonoTypeOperatorFunction } from 'rxjs/interfaces';
import { takeUntil } from 'rxjs/operators';

const metaProperty = Symbol();

export function untilDestroyed<T>(componentInstance: any, destructorName = 'ngOnDestroy'): MonoTypeOperatorFunction<T> {
  const originalDestructor = componentInstance['destructorName'];

  if (!componentInstance[metaProperty]) {
    componentInstance[metaProperty] = new Subject();

    componentInstance['destructorName'] = function() {
      if (originalDestructor) {
        originalDestructor.call(componentInstance);
      }

      componentInstance[metaProperty].next();
      componentInstance[metaProperty].complete();
    };
  }

  return takeUntil(componentInstance[metaProperty]);
}
