import { FIREBASE_PROJECT_ID } from '../config/constants';

export function getFirebaseAppStatus() {
  return {
    configured: Boolean(FIREBASE_PROJECT_ID),
  };
}
