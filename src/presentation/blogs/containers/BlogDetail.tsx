import type { Blog } from "@prisma/client";
import dayjs from "dayjs";

interface BlogDetailProps {
  blog: Blog;
}
export default function BlogDetail({ blog }: BlogDetailProps) {
  return (
    <div className="h-full p-16">
      {" "}
      <div className="  aspect-auto overflow-hidden">
        <img
          src={blog.image}
          alt=""
          className=" w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <time className="text-sm text-gray-500">
          {dayjs(blog.createdAt).format("MMM DD, YYYY")}
        </time>
        <h3 className="font-semibold text-lg mt-2 mb-2 line-clamp-2">
          {blog.name}
        </h3>
        <p className="text-gray-600 text-sm ">{blog.description}</p>
      </div>
    </div>
  );
}
