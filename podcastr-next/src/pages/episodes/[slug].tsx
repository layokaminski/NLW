import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { api } from '../../services/api';
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';
import styles from './episode.module.scss';

type Episode = {
  id: string,
  title: string,
  members: string,
  thumbnail: string,
  description: string,
  publishedAt: string,
  duration: number,
  durationAsString: string,
  url: string,
}

type EpisodeProps = {
  episode: Episode,
};

const Episode = ({ episode }: EpisodeProps) => {
  return (
    <div className={ styles.episode }>
      <div className={ styles.thumbnailContainer }>
        <Link href="/">
          <button type="button">
            <img src="/arrow-left.svg" alt="Voltar"/>
          </button>
        </Link>
        <Image
          width={ 700 }
          height={ 160 }
          objectFit="cover"
          src={ episode.thumbnail }
        />
        <button type="button">
          <img src="/play.svg" alt="Tocar episódio"/>
        </button>
      </div>
      <header>
        <h1>{ episode.title }</h1>
        <span>{ episode.members }</span>
        <span>{ episode.publishedAt }</span>
        <span>{ episode.durationAsString }</span>
      </header>
      <div 
        className={ styles.description }
        dangerouslySetInnerHTML={{ __html: episode.description }}
      />
    </div>
  );
}

export default Episode;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params;
  const { data } = await api.get(`/episodes/${slug}`);

  const episode = {
    id: data.id,
    title: data.title,
    members: data.members,
    thumbnail: data.thumbnail,
    description: data.description,
    publishedAt: format(parseISO(data.published_at), 'd MMMM yy', {
      locale: ptBR,
    }),
    durationAsString: convertDurationToTimeString(Number(data.file.duration)),
    url: data.file.url,
  }

  return {
    props: {
      episode,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
}