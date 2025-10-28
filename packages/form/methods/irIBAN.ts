import * as yup from "yup";
import { extractNumeric } from "../../utils";

/**
 * Validates an Iranian IBAN.
 * Supports inputs with or without the "IR" prefix and requires 24 digits after "IR".
 *
 * @param iban - The IBAN string.
 * @returns True if valid, otherwise false.
 */
export function isValidIranianIBAN(iban?: string): boolean {
    if (!iban) return false;
    iban = extractNumeric(iban);

    // Ensure it starts with "IR"
    if (!iban.startsWith("IR")) {
        iban = "IR" + iban;
    }

    // Format: IR + 24 digits
    if (!/^IR[0-9]{24}$/.test(iban)) return false;

    // Move first 4 characters to the end
    const rearranged = iban.slice(4) + iban.slice(0, 4);

    // Convert to numeric string
    let numericIBAN = "";
    for (const char of rearranged) {
        if (char >= "A" && char <= "Z") {
            numericIBAN += (char.charCodeAt(0) - 55).toString(); // 'A' -> 10
        } else if (char >= "0" && char <= "9") {
            numericIBAN += char;
        } else {
            return false;
        }
    }

    // Use BigInt for modulo calculation
    try {
        const ibanBigInt = BigInt(numericIBAN);
        return ibanBigInt % 97n === 1n;
    } catch {
        return false;
    }
}

/**
 * Adds `.iranianIBAN()` method to Yup string schema.
 *
 * @param defMessage - Default error message.
 */
export function addIranianIBANMethod(defMessage = "iban") {
    yup.addMethod<yup.StringSchema>(
        yup.string,
        "iranianIBAN",
        function (message: string = defMessage) {
            return this.test(
                "iranianIBAN",
                message,
                (v) => !v || isValidIranianIBAN(v),
            );
        },
    );
}

declare module "yup" {
    interface StringSchema {
        /**
         * Validates that the value is a valid Iranian IBAN.
         *
         * @param message - Custom error message.
         */
        iranianIBAN(message?: string): this;
    }
}
