import * as yup from "yup";
import { extractNumeric } from "../../utils";

/**
 * Validates an Iranian bank card number using the Luhn algorithm.
 * Must contain exactly 16 digits.
 *
 * @param cardNumber - The card number string.
 * @returns True if valid, otherwise false.
 */
export function isValidIranianBankCard(cardNumber?: string): boolean {
    if (!cardNumber) return false;
    cardNumber = extractNumeric(cardNumber);

    // Must be exactly 16 digits
    if (!/^[0-9]{16}$/.test(cardNumber)) return false;

    let sum = 0;
    let alternate = false;

    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let n = parseInt(cardNumber[i], 10);
        if (alternate) {
            n *= 2;
            if (n > 9) n -= 9;
        }
        sum += n;
        alternate = !alternate;
    }

    return sum % 10 === 0;
}

/**
 * Adds `.iranianBankCard()` method to Yup string schema.
 *
 * @param defMessage - Default error message.
 */
export function addIranianBankCardMethod(defMessage = "bank_card") {
    yup.addMethod<yup.StringSchema>(
        yup.string,
        "iranianBankCard",
        function (message: string = defMessage) {
            return this.test(
                "iranianBankCard",
                message,
                (v) => !v || isValidIranianBankCard(v),
            );
        },
    );
}

declare module "yup" {
    interface StringSchema {
        /**
         * Validates that the value is a valid Iranian bank card number.
         *
         * @param message - Custom error message.
         */
        iranianBankCard(message?: string): this;
    }
}
