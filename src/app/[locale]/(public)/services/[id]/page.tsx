export const metadata = {
  title: 'Service'
};

export default function ServicePage({ params }: { params: { id: string } }) {
  return <h1>Service: {params.id}</h1>;
}
