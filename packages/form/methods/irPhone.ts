import * as yup from "yup";
import { extractNumeric } from "../../utils";

/**
 * Validates an Iranian phone number.
 * Format: starts with 0, then [1-9], then 9 digits (11 digits total).
 *
 * @param phone - The phone number string.
 * @returns True if valid, otherwise false.
 */
export function isValidIranianPhone(phone?: string): boolean {
    if (!phone) return false;
    return /^0[1-9][0-9]{9}$/.test(extractNumeric(phone));
}

/**
 * Adds `.iranianPhone()` method to Yup string schema.
 *
 * @param defMessage - Default error message.
 */
export function addIranianPhoneMethod(defMessage = "phone") {
    yup.addMethod<yup.StringSchema>(
        yup.string,
        "iranianPhone",
        function (message: string = defMessage) {
            return this.test(
                "iranianPhone",
                message,
                (v) => !v || isValidIranianPhone(v)
            );
        }
    );
}

declare module "yup" {
    interface StringSchema {
        /**
         * Validates that the value is a valid Iranian phone number.
         *
         * @param message - Custom error message.
         */
        iranianPhone(message?: string): this;
    }
}
