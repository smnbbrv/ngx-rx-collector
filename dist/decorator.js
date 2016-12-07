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
function Collected() {
    return function (prototype, name) {
        var onDestroy = prototype.ngOnDestroy;
        prototype.ngOnDestroy = function () {
            if (onDestroy) {
                onDestroy.call(this);
            }
            this[name].next();
        };
    };
}
exports.Collected = Collected;
;
//# sourceMappingURL=decorator.js.map