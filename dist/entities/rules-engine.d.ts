/**
 * Rules engine for product conditions.
 *
 * A product may carry a set of conditions (rules) stored as JSON. Given an input
 * object (e.g. `{ peso: 7, raza: 'Labrador' }`) the engine decides whether the
 * product satisfies its conditions.
 *
 * Logic model: rules are combined with a global AND. OR within a single field is
 * expressed with the multi-value operators `in` / `nin`. There are no nested groups.
 *
 * The functions here are pure and framework-agnostic so the backend and the
 * frontend can evaluate conditions with identical results.
 */
export type RuleOperator = 'eq' | 'ne' | 'lt' | 'lte' | 'gt' | 'gte' | 'between' | 'in' | 'nin';
export interface Rule {
    /** Key looked up inside the input object, e.g. "peso". */
    field: string;
    operator: RuleOperator;
    /**
     * number/string for scalar operators; `[min, max]` for `between`;
     * an array for `in` / `nin`.
     */
    value: unknown;
}
/** Conditions of a single product. Combined with AND. */
export type ProductRules = Rule[];
export interface ProductWithRules {
    productId: string;
    /** `[]` or `undefined` ⇒ the product always matches. */
    rules?: ProductRules;
}
export interface ProductEvaluation {
    productId: string;
    met: boolean;
}
/**
 * Evaluate a single rule against the input object.
 * Returns `false` (never throws) when the field is missing or the types don't apply.
 */
export declare function evaluateRule(rule: Rule, input: Record<string, unknown>): boolean;
/**
 * Evaluate all rules of a product against the input object (global AND).
 * No rules ⇒ `true`.
 */
export declare function evaluateRules(rules: ProductRules | undefined, input: Record<string, unknown>): boolean;
/** Evaluate every product against the SAME input object. */
export declare function evaluateProducts(products: ProductWithRules[], input: Record<string, unknown>): ProductEvaluation[];
/** Convenience: return only the products that satisfy their conditions. */
export declare function filterMatchingProducts(products: ProductWithRules[], input: Record<string, unknown>): ProductWithRules[];
//# sourceMappingURL=rules-engine.d.ts.map