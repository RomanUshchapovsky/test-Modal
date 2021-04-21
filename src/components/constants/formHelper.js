import * as Yup from "yup";
import { MSG } from "./messages";

export const FORM = {
  enableReinitialize: true,
  validateOnChange: true,
  validationSchema: Yup.object().shape({
    text: Yup.string().required(MSG.thisFieldIsRequired),

  }),
  initialValues: {
    text: "",
    file: null,
  },
};