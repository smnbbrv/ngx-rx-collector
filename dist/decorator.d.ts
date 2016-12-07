import { Subject } from 'rxjs';
export declare class CollectorEvent extends Subject<void> {
}
export declare function Collected(): (prototype: any, name: string) => void;
