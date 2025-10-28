import { memo, useMemo } from "react";
import { mask } from "./masker";
import type { MaskOption } from "./types";

/**
 * Props interface for the Masker component
 * @interface MaskerProps
 */
interface MaskerProps {
    /** The input string to be masked */
    value: string;
    /** Configuration object for the masking pattern */
    constructor: MaskOption;
}

/**
 * Masker Component
 * Applies a mask pattern to an input string based on the provided configuration.
 * Uses memoization for performance optimization.
 *
 * @component
 */
const Masker: React.FC<MaskerProps> = ({ value, constructor }) => {
    const masked = useMemo(
        () => mask(value, constructor),
        [value, constructor],
    );

    return <>{masked}</>;
};

Masker.displayName = "Masker";
export default memo(Masker);
