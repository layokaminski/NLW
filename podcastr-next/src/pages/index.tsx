export default function Home() {
  return (
    <div>Index</div>
  );
}

export const getStaticProps = async () => {
  const url = 'http://localhost:3333/episodes';
  const response = await fetch(url);
  const data = await response.json();

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8,
  }
}
