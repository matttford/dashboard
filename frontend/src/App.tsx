import { useEffect, useState } from "react";
import { getRandomMeme, type GetRandomMemeResponse } from "./api";

const REFRESH_INTERVAL_MS = parseInt(import.meta.env.VITE_REFRESH_INTERVAL_MINUTES) * 60 * 1000;

function App() {
  const [meme, setMeme] = useState<GetRandomMemeResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMeme = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getRandomMeme();
      setMeme(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load meme");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeme();

    const interval = setInterval(() => {
      fetchMeme();
    }, REFRESH_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      {/* <h1>Dashboard</h1>
      <p>This is a dashboard that displays a continuous stream of memes from an S3 bucket.</p>
      <p>API URL: {import.meta.env.VITE_API_URL}</p> */}
      {loading && !meme && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {meme && (
        <div style={{ maxWidth: "800px", width: "100%" }}>
          <img
            src={meme.url}
            alt="Meme"
            style={{
              maxWidth: "100%",
              height: "auto",
              display: "block",
              margin: "0 auto",
            }}
            onError={() => setError("Failed to load image")}
          />
        </div>
      )}
    </div>
  );
}

export default App;
