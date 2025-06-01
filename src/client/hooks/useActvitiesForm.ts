import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { submitActivitiesForm } from "../api/activities";
import {
  FormData,
  Activity,
  defaultValues,
  formValidationSchema,
} from "../types/form";

interface SubmissionStatus {
  isSuccess: boolean;
  message: string;
}

export const useActivitiesForm = () => {
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
  });

  const selectedActivities = watch("activities");

  const handleDeleteActivity = (activityToDelete: Activity) => {
    const updatedActivities = selectedActivities.filter(
      (activity) => activity !== activityToDelete
    );
    setValue("activities", updatedActivities);
  };

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      setSubmissionStatus({ isSuccess: false, message: "" });

      const result = await submitActivitiesForm(data);
      setSubmissionStatus({
        isSuccess: true,
        message: "Din anmälan har skickats in!",
      });
      return result;
    } catch (error) {
      setSubmissionStatus({
        isSuccess: false,
        message:
          "Ett fel uppstod vid inskickning av formuläret. Försök igen senare.",
      });
      throw error;
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
