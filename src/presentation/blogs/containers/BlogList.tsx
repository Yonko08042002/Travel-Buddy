import { getBlogs } from "application/use-cases/blog";
import BlogsCard from "shared/components/molecules/BlogCard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "shared/components/molecules/Pagination";

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
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
