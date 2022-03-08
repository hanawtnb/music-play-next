import type { NextApiRequest, NextApiResponse } from 'next';
import SpotifyWebApi from 'spotify-web-api-node';

const playlists = (req: NextApiRequest, res: NextApiResponse) => {
  const { accessToken } = req.query;
  const spotifyApi = new SpotifyWebApi({ accessToken });

  spotifyApi.getUserPlaylists('ouf6jimny7kufvht539y17yzr')
    .then((data) => res.json(data.body))
    .catch((err) => {
      throw err;
    });
};

export default playlists;
