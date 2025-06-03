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
