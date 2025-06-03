import { activities } from "@client/types/activities";
import { Activity } from "@client/types/activities";
import * as yup from "yup";

export type FormData = {
  name: string;
  email: string;
  activities: Activity[];
};

export const defaultValues: FormData = {
  name: "",
  email: "",
  activities: [],
};

export const formValidationSchema = yup
  .object({
    name: yup
      .string()
      .transform((value) => value?.trim())
      .min(2, "Namnet måste vara minst 2 tecken")
      .required("Namn är obligatoriskt"),
    email: yup
      .string()
      .transform((value) => value?.trim())
      .email("Ogiltig email adress")
      .required("Email är obligatoriskt"),
    activities: yup
      .array()
      .of(
        yup
          .string()
          .oneOf(activities.map((a) => a.value))
          .required()
      )
      .defined()
      .min(3, "Välj 3 aktiviteter")
      .max(3, "Välj 3 aktiviteter")
      .required("Välj 3 aktiviteter"),
  })
  .required();
