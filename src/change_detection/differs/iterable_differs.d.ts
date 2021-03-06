import { StaticProvider } from '../../di/provider';
/**
 * A type describing supported iterable types.
 *
 *
 */
export declare type NgIterable<T> = Array<T> | Iterable<T>;
/**
 * A strategy for tracking changes over time to an iterable. Used by {@link NgForOf} to
 * respond to changes in an iterable by effecting equivalent changes in the DOM.
 *
 *
 */
export interface IterableDiffer<V> {
    /**
     * Compute a difference between the previous state and the new `object` state.
     *
     * @param object containing the new value.
     * @returns an object describing the difference. The return value is only valid until the next
     * `diff()` invocation.
     */
    diff(object: NgIterable<V>): IterableChanges<V> | null;
}
/**
 * An object describing the changes in the `Iterable` collection since last time
 * `IterableDiffer#diff()` was invoked.
 *
 *
 */
export interface IterableChanges<V> {
    /**
     * Iterate over all changes. `IterableChangeRecord` will contain information about changes
     * to each item.
     */
    forEachItem(fn: (record: IterableChangeRecord<V>) => void): void;
    /**
     * Iterate over a set of operations which when applied to the original `Iterable` will produce the
     * new `Iterable`.
     *
     * NOTE: These are not necessarily the actual operations which were applied to the original
     * `Iterable`, rather these are a set of computed operations which may not be the same as the
     * ones applied.
     *
     * @param record A change which needs to be applied
     * @param previousIndex The `IterableChangeRecord#previousIndex` of the `record` refers to the
     *        original `Iterable` location, where as `previousIndex` refers to the transient location
     *        of the item, after applying the operations up to this point.
     * @param currentIndex The `IterableChangeRecord#currentIndex` of the `record` refers to the
     *        original `Iterable` location, where as `currentIndex` refers to the transient location
     *        of the item, after applying the operations up to this point.
     */
    forEachOperation(fn: (record: IterableChangeRecord<V>, previousIndex: number | null, currentIndex: number | null) => void): void;
    /**
     * Iterate over changes in the order of original `Iterable` showing where the original items
     * have moved.
     */
    forEachPreviousItem(fn: (record: IterableChangeRecord<V>) => void): void;
    /** Iterate over all added items. */
    forEachAddedItem(fn: (record: IterableChangeRecord<V>) => void): void;
    /** Iterate over all moved items. */
    forEachMovedItem(fn: (record: IterableChangeRecord<V>) => void): void;
    /** Iterate over all removed items. */
    forEachRemovedItem(fn: (record: IterableChangeRecord<V>) => void): void;
    /** Iterate over all items which had their identity (as computed by the `TrackByFunction`)
     * changed. */
    forEachIdentityChange(fn: (record: IterableChangeRecord<V>) => void): void;
}
/**
 * Record representing the item change information.
 *
 *
 */
export interface IterableChangeRecord<V> {
    /** Current index of the item in `Iterable` or null if removed. */
    readonly currentIndex: number | null;
    /** Previous index of the item in `Iterable` or null if added. */
    readonly previousIndex: number | null;
    /** The item. */
    readonly item: V;
    /** Track by identity as computed by the `TrackByFunction`. */
    readonly trackById: any;
}
/**
 * @deprecated v4.0.0 - Use IterableChangeRecord instead.
 */
export interface CollectionChangeRecord<V> extends IterableChangeRecord<V> {
}
/**
 * An optional function passed into {@link NgForOf} that defines how to track
 * items in an iterable (e.g. fby index or id)
 *
 *
 */
export interface TrackByFunction<T> {
    (index: number, item: T): any;
}
/**
 * Provides a factory for {@link IterableDiffer}.
 *
 *
 */
export interface IterableDifferFactory {
    supports(objects: any): boolean;
    create<V>(trackByFn?: TrackByFunction<V>): IterableDiffer<V>;
}
/**
 * A repository of different iterable diffing strategies used by NgFor, NgClass, and others.
 *
 */
export declare class IterableDiffers {
    /**
     * @deprecated v4.0.0 - Should be private
     */
    factories: IterableDifferFactory[];
    constructor(factories: IterableDifferFactory[]);
    static create(factories: IterableDifferFactory[], parent?: IterableDiffers): IterableDiffers;
    /**
     * Takes an array of {@link IterableDifferFactory} and returns a provider used to extend the
     * inherited {@link IterableDiffers} instance with the provided factories and return a new
     * {@link IterableDiffers} instance.
     *
     * The following example shows how to extend an existing list of factories,
     * which will only be applied to the injector for this component and its children.
     * This step is all that's required to make a new {@link IterableDiffer} available.
     *
     * ### Example
     *
     * ```
     * @Component({
     *   viewProviders: [
     *     IterableDiffers.extend([new ImmutableListDiffer()])
     *   ]
     * })
     * ```
     */
    static extend(factories: IterableDifferFactory[]): StaticProvider;
    find(iterable: any): IterableDifferFactory;
}
export declare function getTypeNameForDebugging(type: any): string;
