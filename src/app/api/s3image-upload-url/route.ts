import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const REGION = "eu-central-1";
const BUCKET_NAME = "misha-blog-image-bucket";

const s3Client = new S3Client({ region: REGION });

async function generatePresignedUrl(bucketName: string, objectKey: string) {
  // Create a command for the operation you want (e.g., PUT for uploads)
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: objectKey,
    ContentType: "application/octet-stream", // Set the appropriate content type
  });
  // // Generate the presigned URL using the command
  try {
    const presignedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 3600,
    });
    return presignedUrl;
  } catch (err) {
    return err as Error;
  }
}

export async function GET(request: Request) {
  const urlParams = new URL(request.url).searchParams;
  const objectKey = urlParams.get("objectKey");

  if (!objectKey) {
    return new Response("Missing 'objectKey' query parameter", { status: 400 });
  }

  const url = await generatePresignedUrl(BUCKET_NAME, objectKey);
  return Response.json({ url: url });
}
