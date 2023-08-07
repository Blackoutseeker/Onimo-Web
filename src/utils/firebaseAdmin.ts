import { getApps, initializeApp, cert } from 'firebase-admin/app'
import { Database, getDatabase } from 'firebase-admin/database'

const firebaseAppIsNotInitialized: boolean = !getApps().length

if (firebaseAppIsNotInitialized) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL
    }),
    databaseURL: process.env.FIREBASE_DATABASE_URL
  })
}

export const firebaseAdminDatabase: Database = getDatabase()
