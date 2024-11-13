import { GET_S3_UPLOAD_URL } from '@/graphql/client/queries/GET_S3_UPLOAD_URL'
import { useLazyQuery } from '@apollo/client'
import axios from 'axios'
import { useState } from 'react'
import { toast } from 'react-toastify'

export const useS3Upload = () => {
  const [fileIsUploading, setFileIsUploading] = useState(false)
  const [
    getS3UploadUrl,
    {
      loading: getS3UploadUrlIsLoading,
      error: getS3UploadUrlError,
      data: getS3UploadUrlData,
    },
  ] = useLazyQuery(GET_S3_UPLOAD_URL)

  const generatedObjectKey = (file: File) =>
    `${new Date().getTime()}-${file.name}`

  const getPresignedUrl = async (file: File, objectKey: string) => {
    const res = await getS3UploadUrl({ variables: { objectKey } })
    return res.data?.s3uploadUrl ?? undefined
  }

  const handleS3FileUpload = async (file: File) => {
    if (!file) return undefined
    const objectKey = generatedObjectKey(file)
    setFileIsUploading(true)
    const s3uploadUrl = await getPresignedUrl(file, objectKey)
    if (file && s3uploadUrl) {
      try {
        await axios.put(s3uploadUrl, file, {
          headers: {
            'Content-Type': file.type,
          },
        })
        toast.success('Image uploaded successfully')
        setFileIsUploading(false)
        return objectKey
      } catch (error) {
        toast.error('Image upload failed')
      }
    }

    setFileIsUploading(false)
    return undefined
  }

  return {
    handleS3FileUpload,
    loading: fileIsUploading || getS3UploadUrlIsLoading,
  }
}
