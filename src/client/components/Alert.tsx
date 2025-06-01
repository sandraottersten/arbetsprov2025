import { CheckCircle, XCircle } from "lucide-react";

interface Props {
  message: string;
  type: "success" | "error";
}

const ALERT_STYLES = {
  success: {
    bg: "bg-accent",
    text: "text-dark",
    icon: CheckCircle,
    label: "Bekräftelse",
  },
  error: {
    bg: "bg-error/10",
    text: "text-error",
    icon: XCircle,
    label: "Felmeddelande",
  },
} as const;

const Alert = ({ message, type }: Props) => {
  const { bg, text, icon: Icon, label } = ALERT_STYLES[type];

  return (
    <div
      role="alert"
      aria-live="polite"
      aria-atomic="true"
      className={`${bg} p-4 rounded-md flex items-center gap-3`}
    >
      <Icon
        className={text}
        size={20}
        aria-hidden="true"
        role="presentation"
        aria-label={label}
      />
      <span className="sr-only">{type}:</span>
      <span>{message}</span>
    </div>
  );
};

export default Alert;
