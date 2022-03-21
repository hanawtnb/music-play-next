import type { NextApiRequest, NextApiResponse } from "next";
import SpotifyWebApi from "spotify-web-api-node";

const newRelease = (req: NextApiRequest, res: NextApiResponse) => {
  const { accessToken } = req.query;
  const spotifyApi = new SpotifyWebApi({ accessToken });

  return spotifyApi
    .getNewReleases({ limit: 20, offset: 0, country: "SE" })
    .then((data) => res.json(data.body))
    .catch((err) => console.log("Something went wrong!", err));
};

export default newRelease;
