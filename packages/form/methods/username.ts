import * as yup from "yup";

/**
 * Validates a username (letters, numbers, underscores only).
 *
 * @param username - The username string.
 * @returns True if valid, otherwise false.
 */
export function isValidUsername(username?: string): boolean {
    if (!username) return true;
    return /^[a-zA-Z0-9_]+$/.test(username);
}

/**
 * Adds `.username()` method to Yup string schema.
 *
 * @param defMessage - Default error message.
 */
export function addUsernameMethod(defMessage = "username") {
    yup.addMethod<yup.StringSchema>(
        yup.string,
        "username",
        function (message: string = defMessage) {
            return this.test(
                "username",
                message,
                (v) => !v || isValidUsername(v),
            );
        },
    );
}

declare module "yup" {
    interface StringSchema {
        /**
         * Validates that the value is a valid username.
         *
         * @param message - Custom error message.
         */
        username(message?: string): this;
    }
}
