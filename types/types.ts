export type Artist = {
  external_urls: Array<string>;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
};

export type Image = {
  height: number;
  url: string;
  width: number;
};

export type Album = {
  album_type: string;
  artists: Artist;
  available_markets: Array<string>;
  external_urls: Array<string>;
  href: string;
  id: string;
  images: Array<Image>;
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
};

export type Item = {
  album: Album;
  artists: Array<Artist>;
  available_markets: Array<string>;
  disc_number: number;
  duration_ms: number;
  explicit: number;
  external_ids: object;
  external_urls: object;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
};

export type YoutubeOptions = {
  height: string;
  width: string;
  playerVars: object;
};
