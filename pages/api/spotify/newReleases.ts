import type { NextApiRequest, NextApiResponse } from "next";
import SpotifyWebApi from "spotify-web-api-node";
import { parse } from "cookie";

const newRelease = (req: NextApiRequest, res: NextApiResponse) => {
  const cookie = parse(req.headers.cookie);
  const spotifyApi = new SpotifyWebApi({ accessToken: cookie.accessToken });

  return spotifyApi
    .getNewReleases({ limit: 20, offset: 0, country: "SE" })
    .then((data) => res.json(data.body))
    .catch((err) => console.log("Something went wrong!", err));
};

export default newRelease;
