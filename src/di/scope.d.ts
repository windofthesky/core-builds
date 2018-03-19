import { InjectionToken } from './injection_token';
/**
 * An internal token whose presence in an injector indicates that the injector should treat itself
 * as a root scoped injector when processing requests for unknown tokens which may indicate
 * they are provided in the root scope.
 */
export declare const APP_ROOT: InjectionToken<boolean>;
