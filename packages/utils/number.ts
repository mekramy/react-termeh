/**
 * Parses a value into a number, handling strings with commas and spaces.
 * @param v - The value to parse.
 * @returns The parsed number, or NaN if invalid.
 */
export function parseNumber(v: unknown): number {
    if (v == null) return NaN;

    const match = String(v)
        .replace(/[^0-9.-]+/g, "")
        .match(/-?\d+(\.\d+)?/);
    if (!match) return NaN;
    return Number(match[0]);
}

/**
 * Extract all numeric digits (0-9) from the input.
 * @param v - The input value of any type
 * @returns A string containing only digits
 */
export function extractNumeric(v: unknown): string {
    if (v == null) return "";
    return String(v).match(/\d/g)?.join("") || "";
}

/**
 * Replaces all non-numeric characters in a string with the given separator.
 * @param v - The value to process.
 * @param separator - The separator to use.
 * @returns The string with unified separators.
 */
export function unifySeparator(v: unknown, separator: string): string {
    if (v == null) return "";
    return String(v).replace(/[^0-9.-]+/g, separator);
}

/**
 * Formats a number with thousands separators, optionally customizing the separator.
 * @param v - The value to format.
 * @param separator - The separator to use (default is comma).
 * @returns The formatted number string, or empty string if invalid.
 */
export function formatNumber(v: unknown, separator = ","): string {
    const num = parseNumber(v);
    if (isNaN(num)) return "";

    return num.toLocaleString("en-US").replace(/,/g, separator);
}
