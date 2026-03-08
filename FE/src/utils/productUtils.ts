import { getAssetPath } from "./paths";

export const getImageSrc = (url: string | null) => {
  if (!url) return null;
  if (url.startsWith('http') || url.startsWith('data:')) return url;
  // Resilient path logic: ensures we don't double up or miss the books subfolder
  const fileName = url.replace(/^\/?(images\/books\/)?/, '');
  return getAssetPath(`/images/books/${fileName}`);
};

export const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .split(/\s+/)
    .filter(Boolean)
    .join('-');
};
