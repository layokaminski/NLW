import { GetStaticProps } from 'next';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
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

  const episodes = data.map((episode) => {
    return {
      id: episode.id,
      title: episode.title,
      members: episode.members,
      thumbnail: episode.thumbnail,
      description: episode.description,
      publishedAt: format(parseISO(episode.published_at), 'd MMMM yy', {
        locale: ptBR,
      }),
      duration: Number(episode.file.duration),
      url: episode.file.url,
    }
  });

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8,
  }
}
