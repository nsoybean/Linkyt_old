const metaEnv = import.meta.env;
export const API_URL = metaEnv.VITE_API_URL;
export const VITE_LOCAL_STORAGE_PREFIX = metaEnv.VITE_LOCAL_STORAGE_PREFIX;
export const THEME_PROVIDER_STORAGE_KEY = `${VITE_LOCAL_STORAGE_PREFIX}-${metaEnv.VITE_THEME_PROVIDER_KEY}`;
