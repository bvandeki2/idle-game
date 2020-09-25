export function asReliability(prob: number): number {
    return Math.log10(prob) + 10;
}
