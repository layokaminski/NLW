import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { usePlayer } from '../../contexts/PlayerContext';
import styles from './styles.module.scss';

export default function Player() {
  const {
    episodeList,
    currentEpisodeIndex,
    isPlaying,
    isLooping,
    isShuffling,
    hasNext,
    hasPrevious,
    togglePlay,
    toggleLoop,
    toggleShuffle,
    setPlayingState,
    playNext,
    playPrevious,
  } = usePlayer();

  const [progress, setProgress] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const setupProgressListener = () => {
    audioRef.current.currentTime = 0;

    audioRef.current.addEventListener('timeupdate', () => {
      setProgress(Math.floor(audioRef.current.currentTime));
    });
  }

  const episode = episodeList[currentEpisodeIndex];

  return (
    <div className={ styles.playerContainer }>
      <header>
        <img src="/playing.svg" alt="Tocando Agora" />
        <strong>Tocando agora</strong>
      </header>
      { episode ? (
        <div className={ styles.currentEpisode }>
          <Image
            width={ 592 }
            height={ 592 }
            objectFit="cover"
            src={ episode.thumbnail }
          />
          <strong>{ episode.title }</strong>
          <span>{ episode.members }</span>
        </div>
      ) : (
        <div className={ styles.emptyPlayer }>
          <strong>Selecione um podcast para ouvir</strong>
        </div>
      ) }
      <footer className={ !episode ? styles.empty : undefined }>
        <div className={ styles.progress }>
          <span>{ convertDurationToTimeString(progress) }</span>
          <div className={ styles.slider } >
            { episode ? (
              <Slider
                max={ episode.duration }
                value={ progress }
                trackStyle={{ backgroundColor: '#04d361' }}
                railStyle={{ backgroundColor: '#9f75ff' }}
                handleStyle={{ borderColor: '#04d361', borderWidth: 4 }}
              />
            ) : (
              <div className={ styles.emptySlider } />
            ) }
          </div>
          <span>{ convertDurationToTimeString(episode?.duration ?? 0) }</span>
        </div>
        { episode && (
          <audio
            src={ episode.url }
            ref={ audioRef }
            loop={ isLooping }
            autoPlay
            onPlay={ () => setPlayingState(true) }
            onPause={ () => setPlayingState(false) }
            onLoadedMetadata={ setupProgressListener }
          />
        ) }
        <div className={ styles.buttons }>
          <button
            type="button"
            className={ isShuffling ? styles.isActive : undefined }
            onClick={ toggleShuffle }
            disabled={ !episode || episodeList.length === 1 }
          >
            <img src="/shuffle.svg" alt="Embaralhar"/>
          </button>
          <button
            type="button"
            onClick={ playPrevious }
            disabled={ !episode || !hasPrevious }
          >
            <img src="/play-previous.svg" alt="Tocar anterior"/>
          </button>
          <button
            type="button"
            className={ styles.playButton }
            disabled={ !episode }
            onClick={ togglePlay }
          >
            { isPlaying 
              ? <img src="/pause.svg" alt="Pausar"/>
              : <img src="/play.svg" alt="Tocar"/> }
          </button>
          <button
            type="button"
            onClick={ playNext }
            disabled={ !episode || !hasNext }
          >
            <img src="/play-next.svg" alt="Tocar próxima"/>
          </button>
          <button
            type="button"
            className={ isLooping ? styles.isActive : undefined }
            onClick={ toggleLoop }
            disabled={ !episode }
          >
            <img src="/repeat.svg" alt="Repetir"/>
          </button>
        </div>
      </footer>
    </div>
  );
}
