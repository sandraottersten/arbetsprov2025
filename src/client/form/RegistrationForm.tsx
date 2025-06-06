import { Controller } from "react-hook-form";
import { Activity, activities } from "@client/types/activities";
import { useRegistrationForm } from "@client/form/useRegistrationForm";
import {
  Input,
  Label,
  Button,
  Select,
  Chip,
  Description,
  Error,
  Alert,
} from "@client/components";

const RegistrationForm = () => {
  const {
    register,
    control,
    handleSubmit,
    errors,
    selectedActivities,
    handleDeleteActivity,
    onSubmit,
    isSubmitting,
    submissionStatus,
  } = useRegistrationForm();

  if (submissionStatus.message) {
    return (
      <Alert
        message={submissionStatus.message}
        type={submissionStatus.isSuccess ? "success" : "error"}
      />
    );
  }

  return (
    <form
      className="flex flex-col gap-8"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Anmälningsformulär för lägerverksamhet"
    >
      <fieldset className="space-y-5" disabled={isSubmitting}>
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
            <Error message={errors.name.message} id="name-error" />
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
            <Error message={errors.email.message} id="email-error" />
          )}
        </div>
      </fieldset>

      <fieldset className="space-y-5 mb-4" disabled={isSubmitting}>
        <legend className="text-2xl font-bold">Aktiviteter</legend>
        {selectedActivities.length > 0 && (
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
        )}
        <div>
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
            <Error message={errors.activities.message} id="activities-error" />
          )}
          <Description text="Välj 3 aktiviteter som du är intresserad av." />
        </div>
      </fieldset>

      <Button
        type="submit"
        text={isSubmitting ? "Skickar..." : "Skicka in anmälan"}
        disabled={isSubmitting}
        aria-busy={isSubmitting}
        className="md:w-fit"
      />
    </form>
  );
};

export default RegistrationForm;
