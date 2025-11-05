import * as yup from "yup";

/**
 * Validates whether a string is a valid IPv4 or IPv6 address.
 *
 * @param ip - IP address to validate.
 * @returns True if valid, otherwise false.
 */
export function isValidIP(ip?: string): boolean {
    if (!ip) return true;

    // IPv4 regex
    const ipv4 =
        /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;

    // IPv6 regex (simplified)
    const ipv6 =
        /^(([0-9a-fA-F]{1,4}:){7}([0-9a-fA-F]{1,4}|:))|(::([0-9a-fA-F]{1,4}:){0,5}([0-9a-fA-F]{1,4}|:))$/;

    return ipv4.test(ip) || ipv6.test(ip);
}

/**
 * Adds `.ip()` method to Yup string schema.
 *
 * @param defMessage - Default error message.
 */
export function addIPMethod(defMessage = "ip") {
    yup.addMethod<yup.StringSchema>(
        yup.string,
        "ip",
        function (message: string = defMessage) {
            return this.test("ip", message, (v) => !v || isValidIP(v));
        },
    );
}

declare module "yup" {
    interface StringSchema {
        /**
         * Validates that the value is a valid IPv4 or IPv6 address.
         *
         * @param message - Custom error message.
         */
        ip(message?: string): this;
    }
}
