/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { QueryList } from '../../linker';
import { Type } from '../../type';
import { LNode } from './node';
/** Used for tracking queries (e.g. ViewChild, ContentChild). */
export interface LQuery {
    /**
     * Used to ask query if it should be cloned to the child element.
     *
     * For example in the case of deep queries the `child()` returns
     * query for the child node. In case of shallow queries it returns
     * `null`.
     */
    child(): LQuery | null;
    /**
     * Notify `LQuery` that a new `LNode` has been created and needs to be added to query results
     * if matching query predicate.
     */
    addNode(node: LNode): void;
    /**
     * Notify `LQuery` that a  `LNode` has been created and needs to be added to query results
     * if matching query predicate.
     */
    container(): LQuery | null;
    /**
     * Notify `LQuery` that a new view was created and is being entered in the creation mode.
     * This allow queries to prepare space for matching nodes from views.
     */
    enterView(newViewIndex: number): LQuery | null;
    /**
     * Notify `LQuery` that an `LViewNode` has been removed from `LContainerNode`. As a result all
     * the matching nodes from this view should be removed from container's queries.
     */
    removeView(removeIndex: number): void;
    /**
     * Add additional `QueryList` to track.
     *
     * @param queryList `QueryList` to update with changes.
     * @param predicate Either `Type` or selector array of [key, value] predicates.
     * @param descend If true the query will recursively apply to the children.
     * @param read Indicates which token should be read from DI for this query.
     */
    track<T>(queryList: QueryList<T>, predicate: Type<any> | string[], descend?: boolean, read?: QueryReadType<T> | Type<T>): void;
}
export declare class QueryReadType<T> {
    private defeatStructuralTyping;
}
export declare const unusedValueExportToPlacateAjd = 1;