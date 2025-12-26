import { S3Client, ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({});

export const listObjects = async (bucketName: string): Promise<string[]> => {
  const command = new ListObjectsV2Command({
    Bucket: bucketName,
  });

  const response = await s3Client.send(command);
  const keys: string[] = [];

  if (response.Contents) {
    for (const object of response.Contents) {
      if (object.Key) {
        keys.push(object.Key);
      }
    }
  }

  return keys;
};

export const getPresignedUrl = async (
  bucketName: string,
  key: string,
  expiresIn: number = 300,
): Promise<string> => {
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: key,
  });

  return await getSignedUrl(s3Client, command, { expiresIn });
};

