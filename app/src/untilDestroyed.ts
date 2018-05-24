import { MonoTypeOperatorFunction, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const metaProperty = Symbol();
let aot = true;

export function ngxRxCollectorDisableAoTWarning() {
  aot = false;
}

export function untilDestroyed<T>(componentInstance: any, destructorName = 'ngOnDestroy'): MonoTypeOperatorFunction<T> {
  if (!componentInstance[metaProperty]) {
    const originalDestructor = componentInstance[destructorName];

    if (!originalDestructor && aot) {
      console.warn('untilDestroyed limitation: ngOnDestroy is not present on the component which is a problem for AoT. See https://github.com/angular/angular/issues/16023 for more details');
    }

    componentInstance[metaProperty] = new Subject();

    componentInstance[destructorName] = function() {
      if (originalDestructor) {
        originalDestructor.call(componentInstance);
      }

      componentInstance[metaProperty].next();
      componentInstance[metaProperty].complete();
    };
  }

  return takeUntil(componentInstance[metaProperty]);
}
