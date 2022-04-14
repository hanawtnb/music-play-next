import type { NextApiRequest, NextApiResponse } from "next";
import SpotifyWebApi from "spotify-web-api-node";
import { parse } from "cookie";

const playlists = (req: NextApiRequest, res: NextApiResponse) => {
  const cookie = parse(req.headers.cookie);
  const spotifyApi = new SpotifyWebApi({ accessToken: cookie.accessToken });

  spotifyApi
    .getUserPlaylists("ouf6jimny7kufvht539y17yzr")
    .then((data) => res.json(data.body))
    .catch((err) => {
      throw err;
    });
};

export default playlists;
