export const metadata = {
  title: 'Blog'
};

export default function BlogPage({ params }: { params: { id: string } }) {
  return <h1> Blog: {params.id}</h1>;
}
