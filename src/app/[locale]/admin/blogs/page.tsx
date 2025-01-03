import { getBlogs } from "application/use-cases/blog";
import BlogsBreadcrumb from "presentation/blogs/components/BlogsBreadcrumb";
import { BlogsTable } from "presentation/blogs/containers/BlogsTable";

export const metadata = {
  title: "Blog",
};

export default async function Blog() {
  const blogs = await getBlogs();

  return (
    <section className="w-full">
      <BlogsBreadcrumb />
      <BlogsTable data={blogs} />
    </section>
  );
}
