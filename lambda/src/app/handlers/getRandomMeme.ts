import { listObjects, getPresignedUrl } from "../../infra/integrations/aws/s3Client.js";

const MEME_BUCKET_NAME = process.env.MEME_BUCKET_NAME;
if (!MEME_BUCKET_NAME) {
  throw new Error("MEME_BUCKET_NAME environment variable is required");
}

export const getRandomMeme = async (): Promise<{ url: string; id: string }> => {
  const keys = await listObjects(MEME_BUCKET_NAME);

  if (keys.length === 0) {
    throw new Error("No objects found in meme bucket");
  }

  const randomIndex = Math.floor(Math.random() * keys.length);
  const randomKey = keys[randomIndex];

  const presignedUrl = await getPresignedUrl(MEME_BUCKET_NAME, randomKey, 300);

  return {
    url: presignedUrl,
    id: randomKey,
  };
};

