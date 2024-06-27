import { GetChaptersSetting, GetVersesSetting } from "./axios";

import getRandomNumber from "./getRandomNumber";

export const getChapterCounts = async (range) => {
  let CHAPTER = await GetChaptersSetting();
  let result = 5;
  CHAPTER.map((item) => {
    let node = item.value.split("-").map((one) => +one);
    if (range > node[0] && range < node[1]) {
      let outrange = item.num.split("-").map((one) => +one);
      result = Math.min(range, getRandomNumber(outrange[0], outrange[1]));
    }
  });
  return result;
};

export const getVerseCounts = async (range) => {
  let VERSE = await GetVersesSetting();
  let result = 5;
  VERSE.map((item) => {
    let node = item.value.split("-").map((one) => +one);
    if (range >= node[0] && range <= node[1]) {
      let outrange = item.num.split("-").map((one) => +one);
      result = Math.min(range, getRandomNumber(outrange[0], outrange[1]));
    }
  });
  return result;
};
