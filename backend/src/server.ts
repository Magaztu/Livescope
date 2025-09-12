import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
// I've gotta fix these imports CURSE YOUUU TS MODULESSS

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

const DATA_PATH = path.join(__dirname, "..","..","cern-open-data","output","event_data.json");

app.get("/events", (req, res) => {
    try {
        const rawData = fs.readFileSync(DATA_PATH, "utf-8");
        const jsonData = JSON.parse(rawData);

        res.json(jsonData)
    }
    catch (err) {
        res.status(500).json({error: "Failed to load event data"})
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});