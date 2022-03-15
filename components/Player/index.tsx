import React, { useContext, VFC } from "react";
import YouTube from "react-youtube";

import { Context as SongContext } from "store/song";

const opts: any = {
  height: "0",
  width: "0",
  playerVars: {
    autoplay: 1,
  },
};

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
      opts={opts}
    />
  );
};

export default Player;
