import express from "express";
import cors from "cors";

const app = express();
const PORT = 3001;

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "GET", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

app.post("/api/registration", (req, res) => {
  try {
    const formData = req.body;
    // TODO: Add database storage

    res.status(200).json({
      success: true,
      message: "Form submitted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while processing the form",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
