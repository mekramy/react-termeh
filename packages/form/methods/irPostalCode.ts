import * as yup from "yup";
import { extractNumeric } from "../../utils";

/**
 * Validates an Iranian postal code (10 digits).
 *
 * @param postalCode - The postal code string.
 * @returns True if valid, otherwise false.
 */
export function isValidIranianPostalCode(postalCode?: string): boolean {
    if (!postalCode) return false;
    return /^[0-9]{10}$/.test(extractNumeric(postalCode));
}

/**
 * Adds `.iranianPostalCode()` method to Yup string schema.
 *
 * @param defMessage - Default error message.
 */
export function addIranianPostalCodeMethod(defMessage = "postal_code") {
    yup.addMethod<yup.StringSchema>(
        yup.string,
        "iranianPostalCode",
        function (message: string = defMessage) {
            return this.test(
                "iranianPostalCode",
                message,
                (v) => !v || isValidIranianPostalCode(v),
            );
        },
    );
}

declare module "yup" {
    interface StringSchema {
        /**
         * Validates that the value is a valid Iranian postal code.
         *
         * @param message - Custom error message.
         */
        iranianPostalCode(message?: string): this;
    }
}
