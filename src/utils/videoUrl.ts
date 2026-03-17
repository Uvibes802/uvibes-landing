/**
 * Generates the full URL for a video asset.
 * If NEXT_PUBLIC_CLOUDFRONT_URL is defined, it returns the CloudFront URL.
 * Otherwise, it falls back to the local path (for development/transition).
 * 
 * @param path The path to the video (e.g., '/videos/my-video.mp4' or 'my-video.mp4')
 * @returns The full URL to the video
 */
export function getVideoUrl(path: string): string {
  const cloudfrontUrl = process.env.NEXT_PUBLIC_CLOUDFRONT_URL;
  
  if (!cloudfrontUrl) {
    // If no CloudFront URL is provided, we assume local development.
    // Ensure path starts with /
    return path.startsWith('/') ? path : `/${path}`;
  }

  // Extract filename if it's a full path
  const filename = path.split('/').pop();
  
  // Remove trailing slash from cloudfrontUrl if present
  const baseUrl = cloudfrontUrl.endsWith('/') ? cloudfrontUrl.slice(0, -1) : cloudfrontUrl;
  
  return `${baseUrl}/videos/${filename}`;
}
