export const getAssetPath = (path: string) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, ''); // Remove trailing slash
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}`;
};