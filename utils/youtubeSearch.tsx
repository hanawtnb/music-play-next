import search from "youtube-search";
import getConfig from "next/config";

const { publicRuntimeConfig: config } = getConfig();

const options = {
  maxResults: 1,
  key: config.api_key,
};

/**
 * youtubeでアーティスト名と曲名を検索.
 * @remarks - ローカルストレージにvideoIdが格納されていたらそこから返す。格納されていなかったら検索して返す。
 * @param props - `${artists?.[0]?.name} - ${name} song`
 * @returns - videoId
 */
const youtubeSearch = async (props) => {
  const id = await new Promise((res, rej) => {
    search(props, options, (err, results) => {
      if (err) {
        console.error(err);
        return rej();
      }
      res(results?.[0]?.id);
    });
  });
  return id;
};

export default youtubeSearch;
