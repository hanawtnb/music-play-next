import React, { useContext, VFC } from "react";
import YouTube from "react-youtube";
import { Context as SongContext } from "store/song";

const opts: any = {
  height: "390",
  width: "640",
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
  },
};

const Player: VFC = () => {
  const { curSong, setEvent } = useContext(SongContext);

  if (!curSong?.videoId) return <div />;

  return (
    <YouTube
      videoId={curSong?.videoId} // defaults -> null
      opts={opts} // defaults -> {}
      onReady={(event) => setEvent(event.target)} // defaults -> noop
      //   onPlay={(event) => setPlay(event.target)} // defaults -> noop
      //   onEnd={() => nextSong()} // defaults -> noop
      //   onStateChange={(event) => setEvent(event.target)} // defaults -> noop
    />
  );
};

export default Player;
