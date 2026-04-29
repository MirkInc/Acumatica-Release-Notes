"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  createSessionToken,
  isValidPassword,
  SESSION_MAX_AGE_SECONDS,
  SESSION_COOKIE,
} from "@/lib/session";
import { getSafeRedirectPath } from "@/lib/routes";

export type LoginState = {
  error: string;
};

export async function login(
  _: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const password = String(formData.get("password") ?? "");
  const nextPath = String(formData.get("next") ?? "");

  if (!isValidPassword(password)) {
    return {
      error: "That password did not match an authorized release-notes session.",
    };
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, createSessionToken(), {
    httpOnly: true,
    maxAge: SESSION_MAX_AGE_SECONDS,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  redirect(getSafeRedirectPath(nextPath));
}
