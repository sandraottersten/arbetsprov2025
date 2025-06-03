import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { submitRegistrationForm } from "@client/api/registration";
import { Activity } from "@client/types/activities";
import {
  FormData,
  formValidationSchema,
  defaultValues,
} from "@client/form/formValidation";

interface SubmissionStatus {
  isSuccess: boolean;
  message: string;
}

interface Return {
  register: ReturnType<typeof useForm<FormData>>["register"];
  control: ReturnType<typeof useForm<FormData>>["control"];
  handleSubmit: ReturnType<typeof useForm<FormData>>["handleSubmit"];
  errors: ReturnType<typeof useForm<FormData>>["formState"]["errors"];
  selectedActivities: Activity[];
  handleDeleteActivity: (activity: Activity) => void;
  onSubmit: (data: FormData) => Promise<void>;
  isSubmitting: boolean;
  submissionStatus: SubmissionStatus;
}

export const useRegistrationForm = (): Return => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>({
    isSuccess: false,
    message: "",
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormData>({
    defaultValues,
    resolver: yupResolver(formValidationSchema),
    mode: "onSubmit",
    reValidateMode: "onBlur",
  });

  const selectedActivities = watch("activities");

  const handleDeleteActivity = (activityToDelete: Activity) => {
    setValue(
      "activities",
      selectedActivities.filter((activity) => activity !== activityToDelete)
    );
  };

  const onSubmit = async (data: FormData) => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      await submitRegistrationForm(data);
      setSubmissionStatus({
        isSuccess: true,
        message: "Din anmälan har skickats in!",
      });
    } catch (error) {
      setSubmissionStatus({
        isSuccess: false,
        message:
          "Ett fel uppstod vid inskickning av formuläret. Försök igen senare.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    register,
    control,
    handleSubmit,
    errors,
    selectedActivities,
    handleDeleteActivity,
    onSubmit,
    isSubmitting,
    submissionStatus,
  };
};
