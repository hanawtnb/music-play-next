import type { NextApiRequest, NextApiResponse } from 'next';
import SpotifyWebApi from 'spotify-web-api-node';

const search = (req: NextApiRequest, res: NextApiResponse) => {
  const { accessToken, artist } = req.query;
  const spotifyApi = new SpotifyWebApi({ accessToken });

  spotifyApi.searchTracks(`artist:${artist}`)
    .then((data) => res.json(data.body))
    .catch((err) => {
      throw err;
    });
};

export default search;
