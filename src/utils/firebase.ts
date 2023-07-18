import { FirebaseOptions, getApps, initializeApp, getApp } from 'firebase/app'
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check'
import { getDatabase } from 'firebase/database'

const firebaseOptions: FirebaseOptions = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
}

const firebaseAppIsNotInitialized: boolean = !getApps().length

if (firebaseAppIsNotInitialized) {
  initializeApp(firebaseOptions)
}

export const initializeFirebaseAppCheck = () => {
  if (process.env.NODE_ENV !== 'production' || process.env.IS_TESTING_FROM_CI) {
    self.FIREBASE_APP_CHECK_DEBUG_TOKEN =
      process.env.FIREBASE_APP_CHECK_DEBUG_TOKEN
  }

  initializeAppCheck(getApp(), {
    provider: new ReCaptchaV3Provider(process.env.RECAPTCHA_SITE_KEY),
    isTokenAutoRefreshEnabled: true
  })
}

export const firebaseDatabase = getDatabase()
