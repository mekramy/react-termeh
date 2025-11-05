import * as yup from "yup";
import { extractNumeric } from "../../utils";

/**
 * Validates an Iranian National Code (کد ملی).
 * Must be exactly 10 digits and pass checksum verification.
 *
 * @param nationalCode - The national code string.
 * @returns True if valid, otherwise false.
 */
export function isValidIranianNationalCode(nationalCode?: string): boolean {
    if (!nationalCode) return true;
    nationalCode = extractNumeric(nationalCode);

    if (!/^[0-9]{10}$/.test(nationalCode)) return false;

    const digits = nationalCode.split("").map(Number);
    const check = digits[9];
    let sum = 0;

    for (let i = 0; i < 9; i++) {
        sum += digits[i] * (10 - i);
    }

    const remainder = sum % 11;

    return remainder < 2 ? check === remainder : check === 11 - remainder;
}

/**
 * Adds `.iranianNationalCode()` method to Yup string schema.
 *
 * @param defMessage - Default error message.
 */
export function addIranianNationalCodeMethod(defMessage = "national_code") {
    yup.addMethod<yup.StringSchema>(
        yup.string,
        "iranianNationalCode",
        function (message: string = defMessage) {
            return this.test(
                "iranianNationalCode",
                message,
                (v) => !v || isValidIranianNationalCode(v),
            );
        },
    );
}

declare module "yup" {
    interface StringSchema {
        /**
         * Validates that the value is a valid Iranian National Code.
         *
         * @param message - Custom error message.
         */
        iranianNationalCode(message?: string): this;
    }
}
