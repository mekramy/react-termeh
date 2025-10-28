import type { MaskitoElementPredicate } from "@maskito/core";
import { useMaskito } from "@maskito/react";
import { useMemo } from "react";
import { globalTokens, resolveOptions } from "./options";
import type { MaskOption } from "./types";

/**
 * Custom hook for applying masking functionality to form elements
 *
 * @param constructor - Configuration object for the mask
 * @param elementPredicate - Optional predicate to determine which elements to mask
 * @returns A ref object to be attached to the target input element
 */
export function useMasker(
    constructor: MaskOption,
    elementPredicate?: MaskitoElementPredicate,
) {
    const options = useMemo(
        () => resolveOptions(globalTokens, constructor),
        [constructor],
    );

    return useMaskito({ options, elementPredicate });
}
