import type { NextApiRequest, NextApiResponse } from "next";
import SpotifyWebApi from "spotify-web-api-node";

const token = (req: NextApiRequest, res: NextApiResponse) => {
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  });

  console.log(1);

  spotifyApi
    .clientCredentialsGrant()
    .then((data) => res.json(data.body))
    .catch((err) => {
      throw err;
    });
};

export default token;
