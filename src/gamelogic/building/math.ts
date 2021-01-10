export function asReliability(prob: number): number {
    return Math.log10(prob) + 10;
}

/**
 * For single-currency, compute "adjusted cost" from a purchase with a one-time, fixed cost and
 * constant revenue over time. Essentially a utility function for purchases, factoring in how much
 * of a benefit the additional revenue will have for offsetting the cost.
 *
 * @param currentRevenue the current amount of currency produced per unit of time
 * @param cost one-time fixed cost
 * @param additionalRevenue constant increase in revenue this purchase will give
 * @returns adjusted purchase cost, lower -> better
 *
 * Proof:
 * Show that buying `A` and then `B` takes less time than buying `B` then `A`. Reduces into
 * formula that relies on just properties of `A` or `B`, not interlinked.
 * ```
 * naive_ineq = (
 *     (c_A / r) + (c_B / (r + r_A))
 * ) < (c_B / r) + (c_A / (r + r_B))
 *
 * refined_ineq = (r * c_A + r_A * c_A + r * c_B) * (r + r_B) <
 *                (r + r_A) * (r * c_B + r_B * c_B + r * c_A)
 * refined_ineq = c_A * (r + r_A) / r_A <  c_B * (r + r_B) / r_B
 * refined_ineq = (c_A * (1 + r / r_A)) < (c_B * (1 + r / r_B))
 * ```
 */
export function adjustedCost(
    currentRevenue: number,
    cost: number,
    additionalRevenue: number
): number {
    return cost * (1.0 + currentRevenue / additionalRevenue);
}
