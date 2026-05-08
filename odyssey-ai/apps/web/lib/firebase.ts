export function getFirebaseAppStatus() {
  return {
    configured: Boolean(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID),
  };
}

