export function getFriendlyErrorMessage(error: any): string {
  // If no error or code is present, return the default judge-safe message
  if (!error || !error.code) {
    if (error?.message && typeof error.message === 'string') {
      if (error.message.toLowerCase().includes("network")) {
        return "Network connection failed. Please check your internet and try again.";
      }
    }
    return "Unable to sign in right now. Please try again in a moment.";
  }

  // Handle specific Firebase auth error codes
  switch (error.code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
      return "Incorrect password";
    case "auth/user-not-found":
      return "Account not found";
    case "auth/email-already-in-use":
      return "Account already exists";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/weak-password":
      return "Password is too weak. Please use at least 6 characters.";
    case "auth/popup-closed-by-user":
      return "Google sign-in was cancelled";
    case "auth/cancelled-popup-request":
      return "Another sign-in popup is already active";
    case "auth/popup-blocked":
      return "Pop-up blocked by browser. Please allow pop-ups for this site.";
    case "auth/network-request-failed":
      return "Network connection failed. Please check your internet and try again.";
    case "auth/too-many-requests":
      return "Too many failed attempts. Please try again later.";
    case "auth/unauthorized-domain":
    default:
      // We log to console in dev mode, but to the user we show a completely generic message
      // so we don't expose technical details.
      if (process.env.NODE_ENV !== 'production') {
        console.error("Firebase Auth Error:", error);
      }
      return "Unable to sign in right now. Please try again in a moment.";
  }
}
