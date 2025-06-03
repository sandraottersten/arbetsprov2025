import * as yup from "yup";

export type Activity =
  | "paddling"
  | "cooking"
  | "martial_arts"
  | "football"
  | "music"
  | "dance"
  | "crafts"
  | "athletics"
  | "games";

export interface ActivityOption {
  value: Activity;
  label: string;
}

export const activities: ActivityOption[] = [
  { value: "paddling", label: "Paddling" },
  { value: "cooking", label: "Matlagning" },
  { value: "martial_arts", label: "Kampsport" },
  { value: "football", label: "Fotboll" },
  { value: "music", label: "Musik" },
  { value: "dance", label: "Dans" },
  { value: "crafts", label: "Pyssel" },
  { value: "athletics", label: "Friidrott" },
  { value: "games", label: "Lekar" },
] as const;

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
