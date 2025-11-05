import * as yup from "yup";

/**
 * Validates if a file's MIME type is allowed.
 *
 * @param file - File to check.
 * @param allowedMimes - List of allowed MIME types.
 * @returns True if valid, otherwise false.
 */
export function isValidFileType(
    file?: File,
    allowedMimes: string[] = [],
): boolean {
    if (!file) return true;
    return allowedMimes.includes(file.type);
}

/**
 * Adds `.fileType()` and `.filesType()` methods to Yup mixed schema.
 *
 * @param defaultMessage - Default error message.
 */
export function addFileTypeMethod(defaultMessage = "file_type") {
    yup.addMethod<yup.MixedSchema>(
        yup.mixed,
        "fileType",
        function (allowedMimes: string[], message = defaultMessage) {
            return this.test("fileType", message, (v: any) => {
                if (!v) return true;
                const file = Array.isArray(v) ? v[0] : v.item?.(0);
                if (!file) return true;
                return isValidFileType(file as File, allowedMimes);
            });
        },
    );

    yup.addMethod<yup.MixedSchema>(
        yup.mixed,
        "filesType",
        function (allowedMimes: string[], message = defaultMessage) {
            return this.test("filesType", message, (v: any) => {
                if (!v) return true;
                const files: File[] = Array.isArray(v)
                    ? v
                    : v.item
                      ? Array.from(v as FileList)
                      : [];
                if (!files.length) return true;
                return files.every((file) =>
                    isValidFileType(file as File, allowedMimes),
                );
            });
        },
    );
}

declare module "yup" {
    interface MixedSchema {
        /**
         * Validates the MIME type of the first file.
         *
         * @param mimes - List of allowed MIME types.
         * @param message - Custom error message.
         */
        fileType(mimes: string[], message?: string): this;

        /**
         * Validates the MIME type of all files.
         *
         * @param mimes - List of allowed MIME types.
         * @param message - Custom error message.
         */
        filesType(mimes: string[], message?: string): this;
    }
}
