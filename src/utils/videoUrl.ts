const CLOUDFRONT_FALLBACK = "https://d2a0jgcp77eoku.cloudfront.net";

export function getVideoUrl(path: string): string {
  const cloudfrontUrl = process.env.NEXT_PUBLIC_CLOUDFRONT_URL || CLOUDFRONT_FALLBACK;
  const baseUrl = cloudfrontUrl.endsWith('/') ? cloudfrontUrl.slice(0, -1) : cloudfrontUrl;
  const filename = path.split('/').pop();
  return `${baseUrl}/videos/${filename}`;
}
