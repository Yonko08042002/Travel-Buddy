import { getBlogById } from "application/use-cases/blog";
import BlogDetail from "presentation/blogs/containers/BlogDetail";

export const metadata = {
  title: "Blog",
};

export default async function BlogPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const blog = await getBlogById(id);

  if (!blog) {
    return <div>Tour not found</div>;
  }

  return (
    <>
      <BlogDetail blog={blog} />
    </>
  );
}
