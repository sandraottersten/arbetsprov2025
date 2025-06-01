import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import formImage from "./assets/juice-mendez-0wPugJfKafQ-unsplash.jpg";
import {
  Input,
  Label,
  Button,
  Select,
  Chip,
  Description,
  FormError,
} from "@client/components";
import {
  FormData,
  Activity,
  activities,
  formValidationSchema,
  defaultValues,
} from "./types/form";
import { useState } from "react";

const App = () => {
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
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Form submitted:", data);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Ett fel uppstod vid inskickning av formuläret"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen w-screen">
      <div className="relative flex-1">
        <img
          src={formImage}
          alt="Glada ungdomar utomhus"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 p-4 overflow-y-auto flex flex-col justify-center">
        <div className="max-w-[500px] mx-auto w-full">
          <h1 className="text-4xl font-bold mb-6">Anmälan lägerverksamhet</h1>
          <p className="mb-5 text-lg">
            Fyll i formuläret nedan för att skicka in din anmälan till
            lägerverksamheten.
          </p>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            aria-label="Anmälningsformulär för lägerverksamhet"
          >
            {submitError && (
              <div
                role="alert"
                className="bg-error/10 text-error p-4 rounded-md"
              >
                {submitError}
              </div>
            )}

            <fieldset className="space-y-4" disabled={isSubmitting}>
              <legend className="text-2xl font-bold">Personuppgifter</legend>

              <div>
                <Label htmlFor="name" required label="För- och efternamn" />
                <Input
                  type="text"
                  id="name"
                  name="name"
                  register={register}
                  aria-invalid={errors.name ? "true" : "false"}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name?.message && (
                  <FormError message={errors.name.message} id="name-error" />
                )}
              </div>

              <div>
                <Label htmlFor="email" required label="Email" />
                <Input
                  type="email"
                  id="email"
                  name="email"
                  register={register}
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email?.message && (
                  <FormError message={errors.email.message} id="email-error" />
                )}
              </div>
            </fieldset>

            <fieldset className="space-y-4" disabled={isSubmitting}>
              <legend className="text-2xl font-bold">Aktiviteter</legend>
              <div className="flex flex-wrap gap-2">
                {selectedActivities?.map((activity) => (
                  <Chip
                    key={activity}
                    label={
                      activities.find((a) => a.value === activity)?.label ||
                      activity
                    }
                    onDelete={() => handleDeleteActivity(activity)}
                  />
                ))}
              </div>
              <Controller
                name="activities"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select<Activity>
                    id="activities"
                    options={activities}
                    onChange={(newValue) => {
                      const newActivities = [...(value || []), newValue];
                      onChange(newActivities);
                    }}
                    placeholder="Välj aktivitet"
                    selectedOptions={value}
                    disabled={selectedActivities.length >= 3}
                    error={errors.activities?.message}
                  />
                )}
              />
              {errors.activities?.message && (
                <FormError
                  message={errors.activities.message}
                  id="activities-error"
                />
              )}
              <Description text="Välj 3 aktiviteter som du är intresserad av." />
            </fieldset>

            <div className="mt-6">
              <Button
                type="submit"
                text={isSubmitting ? "Skickar..." : "Skicka in anmälan"}
                disabled={isSubmitting}
                aria-busy={isSubmitting}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
