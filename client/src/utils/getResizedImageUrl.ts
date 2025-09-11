// Utility to append CDN resize parameters to an image URL
export const getResizedImageUrl = (url: string, width: number, height: number) => {
  if (!url) return "/placeholder-image.jpg";
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}w=${width}&h=${height}&fit=cover`;
};
