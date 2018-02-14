import { PipeTransform } from '../change_detection/pipe_transform';
import { Type } from '../type';
import { ComponentDef, ComponentDefArgs, DirectiveDef, DirectiveDefArgs, PipeDef } from './interfaces/definition';
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
 */
export declare function defineComponent<T>(componentDefinition: ComponentDefArgs<T>): ComponentDef<T>;
export declare function NgOnChangesFeature(definition: DirectiveDef<any>): void;
export declare function PublicFeature<T>(definition: DirectiveDef<T>): void;
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
export declare const defineDirective: <T>(directiveDefinition: DirectiveDefArgs<T>) => DirectiveDef<T>;
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
 * @param type Pipe class reference. Needed to extract pipe lifecycle hooks.
 * @param factory A factory for creating a pipe instance.
 * @param pure Whether the pipe is pure.
 */
export declare function definePipe<T>({type, factory, pure}: {
    type: Type<T>;
    factory: () => PipeTransform;
    pure?: boolean;
}): PipeDef<T>;
