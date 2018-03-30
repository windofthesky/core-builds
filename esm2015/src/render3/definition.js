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
import { SimpleChange } from '../change_detection/change_detection_util';
import { ChangeDetectionStrategy } from '../change_detection/constants';
import { resolveRendererType2 } from '../view/util';
import { diPublic } from './di';
/**
 * Create a component definition object.
 *
 *
 * # Example
 * ```
 * class MyDirective {
 *   // Generated by Angular Template Compiler
 *   // [Symbol] syntax will not be supported by TypeScript until v2.7
 *   static ngComponentDef = defineComponent({
 *     ...
 *   });
 * }
 * ```
 * @template T
 * @param {?} componentDefinition
 * @return {?}
 */
export function defineComponent(componentDefinition) {
    const /** @type {?} */ type = componentDefinition.type;
    const /** @type {?} */ def = /** @type {?} */ ({
        type: type,
        diPublic: null,
        factory: componentDefinition.factory,
        template: componentDefinition.template || /** @type {?} */ ((null)),
        hostBindings: componentDefinition.hostBindings || null,
        attributes: componentDefinition.attributes || null,
        inputs: invertObject(componentDefinition.inputs),
        outputs: invertObject(componentDefinition.outputs),
        rendererType: resolveRendererType2(componentDefinition.rendererType) || null,
        exportAs: componentDefinition.exportAs,
        onInit: type.prototype.ngOnInit || null,
        doCheck: type.prototype.ngDoCheck || null,
        afterContentInit: type.prototype.ngAfterContentInit || null,
        afterContentChecked: type.prototype.ngAfterContentChecked || null,
        afterViewInit: type.prototype.ngAfterViewInit || null,
        afterViewChecked: type.prototype.ngAfterViewChecked || null,
        onDestroy: type.prototype.ngOnDestroy || null,
        onPush: componentDefinition.changeDetection === ChangeDetectionStrategy.OnPush,
        directiveDefs: componentDefinition.directiveDefs || null,
        pipeDefs: componentDefinition.pipeDefs || null,
        selectors: componentDefinition.selectors
    });
    const /** @type {?} */ feature = componentDefinition.features;
    feature && feature.forEach((fn) => fn(def));
    return def;
}
const /** @type {?} */ PRIVATE_PREFIX = '__ngOnChanges_';
/**
 * Creates an NgOnChangesFeature function for a component's features list.
 *
 * It accepts an optional map of minified input property names to original property names,
 * if any input properties have a public alias.
 *
 * The NgOnChangesFeature function that is returned decorates a component with support for
 * the ngOnChanges lifecycle hook, so it should be included in any component that implements
 * that hook.
 *
 * Example usage:
 *
 * ```
 * static ngComponentDef = defineComponent({
 *   ...
 *   inputs: {name: 'publicName'},
 *   features: [NgOnChangesFeature({name: 'name'})]
 * });
 * ```
 *
 * @param {?=} inputPropertyNames Map of input property names, if they are aliased
 * @return {?} DirectiveDefFeature
 */
export function NgOnChangesFeature(inputPropertyNames) {
    return function (definition) {
        const /** @type {?} */ inputs = definition.inputs;
        const /** @type {?} */ proto = definition.type.prototype;
        // Place where we will store SimpleChanges if there is a change
        Object.defineProperty(proto, PRIVATE_PREFIX, { value: undefined, writable: true });
        for (let /** @type {?} */ pubKey in inputs) {
            const /** @type {?} */ minKey = inputs[pubKey];
            const /** @type {?} */ propertyName = inputPropertyNames && inputPropertyNames[minKey] || pubKey;
            const /** @type {?} */ privateMinKey = PRIVATE_PREFIX + minKey;
            // Create a place where the actual value will be stored and make it non-enumerable
            Object.defineProperty(proto, privateMinKey, { value: undefined, writable: true });
            const /** @type {?} */ existingDesc = Object.getOwnPropertyDescriptor(proto, minKey);
            // create a getter and setter for property
            Object.defineProperty(proto, minKey, {
                get: function () {
                    return (existingDesc && existingDesc.get) ? existingDesc.get.call(this) :
                        this[privateMinKey];
                },
                set: function (value) {
                    let /** @type {?} */ simpleChanges = this[PRIVATE_PREFIX];
                    let /** @type {?} */ isFirstChange = simpleChanges === undefined;
                    if (simpleChanges == null) {
                        simpleChanges = this[PRIVATE_PREFIX] = {};
                    }
                    simpleChanges[propertyName] = new SimpleChange(this[privateMinKey], value, isFirstChange);
                    (existingDesc && existingDesc.set) ? existingDesc.set.call(this, value) :
                        this[privateMinKey] = value;
                }
            });
        }
        // If an onInit hook is defined, it will need to wrap the ngOnChanges call
        // so the call order is changes-init-check in creation mode. In subsequent
        // change detection runs, only the check wrapper will be called.
        if (definition.onInit != null) {
            definition.onInit = onChangesWrapper(definition.onInit);
        }
        definition.doCheck = onChangesWrapper(definition.doCheck);
    };
    /**
     * @param {?} delegateHook
     * @return {?}
     */
    function onChangesWrapper(delegateHook) {
        return function () {
            let /** @type {?} */ simpleChanges = this[PRIVATE_PREFIX];
            if (simpleChanges != null) {
                this.ngOnChanges(simpleChanges);
                this[PRIVATE_PREFIX] = null;
            }
            delegateHook && delegateHook.apply(this);
        };
    }
}
/**
 * @template T
 * @param {?} definition
 * @return {?}
 */
export function PublicFeature(definition) {
    definition.diPublic = diPublic;
}
const /** @type {?} */ EMPTY = {};
/**
 * Swaps the keys and values of an object.
 * @param {?} obj
 * @return {?}
 */
function invertObject(obj) {
    if (obj == null)
        return EMPTY;
    const /** @type {?} */ newObj = {};
    for (let /** @type {?} */ minifiedKey in obj) {
        newObj[obj[minifiedKey]] = minifiedKey;
    }
    return newObj;
}
/**
 * Create a directive definition object.
 *
 * # Example
 * ```
 * class MyDirective {
 *   // Generated by Angular Template Compiler
 *   // [Symbol] syntax will not be supported by TypeScript until v2.7
 *   static ngDirectiveDef = defineDirective({
 *     ...
 *   });
 * }
 * ```
 */
export const /** @type {?} */ defineDirective = /** @type {?} */ ((defineComponent));
/**
 * Create a pipe definition object.
 *
 * # Example
 * ```
 * class MyPipe implements PipeTransform {
 *   // Generated by Angular Template Compiler
 *   static ngPipeDef = definePipe({
 *     ...
 *   });
 * }
 * ```
 * @template T
 * @param {?} pipeDef Pipe definition generated by the compiler
 * @return {?}
 */
export function definePipe(pipeDef) {
    return /** @type {?} */ ({
        name: pipeDef.name,
        n: pipeDef.factory,
        pure: pipeDef.pure !== false,
        onDestroy: pipeDef.type.prototype.ngOnDestroy || null
    });
}
//# sourceMappingURL=definition.js.map