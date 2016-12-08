"use strict";
var rxjs_1 = require("rxjs");
var CollectorEvent = (function (_super) {
    __extends(CollectorEvent, _super);
    function CollectorEvent() {
        return _super.apply(this, arguments) || this;
    }
    return CollectorEvent;
}(rxjs_1.Subject));
exports.CollectorEvent = CollectorEvent;
var metaProperty = Symbol();
function Collected() {
    return function (prototype, name) {
        var onDestroy = prototype.ngOnDestroy;
        Object.defineProperty(prototype, name, {
            configurable: false,
            get: function () {
                if (!this[metaProperty]) {
                    this[metaProperty] = new CollectorEvent();
                }
                return this[metaProperty];
            }
        });
        prototype.ngOnDestroy = function () {
            if (onDestroy) {
                onDestroy.call(this);
            }
            this[metaProperty].next();
        };
    };
}
exports.Collected = Collected;
;
//# sourceMappingURL=decorator.js.map