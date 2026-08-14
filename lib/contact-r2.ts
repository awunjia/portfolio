import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export type ContactR2UploadInput = {
  key: string;
  body: Buffer;
  contentType: string;
  originalFilename: string;
};

export type ContactR2UploadResult = {
  key: string;
  /** Public URL if CF_R2_PUBLIC_BASE_URL is set, otherwise a time-limited signed GET URL. */
  url: string;
};

function r2Env() {
  const accountId = process.env.CF_R2_ACCOUNT_ID?.trim() ?? "";
  const accessKeyId = process.env.CF_R2_ACCESS_KEY_ID?.trim() ?? "";
  const secretAccessKey = process.env.CF_R2_SECRET_ACCESS_KEY?.trim() ?? "";
  const bucket = process.env.CF_R2_BUCKET?.trim() ?? "";
  const prefix = (process.env.CF_R2_PREFIX?.trim() || "contact-uploads/").replace(
    /^\/+/,
    "",
  );
  const publicBase = process.env.CF_R2_PUBLIC_BASE_URL?.trim().replace(/\/+$/, "") ?? "";

  return { accountId, accessKeyId, secretAccessKey, bucket, prefix, publicBase };
}

export function isContactR2Configured(): boolean {
  const { accountId, accessKeyId, secretAccessKey, bucket } = r2Env();
  return Boolean(accountId && accessKeyId && secretAccessKey && bucket);
}

function createR2Client(): S3Client {
  const { accountId, accessKeyId, secretAccessKey } = r2Env();
  return new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
}

export function contactR2ObjectKey(storedFilename: string): string {
  const { prefix } = r2Env();
  const normalized = prefix.endsWith("/") ? prefix : `${prefix}/`;
  return `${normalized}${storedFilename}`;
}

/** Upload a contact attachment to Cloudflare R2 and return a retrievable URL. */
export async function uploadContactAttachmentToR2(
  input: ContactR2UploadInput,
): Promise<ContactR2UploadResult> {
  if (!isContactR2Configured()) {
    throw new Error("Cloudflare R2 is not configured for contact uploads.");
  }

  const { bucket, publicBase } = r2Env();
  const client = createR2Client();

  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: input.key,
      Body: input.body,
      ContentType: input.contentType || "application/octet-stream",
      ContentDisposition: `attachment; filename="${input.originalFilename.replace(/"/g, "")}"`,
      Metadata: {
        originalFilename: input.originalFilename.slice(0, 200),
      },
    }),
  );

  if (publicBase) {
    return {
      key: input.key,
      url: `${publicBase}/${input.key.replace(/^\/+/, "")}`,
    };
  }

  const signedUrl = await getSignedUrl(
    client,
    new GetObjectCommand({
      Bucket: bucket,
      Key: input.key,
    }),
    { expiresIn: 60 * 60 * 24 * 7 },
  );

  return { key: input.key, url: signedUrl };
}
