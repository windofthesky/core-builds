/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DefaultIterableDifferFactory } from './differs/default_iterable_differ';
import { DefaultKeyValueDifferFactory } from './differs/default_keyvalue_differ';
import { IterableDiffers } from './differs/iterable_differs';
import { KeyValueDiffers } from './differs/keyvalue_differs';
export { SimpleChange, WrappedValue, devModeEqual } from './change_detection_util';
export { ChangeDetectorRef } from './change_detector_ref';
export { ChangeDetectionStrategy, ChangeDetectorStatus, isDefaultChangeDetectionStrategy } from './constants';
export { DefaultIterableDifferFactory } from './differs/default_iterable_differ';
export { DefaultIterableDiffer } from './differs/default_iterable_differ';
export { DefaultKeyValueDifferFactory } from './differs/default_keyvalue_differ';
export { IterableDiffers } from './differs/iterable_differs';
export { KeyValueDiffers } from './differs/keyvalue_differs';
/**
 * Structural diffing for `Object`s and `Map`s.
 */
var /** @type {?} */ keyValDiff = [new DefaultKeyValueDifferFactory()];
/**
 * Structural diffing for `Iterable` types such as `Array`s.
 */
var /** @type {?} */ iterableDiff = [new DefaultIterableDifferFactory()];
export var /** @type {?} */ defaultIterableDiffers = new IterableDiffers(iterableDiff);
export var /** @type {?} */ defaultKeyValueDiffers = new KeyValueDiffers(keyValDiff);
//# sourceMappingURL=change_detection.js.map