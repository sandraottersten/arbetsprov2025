import * as yup from "yup";

export enum Activity {
  ACT1 = "Paddling",
  ACT2 = "Matlagning",
  ACT3 = "Kampsport",
  ACT4 = "Fotboll",
  ACT5 = "Musik",
  ACT6 = "Dans",
  ACT7 = "Pyssel",
  ACT8 = "Friidrott",
  ACT9 = "Lekar",
}

export const activities = [
  { value: Activity.ACT1, label: "Paddling" },
  { value: Activity.ACT2, label: "Matlagning" },
  { value: Activity.ACT3, label: "Kampsport" },
  { value: Activity.ACT4, label: "Fotboll" },
  { value: Activity.ACT5, label: "Musik" },
  { value: Activity.ACT6, label: "Dans" },
  { value: Activity.ACT7, label: "Pyssel" },
  { value: Activity.ACT8, label: "Friidrott" },
  { value: Activity.ACT9, label: "Lekar" },
];

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
      .of(yup.string().oneOf(Object.values(Activity)).required())
      .defined()
      .min(3, "Välj 3 aktiviteter")
      .max(3, "Välj 3 aktiviteter")
      .required("Välj 3 aktiviteter"),
  })
  .required();
