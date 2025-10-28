import * as yup from "yup";
import { extractNumeric } from "../../utils";

/**
 * Validates an Iranian ID number (birth certificate).
 * Accepts 1 to 10 digits.
 *
 * @param id - The ID string.
 * @returns True if valid, otherwise false.
 */
export function isValidIranianIdNumber(id?: string): boolean {
    if (!id) return false;
    return /^[0-9]{1,10}$/.test(extractNumeric(id));
}

/**
 * Adds `.iranianIdNumber()` method to Yup string schema.
 *
 * @param defMessage - Default error message.
 */
export function addIranianIdNumberMethod(defMessage = "id_number") {
    yup.addMethod<yup.StringSchema>(
        yup.string,
        "iranianIdNumber",
        function (message: string = defMessage) {
            return this.test(
                "iranianIdNumber",
                message,
                (v) => !v || isValidIranianIdNumber(v)
            );
        }
    );
}

declare module "yup" {
    interface StringSchema {
        /**
         * Validates that the value is a valid Iranian ID number.
         *
         * @param message - Custom error message.
         */
        iranianIdNumber(message?: string): this;
    }
}
