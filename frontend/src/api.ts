// get from environment variable VITE_API_URL
const API_URL = import.meta.env.VITE_API_URL;
const REFRESH_INTERVAL_MINUTES = import.meta.env.VITE_REFRESH_INTERVAL_MINUTES;
if (!API_URL) {
    throw new Error("VITE_API_URL environment variable is not set");
}
if (!REFRESH_INTERVAL_MINUTES) {
    throw new Error("VITE_REFRESH_INTERVAL_MINUTES environment variable is not set");
}

export interface GetRandomMemeResponse {
    url: string;
    id: string;
}

export const getRandomMeme = async (): Promise<GetRandomMemeResponse> => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ type: "GetRandomMeme" }),
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch meme: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
};

