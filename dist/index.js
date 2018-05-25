"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var metaProperty = Symbol();
var aot = true;
function ngxRxCollectorDisableAoTWarning() {
    aot = false;
}
exports.ngxRxCollectorDisableAoTWarning = ngxRxCollectorDisableAoTWarning;
function untilDestroyed(componentInstance, destructorName) {
    if (destructorName === void 0) { destructorName = 'ngOnDestroy'; }
    if (!componentInstance[metaProperty]) {
        var originalDestructor_1 = componentInstance[destructorName];
        if (!originalDestructor_1 && aot) {
            console.warn('untilDestroyed limitation: ngOnDestroy is not present on the component which is a problem for AoT. See https://github.com/angular/angular/issues/16023 for more details');
        }
        componentInstance[metaProperty] = new rxjs_1.Subject();
        componentInstance[destructorName] = function () {
            if (originalDestructor_1) {
                originalDestructor_1.call(componentInstance);
            }
            componentInstance[metaProperty].next();
            componentInstance[metaProperty].complete();
        };
    }
    return operators_1.takeUntil(componentInstance[metaProperty]);
}
exports.untilDestroyed = untilDestroyed;
//# sourceMappingURL=index.js.map