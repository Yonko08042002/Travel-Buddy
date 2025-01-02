import { getBlogs } from "application/use-cases/blog";
import BlogsCard from "../../../shared/components/molecules/BlogCard";
import HeaderBlog from "presentation/blogs/components/HeaderBlog";

export default async function Blogs() {
  const blogs = await getBlogs();
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <HeaderBlog />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogs.slice(0, 4).map((blog) => {
            return (
              <div className="" key={blog.id}>
                <BlogsCard blog={blog} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
