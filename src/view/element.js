/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { isDevMode } from '../application_ref';
import { SecurityContext } from '../security';
import { BindingType, EntryAction, NodeFlags, NodeType, Refs, ViewFlags, asElementData } from './types';
import { checkAndUpdateBinding, dispatchEvent, entryAction, setBindingDebugInfo, sliceErrorStack, unwrapValue } from './util';
/**
 * @param {?} flags
 * @param {?} matchedQueries
 * @param {?} ngContentIndex
 * @param {?} childCount
 * @param {?=} template
 * @return {?}
 */
export function anchorDef(flags, matchedQueries, ngContentIndex, childCount, template) {
    const /** @type {?} */ matchedQueryDefs = {};
    if (matchedQueries) {
        matchedQueries.forEach(([queryId, valueType]) => { matchedQueryDefs[queryId] = valueType; });
    }
    // skip the call to sliceErrorStack itself + the call to this function.
    const /** @type {?} */ source = isDevMode() ? sliceErrorStack(2, 3) : '';
    return {
        type: NodeType.Element,
        // will bet set by the view definition
        index: undefined,
        reverseChildIndex: undefined,
        parent: undefined,
        childFlags: undefined,
        childMatchedQueries: undefined,
        bindingIndex: undefined,
        disposableIndex: undefined,
        // regular values
        flags,
        matchedQueries: matchedQueryDefs, ngContentIndex, childCount,
        bindings: [],
        disposableCount: 0,
        element: {
            name: undefined,
            attrs: undefined,
            outputs: [], template,
            // will bet set by the view definition
            providerIndices: undefined, source,
        },
        provider: undefined,
        text: undefined,
        pureExpression: undefined,
        query: undefined,
        ngContent: undefined
    };
}
/**
 * @param {?} flags
 * @param {?} matchedQueries
 * @param {?} ngContentIndex
 * @param {?} childCount
 * @param {?} name
 * @param {?=} fixedAttrs
 * @param {?=} bindings
 * @param {?=} outputs
 * @return {?}
 */
export function elementDef(flags, matchedQueries, ngContentIndex, childCount, name, fixedAttrs = {}, bindings, outputs) {
    // skip the call to sliceErrorStack itself + the call to this function.
    const /** @type {?} */ source = isDevMode() ? sliceErrorStack(2, 3) : '';
    const /** @type {?} */ matchedQueryDefs = {};
    if (matchedQueries) {
        matchedQueries.forEach(([queryId, valueType]) => { matchedQueryDefs[queryId] = valueType; });
    }
    bindings = bindings || [];
    const /** @type {?} */ bindingDefs = new Array(bindings.length);
    for (let /** @type {?} */ i = 0; i < bindings.length; i++) {
        const /** @type {?} */ entry = bindings[i];
        let /** @type {?} */ bindingDef;
        const /** @type {?} */ bindingType = entry[0];
        const /** @type {?} */ name = entry[1];
        let /** @type {?} */ securityContext;
        let /** @type {?} */ suffix;
        switch (bindingType) {
            case BindingType.ElementStyle:
                suffix = (entry[2]);
                break;
            case BindingType.ElementAttribute:
            case BindingType.ElementProperty:
                securityContext = (entry[2]);
                break;
        }
        bindingDefs[i] = { type: bindingType, name, nonMinfiedName: name, securityContext, suffix };
    }
    outputs = outputs || [];
    const /** @type {?} */ outputDefs = new Array(outputs.length);
    for (let /** @type {?} */ i = 0; i < outputs.length; i++) {
        const /** @type {?} */ output = outputs[i];
        let /** @type {?} */ target;
        let /** @type {?} */ eventName;
        if (Array.isArray(output)) {
            [target, eventName] = output;
        }
        else {
            eventName = output;
        }
        outputDefs[i] = { eventName: eventName, target: target };
    }
    return {
        type: NodeType.Element,
        // will bet set by the view definition
        index: undefined,
        reverseChildIndex: undefined,
        parent: undefined,
        childFlags: undefined,
        childMatchedQueries: undefined,
        bindingIndex: undefined,
        disposableIndex: undefined,
        // regular values
        flags,
        matchedQueries: matchedQueryDefs, ngContentIndex, childCount,
        bindings: bindingDefs,
        disposableCount: outputDefs.length,
        element: {
            name,
            attrs: fixedAttrs,
            outputs: outputDefs,
            template: undefined,
            // will bet set by the view definition
            providerIndices: undefined, source,
        },
        provider: undefined,
        text: undefined,
        pureExpression: undefined,
        query: undefined,
        ngContent: undefined
    };
}
/**
 * @param {?} view
 * @param {?} renderHost
 * @param {?} def
 * @return {?}
 */
export function createElement(view, renderHost, def) {
    const /** @type {?} */ elDef = def.element;
    const /** @type {?} */ rootSelectorOrNode = view.root.selectorOrNode;
    let /** @type {?} */ el;
    if (view.parent || !rootSelectorOrNode) {
        const /** @type {?} */ parentNode = def.parent != null ? asElementData(view, def.parent).renderElement : renderHost;
        if (view.renderer) {
            const /** @type {?} */ debugContext = isDevMode() ? Refs.createDebugContext(view, def.index) : undefined;
            el = elDef.name ? view.renderer.createElement(parentNode, elDef.name, debugContext) :
                view.renderer.createTemplateAnchor(parentNode, debugContext);
        }
        else {
            el = elDef.name ? document.createElement(elDef.name) : document.createComment('');
            if (parentNode) {
                parentNode.appendChild(el);
            }
        }
    }
    else {
        if (view.renderer) {
            const /** @type {?} */ debugContext = isDevMode() ? Refs.createDebugContext(view, def.index) : undefined;
            el = view.renderer.selectRootElement(rootSelectorOrNode, debugContext);
        }
        else {
            el = typeof rootSelectorOrNode === 'string' ? document.querySelector(rootSelectorOrNode) :
                rootSelectorOrNode;
            el.textContent = '';
        }
    }
    if (elDef.attrs) {
        for (let /** @type {?} */ attrName in elDef.attrs) {
            if (view.renderer) {
                view.renderer.setElementAttribute(el, attrName, elDef.attrs[attrName]);
            }
            else {
                el.setAttribute(attrName, elDef.attrs[attrName]);
            }
        }
    }
    if (elDef.outputs.length) {
        for (let /** @type {?} */ i = 0; i < elDef.outputs.length; i++) {
            const /** @type {?} */ output = elDef.outputs[i];
            let /** @type {?} */ disposable;
            if (view.renderer) {
                const /** @type {?} */ handleEventClosure = renderEventHandlerClosure(view, def.index, output.eventName);
                if (output.target) {
                    disposable = (view.renderer.listenGlobal(output.target, output.eventName, handleEventClosure));
                }
                else {
                    disposable = (view.renderer.listen(el, output.eventName, handleEventClosure));
                }
            }
            else {
                let /** @type {?} */ target;
                switch (output.target) {
                    case 'window':
                        target = window;
                        break;
                    case 'document':
                        target = document;
                        break;
                    default:
                        target = el;
                }
                const /** @type {?} */ handleEventClosure = directDomEventHandlerClosure(view, def.index, output.eventName);
                target.addEventListener(output.eventName, handleEventClosure);
                disposable = target.removeEventListener.bind(target, output.eventName, handleEventClosure);
            }
            view.disposables[def.disposableIndex + i] = disposable;
        }
    }
    return {
        renderElement: el,
        embeddedViews: (def.flags & NodeFlags.HasEmbeddedViews) ? [] : undefined,
        projectedViews: undefined
    };
}
/**
 * @param {?} view
 * @param {?} index
 * @param {?} eventName
 * @return {?}
 */
function renderEventHandlerClosure(view, index, eventName) {
    return entryAction(EntryAction.HandleEvent, (event) => dispatchEvent(view, index, eventName, event));
}
/**
 * @param {?} view
 * @param {?} index
 * @param {?} eventName
 * @return {?}
 */
function directDomEventHandlerClosure(view, index, eventName) {
    return entryAction(EntryAction.HandleEvent, (event) => {
        const /** @type {?} */ result = dispatchEvent(view, index, eventName, event);
        if (result === false) {
            event.preventDefault();
        }
        return result;
    });
}
/**
 * @param {?} view
 * @param {?} def
 * @param {?} v0
 * @param {?} v1
 * @param {?} v2
 * @param {?} v3
 * @param {?} v4
 * @param {?} v5
 * @param {?} v6
 * @param {?} v7
 * @param {?} v8
 * @param {?} v9
 * @return {?}
 */
export function checkAndUpdateElementInline(view, def, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9) {
    // Note: fallthrough is intended!
    switch (def.bindings.length) {
        case 10:
            checkAndUpdateElementValue(view, def, 9, v9);
        case 9:
            checkAndUpdateElementValue(view, def, 8, v8);
        case 8:
            checkAndUpdateElementValue(view, def, 7, v7);
        case 7:
            checkAndUpdateElementValue(view, def, 6, v6);
        case 6:
            checkAndUpdateElementValue(view, def, 5, v5);
        case 5:
            checkAndUpdateElementValue(view, def, 4, v4);
        case 4:
            checkAndUpdateElementValue(view, def, 3, v3);
        case 3:
            checkAndUpdateElementValue(view, def, 2, v2);
        case 2:
            checkAndUpdateElementValue(view, def, 1, v1);
        case 1:
            checkAndUpdateElementValue(view, def, 0, v0);
    }
}
/**
 * @param {?} view
 * @param {?} def
 * @param {?} values
 * @return {?}
 */
export function checkAndUpdateElementDynamic(view, def, values) {
    for (let /** @type {?} */ i = 0; i < values.length; i++) {
        checkAndUpdateElementValue(view, def, i, values[i]);
    }
}
/**
 * @param {?} view
 * @param {?} def
 * @param {?} bindingIdx
 * @param {?} value
 * @return {?}
 */
function checkAndUpdateElementValue(view, def, bindingIdx, value) {
    if (!checkAndUpdateBinding(view, def, bindingIdx, value)) {
        return;
    }
    value = unwrapValue(value);
    const /** @type {?} */ binding = def.bindings[bindingIdx];
    const /** @type {?} */ name = binding.name;
    const /** @type {?} */ renderNode = asElementData(view, def.index).renderElement;
    switch (binding.type) {
        case BindingType.ElementAttribute:
            setElementAttribute(view, binding, renderNode, name, value);
            break;
        case BindingType.ElementClass:
            setElementClass(view, renderNode, name, value);
            break;
        case BindingType.ElementStyle:
            setElementStyle(view, binding, renderNode, name, value);
            break;
        case BindingType.ElementProperty:
            setElementProperty(view, binding, renderNode, name, value);
            break;
    }
}
/**
 * @param {?} view
 * @param {?} binding
 * @param {?} renderNode
 * @param {?} name
 * @param {?} value
 * @return {?}
 */
function setElementAttribute(view, binding, renderNode, name, value) {
    const /** @type {?} */ securityContext = binding.securityContext;
    let /** @type {?} */ renderValue = securityContext ? view.root.sanitizer.sanitize(securityContext, value) : value;
    renderValue = renderValue != null ? renderValue.toString() : null;
    if (view.renderer) {
        view.renderer.setElementAttribute(renderNode, name, renderValue);
    }
    else {
        if (value != null) {
            renderNode.setAttribute(name, renderValue);
        }
        else {
            renderNode.removeAttribute(name);
        }
    }
}
/**
 * @param {?} view
 * @param {?} renderNode
 * @param {?} name
 * @param {?} value
 * @return {?}
 */
function setElementClass(view, renderNode, name, value) {
    if (view.renderer) {
        view.renderer.setElementClass(renderNode, name, value);
    }
    else {
        if (value) {
            renderNode.classList.add(name);
        }
        else {
            renderNode.classList.remove(name);
        }
    }
}
/**
 * @param {?} view
 * @param {?} binding
 * @param {?} renderNode
 * @param {?} name
 * @param {?} value
 * @return {?}
 */
function setElementStyle(view, binding, renderNode, name, value) {
    let /** @type {?} */ renderValue = view.root.sanitizer.sanitize(SecurityContext.STYLE, value);
    if (renderValue != null) {
        renderValue = renderValue.toString();
        const /** @type {?} */ unit = binding.suffix;
        if (unit != null) {
            renderValue = renderValue + unit;
        }
    }
    else {
        renderValue = null;
    }
    if (view.renderer) {
        view.renderer.setElementStyle(renderNode, name, renderValue);
    }
    else {
        if (renderValue != null) {
            renderNode.style[name] = renderValue;
        }
        else {
            // IE requires '' instead of null
            // see https://github.com/angular/angular/issues/7916
            ((renderNode.style))[name] = '';
        }
    }
}
/**
 * @param {?} view
 * @param {?} binding
 * @param {?} renderNode
 * @param {?} name
 * @param {?} value
 * @return {?}
 */
function setElementProperty(view, binding, renderNode, name, value) {
    const /** @type {?} */ securityContext = binding.securityContext;
    let /** @type {?} */ renderValue = securityContext ? view.root.sanitizer.sanitize(securityContext, value) : value;
    if (view.renderer) {
        view.renderer.setElementProperty(renderNode, name, renderValue);
        if (isDevMode() && (view.def.flags & ViewFlags.DirectDom) === 0) {
            setBindingDebugInfo(view.renderer, renderNode, name, renderValue);
        }
    }
    else {
        renderNode[name] = renderValue;
    }
}
//# sourceMappingURL=element.js.map