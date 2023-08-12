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
      FIREBASE_PRIVATE_KEY: string
      FIREBASE_CLIENT_EMAIL: string

      RECAPTCHA_SITE_KEY: string

      IS_TESTING_FROM_CI: boolean

      JWT_SECRET_KEY: string

      CRON_SECRET: string
      CRON_SECRET_TEST: string | undefined

      MESSAGE_BEARER_KEY: string
      TEST_MESSAGE_BEARER_KEY: string | undefined
    }
  }

  interface Window {
    FIREBASE_APPCHECK_DEBUG_TOKEN: string | undefined
  }
}
