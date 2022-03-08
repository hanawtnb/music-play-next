import type { NextApiRequest, NextApiResponse } from 'next';
import SpotifyWebApi from 'spotify-web-api-node';

const getAlbum = (req: NextApiRequest, res: NextApiResponse) => {
  const { accessToken, id } = req.query;
  const spotifyApi = new SpotifyWebApi({ accessToken });

  return spotifyApi.getAlbum(id)
    .then((data) => res.json(data.body))
    .catch((err) => {
      throw err;
    });
};

export default getAlbum;
