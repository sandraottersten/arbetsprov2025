import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  FormData,
  Activity,
  defaultValues,
  formValidationSchema,
} from "../types/form";
import { submitActivitiesForm } from "../api/activities";

export const useActivitiesForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

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
      setSubmitError(null);

      const result = await submitActivitiesForm(data);
      console.log("Form submitted successfully:", result);
      return result;
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Ett fel uppstod vid inskickning av formuläret"
      );
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
    submitError,
  };
};
