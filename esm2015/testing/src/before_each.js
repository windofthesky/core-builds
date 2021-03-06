/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { resetFakeAsyncZone } from './fake_async';
import { TestBed } from './test_bed';
const _global = (typeof window === 'undefined' ? global : window);
// Reset the test providers and the fake async zone before each test.
if (_global.beforeEach) {
    _global.beforeEach(() => {
        TestBed.resetTestingModule();
        resetFakeAsyncZone();
    });
}
// TODO(juliemr): remove this, only used because we need to export something to have compilation
// work.
export const __core_private_testing_placeholder__ = '';
//# sourceMappingURL=before_each.js.map