// src/global.d.ts

interface ImportMetaEnv {
    readonly VITE_GOOGLE_MAPS_API_KEY: string;
    // Add other environment variables if needed
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  