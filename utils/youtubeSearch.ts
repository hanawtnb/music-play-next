import * as search from "youtube-search";
import getConfig from "next/config";

const { publicRuntimeConfig: config } = getConfig();

const options = {
  maxResults: 1,
  key: config.api_key,
};

const youtubeSearch = async (props) => {
  let storage: any = localStorage.getItem("history");
  if (storage) storage = JSON.parse(storage);

  console.log(storage);

  if (storage?.find(({ searchStr }) => searchStr === props)) {
    return storage?.find(({ searchStr }) => searchStr === props)?.id;
  }

  console.log("not in history");

  return await search(props, options, (err, res) => {
    console.log(props);

    if (err) console.error(err);
    localStorage.setItem(
      "history",
      JSON.stringify(
        storage?.length > 0
          ? [...storage, { ...res[0], searchStr: props }]
          : [{ ...res[0], searchStr: props }]
      )
    );
    return res[0]?.id;
  });
};

export default youtubeSearch;
