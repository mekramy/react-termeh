import * as yup from "yup";

/**
 * Validates if a file's size is within given byte limits.
 *
 * @param file - File to check.
 * @param minBytes - Minimum allowed size in bytes.
 * @param maxBytes - Maximum allowed size in bytes.
 * @returns True if valid, otherwise false.
 */
export function isValidFileSize(
    file?: File,
    minBytes: number = 0,
    maxBytes: number = Number.MAX_SAFE_INTEGER,
): boolean {
    if (!file) return true;
    return file.size >= minBytes && file.size <= maxBytes;
}

/**
 * Adds `.fileSize()` and `.filesSize()` methods to Yup mixed schema.
 *
 * @param defaultMessage - Default error message.
 */
export function addFileSizeMethod(defaultMessage = "file_size") {
    yup.addMethod<yup.MixedSchema>(
        yup.mixed,
        "fileSize",
        function (min: number, max: number, message = defaultMessage) {
            return this.test("fileSize", message, (v: any) => {
                if (!v) return true;
                const file = Array.isArray(v) ? v[0] : v.item?.(0);
                if (!file) return true;
                return isValidFileSize(file as File, min, max);
            });
        },
    );

    yup.addMethod<yup.MixedSchema>(
        yup.mixed,
        "filesSize",
        function (min: number, max: number, message = defaultMessage) {
            return this.test("filesSize", message, (v: any) => {
                if (!v) return true;
                const files: File[] = Array.isArray(v)
                    ? v
                    : v.item
                      ? Array.from(v as FileList)
                      : [];
                if (!files.length) return true;
                return files.every((f) => isValidFileSize(f, min, max));
            });
        },
    );
}

declare module "yup" {
    interface MixedSchema {
        /**
         * Validates the size of the first file.
         *
         * @param min - Minimum allowed size in bytes.
         * @param max - Maximum allowed size in bytes.
         * @param message - Custom error message.
         */
        fileSize(min: number, max: number, message?: string): this;

        /**
         * Validates the size of all files.
         *
         * @param min - Minimum allowed size in bytes.
         * @param max - Maximum allowed size in bytes.
         * @param message - Custom error message.
         */
        filesSize(min: number, max: number, message?: string): this;
    }
}
