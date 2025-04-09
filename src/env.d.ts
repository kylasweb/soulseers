/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SOCKET_URL: string;
  readonly VITE_API_URL: string;
  readonly VITE_STRIPE_PUBLIC_KEY: string;
  readonly VITE_AUTH0_DOMAIN: string;
  readonly VITE_AUTH0_CLIENT_ID: string;
  readonly VITE_FIREBASE_CONFIG: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
} 