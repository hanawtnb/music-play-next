import React, { useContext, VFC } from "react";
import YouTube from "react-youtube";

import { Context as SongContext } from "store/song";
import { YoutubeOptions } from "../../types/types";

const options: YoutubeOptions = {
  height: "0",
  width: "0",
  playerVars: {
    autoplay: 1,
  },
};

// Youtubeビデオの再生
const Player: VFC = () => {
  const { curSong, setEvent, nextSong } = useContext(SongContext);
  if (!curSong?.videoId) return null;
  return (
    <YouTube
      onStateChange={(event) => setEvent(event.target)}
      onReady={(event) => setEvent(event.target)}
      onPlay={(event) => setEvent(event.target)}
      videoId={curSong?.videoId}
      onEnd={nextSong}
      opts={options}
    />
  );
};

export default Player;
