import * as Yup from "yup";


export const FormValidation = {
    FIELD_ITEM: {
        SCHEME: {
            file: "",
        },
        VALIDATION: Yup.object({
            file: Yup.mixed().required("A file is required"),
        }),
    }
}