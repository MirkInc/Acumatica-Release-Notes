import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/session";
import { getDefaultReleasePath, getSafeRedirectPath } from "@/lib/routes";
import { LoginForm } from "./login-form";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const fallbackPath = getDefaultReleasePath();
  const { next } = await searchParams;

  if (await isAuthenticated()) {
    redirect(getSafeRedirectPath(next));
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#d6f2ee,transparent_34%),#f7f8fb] px-6 py-12">
      <section className="mx-auto flex min-h-[calc(100vh-6rem)] w-full max-w-5xl items-center">
        <div className="grid w-full gap-10 md:grid-cols-[1fr_420px] md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-800">
              Release Notes
            </p>
            <h1 className="mt-4 max-w-2xl text-4xl font-bold tracking-normal text-slate-950 md:text-5xl">
              Release Notes
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
              Private release documentation for package changes, schema additions,
              and functional updates across supported products.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold tracking-normal text-slate-950">
              Sign in
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Enter an authorized session password to continue.
            </p>
            <LoginForm nextPath={next ?? fallbackPath} />
          </div>
        </div>
      </section>
    </main>
  );
}
