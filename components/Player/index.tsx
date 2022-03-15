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
  const { curSong, setEvent } = useContext(SongContext);

  if (!curSong?.videoId) return <div />;

  return (
    <YouTube
      videoId={curSong?.videoId}
      opts={opts}
      onReady={(event) => setEvent(event.target)} // defaults -> noop
      //   onPlay={(event) => setPlay(event.target)} // defaults -> noop
      //   onEnd={() => nextSong()} // defaults -> noop
      //   onStateChange={(event) => setEvent(event.target)} // defaults -> noop
    />
  );
};

export default Player;
