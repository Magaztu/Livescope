import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
// I've gotta fix these imports CURSE YOUUU TS MODULESSS

import { fileURLToPath } from "url"
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

const DATA_PATH = path.join(__dirname, "..","..","cern-open-data","output","event_data.json");

app.get("/events", (req, res) => {
    try {
        console.log("Reading JSON from:", DATA_PATH);
        const rawData = fs.readFileSync(DATA_PATH, "utf-8"); // ! Can't use this method cuz it's TOO BEEG
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

// Secondary route, for stream-testing purposes

import { createReadStream } from "fs";
import { join } from "path";
import parser from "stream-json/parser.js";
import streamValues from "stream-json/streamers/streamValues.js"; // May this be your inner strenght, wildcard

const streamedPath = join(__dirname, "..","..","cern-open-data","output","event_data.json"); // ? No path.join since I'm importing join directly

app.get("/events-stream", (req, res) => {
    const results: Record<string, any[]> = {};

    const stream = createReadStream(streamedPath).pipe(new parser()).pipe(new streamValues());

    stream.on("data", (data : { value: any }) => {
        const { value } = data;
        // if (typeof value === "object" && value !== null){
        //     Object.entries(value).forEach(([key, val]) => {
        //         if (!results[key]) results[key] = []; // * One line if !!
        //         if (Array.isArray(val)) {results[key].concat(val);}
        //     });
        // }
        // ~ This will allow me to see the data's json' structure, early:
        console.log("Data, DATA EVENTTTT!", value);
        res.json({sample: value});
    });

    stream.on("end", () => {
        res.json(results);
    });

    stream.on("error", (err: Error) => {
        console.error(`Stream error: ${err}`)
        res.status(500).json({error: "Failed to stream data pipipi"})
    })

});