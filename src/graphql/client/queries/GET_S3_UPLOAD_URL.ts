import { gql } from '@/__generated__'

export const GET_S3_UPLOAD_URL = gql(`
 query getS3uploadUrl($objectKey: String!) {
  s3uploadUrl(objectKey: $objectKey)
 }
`)
