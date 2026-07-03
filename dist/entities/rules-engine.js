"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluateRule = evaluateRule;
exports.evaluateRules = evaluateRules;
exports.evaluateProducts = evaluateProducts;
exports.filterMatchingProducts = filterMatchingProducts;
/** Coerce both sides to numbers when both look numeric, otherwise return null. */
function asComparableNumbers(a, b) {
    const na = typeof a === 'number' ? a : typeof a === 'string' && a.trim() !== '' ? Number(a) : NaN;
    const nb = typeof b === 'number' ? b : typeof b === 'string' && b.trim() !== '' ? Number(b) : NaN;
    if (Number.isNaN(na) || Number.isNaN(nb))
        return null;
    return [na, nb];
}
/** Loose equality that treats numeric strings and numbers as equal. */
function looseEquals(a, b) {
    if (a === b)
        return true;
    const nums = asComparableNumbers(a, b);
    return nums !== null && nums[0] === nums[1];
}
/**
 * Evaluate a single rule against the input object.
 * Returns `false` (never throws) when the field is missing or the types don't apply.
 */
function evaluateRule(rule, input) {
    if (!rule || !rule.field)
        return false;
    const actual = input?.[rule.field];
    switch (rule.operator) {
        case 'eq':
            return looseEquals(actual, rule.value);
        case 'ne':
            return actual !== undefined && !looseEquals(actual, rule.value);
        case 'lt':
        case 'lte':
        case 'gt':
        case 'gte': {
            const nums = asComparableNumbers(actual, rule.value);
            if (nums === null)
                return false;
            const [x, y] = nums;
            if (rule.operator === 'lt')
                return x < y;
            if (rule.operator === 'lte')
                return x <= y;
            if (rule.operator === 'gt')
                return x > y;
            return x >= y;
        }
        case 'between': {
            if (!Array.isArray(rule.value) || rule.value.length !== 2)
                return false;
            const lo = asComparableNumbers(actual, rule.value[0]);
            const hi = asComparableNumbers(actual, rule.value[1]);
            if (lo === null || hi === null)
                return false;
            return lo[0] >= lo[1] && hi[0] <= hi[1];
        }
        case 'in': {
            if (!Array.isArray(rule.value))
                return false;
            return rule.value.some((v) => looseEquals(actual, v));
        }
        case 'nin': {
            if (!Array.isArray(rule.value))
                return false;
            return actual !== undefined && !rule.value.some((v) => looseEquals(actual, v));
        }
        default:
            return false;
    }
}
/**
 * Evaluate all rules of a product against the input object (global AND).
 * No rules ⇒ `true`.
 */
function evaluateRules(rules, input) {
    if (!rules || rules.length === 0)
        return true;
    return rules.every((rule) => evaluateRule(rule, input));
}
/** Evaluate every product against the SAME input object. */
function evaluateProducts(products, input) {
    if (!Array.isArray(products))
        return [];
    return products.map((p) => ({
        productId: p.productId,
        met: evaluateRules(p.rules, input),
    }));
}
/** Convenience: return only the products that satisfy their conditions. */
function filterMatchingProducts(products, input) {
    if (!Array.isArray(products))
        return [];
    return products.filter((p) => evaluateRules(p.rules, input));
}
//# sourceMappingURL=rules-engine.js.map