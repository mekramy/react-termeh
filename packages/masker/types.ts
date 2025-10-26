import type { MaskitoMask, MaskitoOptions } from "@maskito/core";

/**
 * Maps custom string tokens to RegExp patterns.
 * Used for defining custom masking patterns.
 */
export type TokenMap = Record<string, RegExp>;

/**
 * A mask definition that can be either a string pattern or a MaskitoMask.
 *
 * @example
 * const stringPattern: Definition = "###-##-####";
 * const maskitoPattern: Definition = [/\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
 */
export type Definition = string | MaskitoMask;

/**
 * Configuration interface for Maskito patterns.
 * Provides options for both predefined and custom masks.
 */
export interface MaskOption {
    /** Custom masking options for advanced configurations */
    options?: MaskitoOptions;
    /** Pattern definition for basic masking needs */
    mask?: Definition;
}
