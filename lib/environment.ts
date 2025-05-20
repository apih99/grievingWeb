// Helper to detect if we're in a preview environment
export function isPreviewEnvironment() {
  // Force production mode if NODE_ENV is explicitly set to production
  if (process.env.NODE_ENV === 'production') {
    return false;
  }

  const isPreview = (
    process.env.VERCEL_ENV === "preview" ||
    (typeof window !== "undefined" && window.location.hostname.includes("vercel.app"))
  )

  console.log("Environment check:", {
    VERCEL_ENV: process.env.VERCEL_ENV,
    NODE_ENV: process.env.NODE_ENV,
    isPreview
  })

  return isPreview
}
