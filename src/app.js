import express from "express";
import cors from "cors";
import dotenv from "dotenv";

/////////////////////////////////////////////////////
// Config
/////////////////////////////////////////////////////
dotenv.config({ path: ".env.local" });

const TMDB_BASE_URL = "https://api.themoviedb.org";
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_READ_ACCESS_TOKEN = process.env.TMDB_READ_ACCESS_TOKEN;

const app = express();
app.use(cors());

/////////////////////////////////////////////////////
// Endpoints
/////////////////////////////////////////////////////
app.get("/health", (req, res) => {
	res.json({ status: "ok" });
});

// TODO: All endpoints

export default app;
