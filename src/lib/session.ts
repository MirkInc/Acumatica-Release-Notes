import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "release_notes_session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

function getValidPasswords() {
  return new Set(
    (process.env.AUTH_PASSWORDS ?? "")
      .split(",")
      .map((password) => password.trim())
      .filter(Boolean),
  );
}

function getSecret() {
  return (
    process.env.AUTH_SESSION_SECRET ??
    "local-release-notes-session-secret-change-in-vercel-env"
  );
}

export function isValidPassword(password: string) {
  return getValidPasswords().has(password);
}

export function createSessionToken() {
  return createHmac("sha256", getSecret())
    .update("authenticated")
    .digest("hex");
}

export function isValidSessionToken(token?: string) {
  if (!token) {
    return false;
  }

  const expected = createSessionToken();
  const tokenBuffer = Buffer.from(token);
  const expectedBuffer = Buffer.from(expected);

  return (
    tokenBuffer.length === expectedBuffer.length &&
    timingSafeEqual(tokenBuffer, expectedBuffer)
  );
}

export async function isAuthenticated() {
  const cookieStore = await cookies();
  return isValidSessionToken(cookieStore.get(SESSION_COOKIE)?.value);
}
