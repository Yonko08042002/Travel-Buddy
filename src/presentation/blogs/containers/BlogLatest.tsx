import { getLatest } from "application/use-cases/blog";
import LatestPost from "../components/LatestPost";
import Search from "presentation/home/components/Search";
import LatestPostCard from "../components/LatestPostCard";

export default async function BlogLatest() {
  const blogLatests = await getLatest();
  return (
    <div className="px-4 md:px-12 py-8   ">
      <div className="border-b-2 w-full flex gap-6  flex-col md:flex-row pb-12">
        <div className="md:w-2/3 ">
          <h2 className="md:text-2xl font-primary mb-4">Bài viết mới nhất</h2>
          {blogLatests.splice(0, 1).map((blog) => {
            return (
              <div key={blog.id}>
                <LatestPost blog={blog} />
              </div>
            );
          })}
        </div>
        <div className="hidden md:flex flex-col gap-4 md:w-1/3">
          <h2 className="md:text-2xl font-primary ">Tìm kiếm bài viết</h2>
          <Search />
          <h2 className="md:text-2xl font-primary">Những bài viết mới</h2>
          <div className="flex flex-col gap-2">
            {" "}
            {blogLatests.splice(0, 4).map((blog) => {
              return (
                <div key={blog.id}>
                  <LatestPostCard blog={blog} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
