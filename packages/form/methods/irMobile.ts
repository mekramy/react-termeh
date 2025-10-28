import * as yup from "yup";
import { extractNumeric } from "../../utils";

/**
 * Validates an Iranian mobile number.
 * Must start with '09' and be 11 digits long.
 *
 * @param mobile - The mobile number string.
 * @returns True if valid, otherwise false.
 */
export function isValidIranianMobile(mobile?: string): boolean {
    if (!mobile) return false;
    return /^09[0-9]{9}$/.test(extractNumeric(mobile));
}

/**
 * Adds `.iranianMobile()` method to Yup string schema.
 *
 * @param defMessage - Default error message.
 */
export function addIranianMobileMethod(defMessage = "mobile") {
    yup.addMethod<yup.StringSchema>(
        yup.string,
        "iranianMobile",
        function (message: string = defMessage) {
            return this.test(
                "iranianMobile",
                message,
                (v) => !v || isValidIranianMobile(v),
            );
        },
    );
}

declare module "yup" {
    interface StringSchema {
        /**
         * Validates that the value is a valid Iranian mobile number.
         *
         * @param message - Custom error message.
         */
        iranianMobile(message?: string): this;
    }
}
