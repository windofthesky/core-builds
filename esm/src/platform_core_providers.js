/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { PlatformRef, PlatformRef_, createPlatformFactory } from './application_ref';
import { Console } from './console';
import { Reflector, reflector } from './reflection/reflection';
import { ReflectorReader } from './reflection/reflector_reader';
import { TestabilityRegistry } from './testability/testability';
function _reflector() {
    return reflector;
}
var __unused; // prevent missing use Dart warning.
const _CORE_PLATFORM_PROVIDERS = [
    PlatformRef_, { provide: PlatformRef, useExisting: PlatformRef_ },
    { provide: Reflector, useFactory: _reflector, deps: [] },
    { provide: ReflectorReader, useExisting: Reflector }, TestabilityRegistry, Console
];
/**
 * This platform has to be included in any other platform
 *
 * @experimental
 */
export const corePlatform = createPlatformFactory(null, 'core', _CORE_PLATFORM_PROVIDERS);
/**
 * A default set of providers which should be included in any Angular platform.
 *
 * @deprecated Create platforms via `createPlatformFactory(corePlatform, ...) instead!
 */
export const PLATFORM_COMMON_PROVIDERS = _CORE_PLATFORM_PROVIDERS;
//# sourceMappingURL=platform_core_providers.js.map