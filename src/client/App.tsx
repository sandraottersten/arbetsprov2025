import React, { useState, ChangeEvent } from "react";
import formImage from "./assets/juice-mendez-0wPugJfKafQ-unsplash.jpg";
import { Input } from "./components/form/Input";
import { Label } from "./components/form/Label";
import { Button } from "./components/Button";
import { Select } from "./components/form/Select";
import Chip from "./components/Chip";
import { Description } from "./components/form/Description";

enum Activity {
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

const activities = [
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

interface FormData {
  name: string;
  email: string;
  activities: string[];
}

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    activities: [],
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      activities: [...prev.activities, value],
    }));
  };

  const handleDeleteActivity = (activityToDelete: string) => {
    setFormData((prev) => ({
      ...prev,
      activities: prev.activities.filter(
        (activity) => activity !== activityToDelete
      ),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you can add your form submission logic
  };

  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw" }}>
      <div style={{ flex: 1, position: "relative" }}>
        <img
          src={formImage}
          alt="Glada ungdomar utomhus"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right side - Form */}
      <div className="flex-1 p-4 overflow-y-auto flex flex-col justify-center">
        <div style={{ maxWidth: "500px", margin: "0 auto", width: "100%" }}>
          <h1 className="text-4xl font-bold mb-6">Anmälan lägerverksamhet</h1>
          <p style={{ marginBottom: "20px", fontSize: "1.2rem" }}>
            Fyll i formuläret nedan för att skicka in din anmälan till
            lägerverksamheten.
          </p>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold">Personuppgifter</h2>
            <div>
              <Label htmlFor="name" required>
                För- och efternamn
              </Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="email" required>
                Email
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <h2 className="text-2xl">Aktiviteter</h2>
              <div className="flex flex-wrap gap-2">
                {formData.activities.map((activity) => (
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
              <Select
                id="activities"
                options={activities}
                onChange={handleSelectChange}
                placeholder="Välj aktivitet"
                selectedOptions={formData.activities}
              />
              <Description>
                Välj aktiviteter som du är intresserad av att delta i.
              </Description>
            </div>

            <Button type="submit">Skicka in anmälan</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
