export const getS3ImageUrl = (objectKey: string) => {
  return `https://${process.env.NEXT_PUBLIC_AWS_S3_DOMAIN}/${objectKey}`
}
