import * as admin from 'firebase-admin';
import { env } from './env';

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: env.FIREBASE_PROJECT_ID,
        clientEmail: env.FIREBASE_CLIENT_EMAIL,
        privateKey: env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      }),
    });
  } catch (error) {
    console.error('Firebase admin initialization error:', error);
    // In production, we want to fail hard if credentials are bad
    throw error;
  }
}

export const db = admin.firestore();
export const auth = admin.auth();
