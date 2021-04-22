import { GetStaticProps } from 'next';
import { api } from '../services/api';

type Episode = {
  id: string;
  title: string;
  members: string;
}

type HomeProps = {
  episodes: Episode[];
}

export default function Home(props: HomeProps) {
  return (
    <div>Index</div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const url = 'episodes';
  const { data } = await api.get(url , {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc',
    }
  });

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8,
  }
}
