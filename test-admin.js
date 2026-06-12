const admin = require('firebase-admin');
require('dotenv').config({ path: '.env.local' });
console.log("PROJECT:", process.env.FIREBASE_PROJECT_ID);
try {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
  console.log("App initialized");
  admin.firestore().collection('products').limit(1).get().then(() => {
    console.log("Firestore OK");
    process.exit(0);
  }).catch(e => {
    console.error("Firestore Error:", e);
    process.exit(1);
  });
} catch (e) {
  console.error("Init Error:", e);
  process.exit(1);
}
