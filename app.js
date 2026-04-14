import express from "express";
import cors from "cors";
import processGender from "./processGender.js";

const PORT = 3000;

const app = express();
app.use(cors());

app.get("/api/classify", processGender);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
