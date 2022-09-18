import axios from 'axios';

import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

import logoImage from './assets/logo-nlw-esports.svg';
import { GameBanner } from './components/GamBanner';
import { CreateAdBanner } from './components/CreateAdBanner';

import './styles/main.css';
import { CreateAdModal } from './components/CreateAdModal';

interface Game {
  id: string;
  bannerUrl: string;
  title: string;
  _count: {
    ads: number;
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios('http://localhost:3333/games')
      .then((response) => setGames(response.data));
  }, []);

  return (
    <div className='max-w-[1344px] mx-auto  flex flex-col items-center my-20'>
      <img src={logoImage} alt="" />

      <h1 className='text-6xl text-white font-black mt-20'>
        Seu <span className='text-transparent bg-nlw-gratient bg-clip-text'>duo</span> está aqui.
      </h1>

      <div className='grid grid-cols-6 gap-6 mt-16'>
        {games.map(({ id, bannerUrl, title, _count }) => (
          <GameBanner
            key={id}
            title={title}
            bannerUrl={bannerUrl}
            adsCount={_count.ads}
          />
        ))};
      </div>
      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}

export default App
