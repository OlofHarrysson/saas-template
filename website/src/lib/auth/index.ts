// Re-export everything from the auth module for easy imports

// Server-side functions
export { getSession, getUser, requireAuth } from "./server";

// Client-side hooks
export { useAuth } from "./hooks";

// Server actions
export { signInWithGoogle, signOutAction } from "./nextauth-actions";
