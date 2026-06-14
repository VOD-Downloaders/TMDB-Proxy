import express from "express";
import cors from "cors";
import dotenv from "dotenv";

/////////////////////////////////////////////////////
// Config
/////////////////////////////////////////////////////
dotenv.config({ path: ".env.local" });

const TMDB_BASE_URL = "https://api.themoviedb.org";
// const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_READ_ACCESS_TOKEN = process.env.TMDB_READ_ACCESS_TOKEN;

const app = express();
app.use(cors());

/////////////////////////////////////////////////////
// Helpers
/////////////////////////////////////////////////////
async function proxyTmdb(res, path, params = {}) {
	if (!TMDB_READ_ACCESS_TOKEN) {
		return res
			.status(500)
			.json({ error: "TMDB_READ_ACCESS_TOKEN is not configured" });
	}

	const url = new URL(`/3${path}`, TMDB_BASE_URL);
	url.searchParams.set("language", "en-US");
	for (const [key, value] of Object.entries(params)) {
		if (value !== undefined && value !== "") {
			url.searchParams.set(key, value);
		}
	}

	try {
		const tmdbRes = await fetch(url, {
			headers: {
				Authorization: `Bearer ${TMDB_READ_ACCESS_TOKEN}`,
				Accept: "application/json",
			},
		});

		const body = await tmdbRes.text();
		res
			.status(tmdbRes.status)
			.type(tmdbRes.headers.get("content-type") ?? "application/json")
			.send(body);
	} catch (error) {
		console.error("TMDB proxy error:", error);
		res.status(502).json({ error: "Failed to reach TMDB" });
	}
}

/////////////////////////////////////////////////////
// Endpoints
/////////////////////////////////////////////////////
app.get("/health", (req, res) => {
	res.json({ status: "ok" });
});

// Search
app.get("/search/movie", (req, res) => {
	const { query } = req.query;
	if (!query) {
		return res.status(400).json({ error: "Query is required" });
	}
	proxyTmdb(res, "/search/movie", { query, page: req.query.page });
});

app.get("/search/tv", (req, res) => {
	const { query } = req.query;
	if (!query) {
		return res.status(400).json({ error: "Query is required" });
	}
	proxyTmdb(res, "/search/tv", { query, page: req.query.page });
});

// Movies
app.get("/movie/popular", (req, res) => {
	proxyTmdb(res, "/movie/popular", { page: req.query.page });
});

app.get("/movie/:id", (req, res) => {
	proxyTmdb(res, `/movie/${encodeURIComponent(req.params.id)}`);
});

app.get("/movie/:id/external_ids", (req, res) => {
	proxyTmdb(res, `/movie/${encodeURIComponent(req.params.id)}/external_ids`);
});

// Series
app.get("/tv/popular", (req, res) => {
	proxyTmdb(res, "/tv/popular", { page: req.query.page });
});

app.get("/tv/:id", (req, res) => {
	proxyTmdb(res, `/tv/${encodeURIComponent(req.params.id)}`);
});

app.get("/tv/:id/external_ids", (req, res) => {
	proxyTmdb(res, `/tv/${encodeURIComponent(req.params.id)}/external_ids`);
});

// Seasons
app.get("/tv/:id/season/:season", (req, res) => {
	const { id, season } = req.params;
	proxyTmdb(
		res,
		`/tv/${encodeURIComponent(id)}/season/${encodeURIComponent(season)}`,
	);
});

app.get("/tv/:id/season/:season/external_ids", (req, res) => {
	const { id, season } = req.params;
	proxyTmdb(
		res,
		`/tv/${encodeURIComponent(id)}/season/${encodeURIComponent(
			season,
		)}/external_ids`,
	);
});

// Episodes
app.get("/tv/:id/season/:season/episode/:episode", (req, res) => {
	const { id, season, episode } = req.params;
	proxyTmdb(
		res,
		`/tv/${encodeURIComponent(id)}/season/${encodeURIComponent(
			season,
		)}/episode/${encodeURIComponent(episode)}`,
	);
});

app.get("/tv/:id/season/:season/episode/:episode/external_ids", (req, res) => {
	const { id, season, episode } = req.params;
	proxyTmdb(
		res,
		`/tv/${encodeURIComponent(id)}/season/${encodeURIComponent(
			season,
		)}/episode/${encodeURIComponent(episode)}/external_ids`,
	);
});

// Export
export default app;
