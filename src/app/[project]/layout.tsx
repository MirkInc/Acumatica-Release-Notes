import { notFound, redirect } from "next/navigation";
import { Sidebar } from "@/components/sidebar";
import { getProduct, getProducts, getReleases } from "@/lib/releases";
import { isAuthenticated } from "@/lib/session";

export function generateStaticParams() {
  return getProducts().map((product) => ({
    project: product.slug,
  }));
}

export default async function ProjectLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ project: string }>;
}>) {
  if (!(await isAuthenticated())) {
    redirect("/login");
  }

  const { project } = await params;
  const productData = getProduct(project);

  if (!productData) {
    notFound();
  }

  const products = getProducts();
  const releases = getReleases(productData.slug);

  return (
    <main className="min-h-screen md:grid md:grid-cols-[300px_minmax(0,1fr)]">
      <div className="hidden md:block">
        <Sidebar products={products} product={productData} releases={releases} />
      </div>
      <section className="min-w-0">
        <div className="md:hidden">
          <Sidebar products={products} product={productData} releases={releases} />
        </div>
        {children}
      </section>
    </main>
  );
}
