"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Subject_1 = require("rxjs/Subject");
var CollectorEvent = (function (_super) {
    __extends(CollectorEvent, _super);
    function CollectorEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CollectorEvent;
}(Subject_1.Subject));
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
            if (this[metaProperty]) {
                this[metaProperty].next();
            }
        };
    };
}
exports.Collected = Collected;
;
//# sourceMappingURL=decorator.js.map