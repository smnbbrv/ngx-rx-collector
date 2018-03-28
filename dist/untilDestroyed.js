"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Subject_1 = require("rxjs/Subject");
var operators_1 = require("rxjs/operators");
var metaProperty = Symbol();
function untilDestroyed(componentInstance, destructorName) {
    if (destructorName === void 0) { destructorName = 'ngOnDestroy'; }
    var originalDestructor = componentInstance['destructorName'];
    if (!componentInstance[metaProperty]) {
        componentInstance[metaProperty] = new Subject_1.Subject();
        componentInstance['destructorName'] = function () {
            if (originalDestructor) {
                originalDestructor.call(componentInstance);
            }
            componentInstance[metaProperty].next();
            componentInstance[metaProperty].complete();
        };
    }
    return operators_1.takeUntil(componentInstance[metaProperty]);
}
exports.untilDestroyed = untilDestroyed;
//# sourceMappingURL=untilDestroyed.js.map