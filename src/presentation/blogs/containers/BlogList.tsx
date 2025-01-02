import { getBlogs } from "application/use-cases/blog";
import BlogsCard from "shared/components/molecules/BlogCard";

export default async function BlogList() {
  const blogs = await getBlogs();

  return (
    <div className="grid gap-6 px-4 md:px-12 py-8 ">
      <div className="grid gap-6  grid-cols-2 md:grid-cols-4">
        {" "}
        {blogs.map((blog) => {
          return (
            <div className="" key={blog.id}>
              <BlogsCard blog={blog} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
