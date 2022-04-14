import type { NextApiRequest, NextApiResponse } from "next";
import SpotifyWebApi from "spotify-web-api-node";
import { serialize, parse } from "cookie";

const token = (req: NextApiRequest, res: NextApiResponse) => {
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  });

  if (req.headers.cookie) {
    const cookie = parse(req.headers.cookie);
    if (cookie.accessToken) return res.end();
  }

  spotifyApi
    .clientCredentialsGrant()
    .then((data) => {
      res.setHeader("Set-Cookie", [
        serialize("accessToken", data?.body?.access_token, {
          path: "/",
          maxAge: data.body?.expires_in,
        }),
      ]);
      res.end();
    })
    .catch((err) => {
      throw err;
    });
};

export default token;
