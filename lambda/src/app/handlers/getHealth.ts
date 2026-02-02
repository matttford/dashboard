import { listObjects } from "../../infra/integrations/aws/s3Client.js";

const MEME_BUCKET_NAME = process.env.MEME_BUCKET_NAME;
if (!MEME_BUCKET_NAME) {
  throw new Error("MEME_BUCKET_NAME environment variable is required");
}

export const getHealth = async (): Promise<{ status: string; timestamp: string; memeBucketSize: number }> => {
  const keys = await listObjects(MEME_BUCKET_NAME);

  return {
    status: "ok",
    timestamp: new Date().toISOString(),
    memeBucketSize: keys.length,
  };
};
