"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Subject_1 = require("rxjs/Subject");
var operators_1 = require("rxjs/operators");
var metaProperty = Symbol();
var metaGetter = Symbol();
function Collectable() {
    return function (constructor) {
        var onDestroy = constructor.prototype.ngOnDestroy;
        var subject = new Subject_1.Subject();
        Object.defineProperty(constructor.prototype, metaGetter, {
            configurable: false,
            get: function () {
                return this[metaProperty] || (this[metaProperty] = new Subject_1.Subject());
            }
        });
        constructor.prototype.ngOnDestroy = function () {
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
exports.Collectable = Collectable;
function untilDestroyed(componentInstance) {
    return operators_1.takeUntil(componentInstance[metaGetter]);
}
exports.untilDestroyed = untilDestroyed;
//# sourceMappingURL=decorator.js.map