import express from "express";

const app = express();
const PORT = 3001;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
