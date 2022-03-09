import React, { useContext } from "react";
import { useRouter } from "next/router";

import { Context as SongContext } from "store/song";
import Volume from "components/Volume";

const Controls = () => {
  const { event } = useContext(SongContext);
  return (
    <>
      <div>
        {/* <MdPlayCircleOutline onClick={playSong} />
      <MdPauseCircleOutline onClick={pauseSong} /> */}
        <button type="button" onClick={() => event.playVideo()}>
          play
        </button>
        <button type="button" onClick={() => event.pauseVideo()}>
          pause
        </button>
        <Volume />
      </div>
    </>
  );
};

const PlayerBar = () => {
  const router = useRouter();
  const { curSong } = useContext(SongContext);

  return (
    <>
      <div>
        {curSong && (
          <div>
            <img src={curSong?.img} />
            <div>
              <p>{curSong?.name}</p>
              <p>{curSong?.artists?.map(({ name }) => name)}</p>
            </div>
          </div>
        )}
        <Controls />
      </div>
    </>
  );
};

export default PlayerBar;
