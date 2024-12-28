import { getVideos } from 'application/use-cases/video';
import { VideosTable } from 'presentation/videos/containers/VideosTable';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from 'shared/components/atoms/breadcrumb';

export const metadata = {
  title: 'Video'
};

export default async function Video() {
  const videos = await getVideos();
  return (
    <section className='w-full'>
      <Breadcrumb className='mb-4'>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/admin'>Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href='/admin/videos'>Videos</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <VideosTable data={videos} />
    </section>
  );
}
