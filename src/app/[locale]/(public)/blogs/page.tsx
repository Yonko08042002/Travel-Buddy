import BlogsBackground from 'presentation/blogs/components/BlogsBackground';
import BlogLatest from 'presentation/blogs/containers/BlogLatest';
import BlogList from 'presentation/blogs/containers/BlogList';

export const metadata = {
  title: 'Blogs'
};

export default function BlogsPage() {
  return (
    <>
      <BlogsBackground />
      <BlogLatest />
      <BlogList />
    </>
  );
}
