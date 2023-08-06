export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      FIREBASE_API_KEY: string
      FIREBASE_AUTH_DOMAIN: string
      FIREBASE_DATABASE_URL: string
      FIREBASE_PROJECT_ID: string
      FIREBASE_STORAGE_BUCKET: string
      FIREBASE_MESSAGING_SENDER_ID: string
      FIREBASE_APP_ID: string
      FIREBASE_MEASUREMENT_ID: string
      FIREBASE_APPCHECK_DEBUG_TOKEN: string

      RECAPTCHA_SITE_KEY: string

      IS_TESTING_FROM_CI: boolean

      JWT_SECRET_KEY: string
    }
  }

  interface Window {
    FIREBASE_APPCHECK_DEBUG_TOKEN: string | undefined
  }
}
