import { MonoTypeOperatorFunction } from 'rxjs/interfaces';
export declare function Collectable(): (constructor: Function) => void;
export declare function untilDestroyed<T>(componentInstance: any): MonoTypeOperatorFunction<T>;
