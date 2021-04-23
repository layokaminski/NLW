import { createContext, useState, ReactNode, useContext } from 'react';

type Episode = {
  title: string,
  members: string,
  thumbnail: string,
  duration: number,
  url: string,
};

type PlayerContextData = {
  episodeList: Episode[],
  currentEpisodeIndex: number,
  isPlaying: boolean,
  play: (episode: Episode) => void,
  playList: (list: Episode[], index: number) => void,
  togglePlay: () => void,
  setPlayingState: (state: boolean) => void,
  playNext: () => void,
  playPrevious: () => void,
  hasNext: boolean,
  hasPrevious: boolean,
};

export const PlayerContext = createContext({} as PlayerContextData);

type PlayerContextProviderProps = {
  children: ReactNode,
}


export const PlayerContextProvider = ({ children }: PlayerContextProviderProps) => {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const play = (episode) => {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  const playList = (list: Episode[], index: number) => {
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  }
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  }
  
  const setPlayingState = (state: boolean) => {
    setIsPlaying(state);
  }

  const hasPrevious = currentEpisodeIndex > 0;
  const hasNext = (currentEpisodeIndex + 1) < episodeList.length;

  const playNext = () => {
    const nextEpisodeIndex = currentEpisodeIndex + 1;
    
    if (hasNext) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1);
    }
  }

  const playPrevious = () => {   
    if (hasPrevious) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1);
    }
  }
  
  const context = {
    episodeList,
    currentEpisodeIndex,
    isPlaying,
    play,
    playList,
    togglePlay,
    setPlayingState,
    playNext,
    playPrevious,
    hasNext,
    hasPrevious,
  }

  return (
    <PlayerContext.Provider value={ context }>
      { children }
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => {
  return useContext(PlayerContext);
}
