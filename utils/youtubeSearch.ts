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
    let storage: any = localStorage.getItem("history");
    if (storage) storage = JSON.parse(storage);

    if (storage?.find(({ searchStr }) => searchStr === props)) {
      return res(storage?.find(({ searchStr }) => searchStr === props)?.id);
    }

    search(props, options, (err, results) => {
      if (err) {
        console.error(err);
        return rej();
      }
      localStorage.setItem(
        "history",
        JSON.stringify(
          storage?.length > 0
            ? [...storage, { ...results?.[0], searchStr: props }]
            : [{ ...results?.[0], searchStr: props }]
        )
      );
      res(results?.[0]?.id);
    });
  });
  return id;
};

export default youtubeSearch;
