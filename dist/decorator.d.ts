import { Subject } from 'rxjs/Subject';
export declare class CollectorEvent extends Subject<void> {
}
export declare function Collected(): (prototype: any, name: string) => void;
